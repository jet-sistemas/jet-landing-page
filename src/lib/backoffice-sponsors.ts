import type { SponsorTier } from "@/types/entities";

const DEFAULT_API_BASE = "http://localhost:8080";

export type PublicSponsorApiTier = "GOLD" | "SILVER" | "BRONZE";

type RawPublicSponsorUser = {
  id?: number;
  name?: string;
  createdAt?: string;
  sponsor?: {
    id?: number;
    publicName?: string;
    tier?: string;
    logoUrl?: string;
    site?: string;
    instagram?: string;
  };
};

type RawEnvelope = {
  status?: string;
  statusCode?: number;
  message?: string;
  data?: unknown;
};

type RawListEnvelope = RawEnvelope & {
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  totalElements?: number;
};

export type PublicSponsorCard = {
  id: string;
  publicName: string;
  tier: SponsorTier;
  logoUrl: string | null;
  site: string | null;
  instagram: string | null;
  createdAt: string;
};

export type SponsorsByTier = {
  gold: PublicSponsorCard[];
  silver: PublicSponsorCard[];
  bronze: PublicSponsorCard[];
};

export type PublicSponsorPage = {
  items: PublicSponsorCard[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};

function getApiBase(): string {
  const raw =
    process.env.NEXT_PUBLIC_BACKOFFICE_API_URL?.trim() || DEFAULT_API_BASE;
  return raw.replace(/\/$/, "");
}

function getR2PublicBase(): string {
  const raw =
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim();
  return raw?.replace(/\/$/, "") ?? "";
}

/**
 * Monta URL absoluta da logo: aceita URL completa da API ou caminho/key no R2.
 */
export function resolveSponsorLogoUrl(
  raw: string | null | undefined
): string | null {
  const t = raw?.trim();
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t;
  const base = getR2PublicBase();
  const path = t.replace(/^\/+/, "");
  return `${base}/${path}`;
}

function mapApiTierToUi(tier: string | undefined): SponsorTier {
  switch (tier) {
    case "GOLD":
      return "gold";
    case "SILVER":
      return "silver";
    case "BRONZE":
      return "bronze";
    default:
      return "bronze";
  }
}

function parseItem(
  item: unknown,
  requestTier: PublicSponsorApiTier
): PublicSponsorCard | null {
  const row = item as { user?: RawPublicSponsorUser };
  const user = row.user;
  const sponsor = user?.sponsor;
  if (!user || !sponsor) return null;

  const id = sponsor.id ?? user.id;
  if (id == null) return null;

  return {
    id: String(id),
    publicName:
      sponsor.publicName?.trim() || user.name?.trim() || "Patrocinador",
    tier: mapApiTierToUi(sponsor.tier ?? requestTier),
    logoUrl: resolveSponsorLogoUrl(sponsor.logoUrl),
    site: sponsor.site?.trim() || null,
    instagram: sponsor.instagram?.trim() || null,
    createdAt: user.createdAt ?? new Date(0).toISOString(),
  };
}

function parseListItems(
  data: unknown,
  tier: PublicSponsorApiTier
): PublicSponsorCard[] {
  if (!Array.isArray(data)) {
    throw new Error("Lista de patrocinadores inválida");
  }
  const items = data
    .map((row) => parseItem(row, tier))
    .filter((x): x is PublicSponsorCard => x != null);
  items.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return items;
}

/**
 * Listagem paginada de patrocinadores públicos (para client ou server).
 */
export async function fetchPublicSponsorsPage(
  tier: PublicSponsorApiTier,
  page: number,
  size: number,
  init?: RequestInit
): Promise<PublicSponsorPage> {
  const base = getApiBase();
  const url = new URL(`${base}/v1/public/sponsors`);
  url.searchParams.set("tier", tier);
  url.searchParams.set("page", String(page));
  url.searchParams.set("size", String(size));

  const fetchInit: RequestInit = { cache: "no-store", ...init };

  const res = await fetch(url.toString(), fetchInit);
  if (!res.ok) {
    throw new Error(`Backoffice sponsors HTTP ${res.status}`);
  }

  let json: RawListEnvelope;
  try {
    json = (await res.json()) as RawListEnvelope;
  } catch {
    throw new Error("Resposta de patrocinadores inválida");
  }

  if (json.status === "ERROR") {
    throw new Error(json.message || "Erro ao listar patrocinadores");
  }

  let items = parseListItems(json.data, tier);
  const pageSize = json.pageSize ?? size;
  items = items.slice(0, pageSize);

  const totalElements =
    json.totalElements != null ? Number(json.totalElements) : items.length;

  let totalPages =
    json.totalPages != null ? Math.max(1, Number(json.totalPages)) : null;
  if (totalPages == null && pageSize > 0) {
    totalPages = Math.max(1, Math.ceil(totalElements / pageSize));
  }
  totalPages = totalPages ?? 1;

  const currentPage =
    json.currentPage != null ? Number(json.currentPage) : page;

  return {
    items,
    currentPage,
    totalPages,
    totalElements,
    pageSize,
  };
}

const FETCH_ALL_PAGE_SIZE = 50;

/**
 * Agrega todas as páginas de patrocinadores públicos do tier (ex.: todos os ouro).
 */
export async function fetchAllPublicSponsorsForTier(
  tier: PublicSponsorApiTier,
  init?: RequestInit
): Promise<PublicSponsorCard[]> {
  const first = await fetchPublicSponsorsPage(tier, 1, FETCH_ALL_PAGE_SIZE, init);
  const byId = new Map<string, PublicSponsorCard>();
  for (const item of first.items) {
    byId.set(item.id, item);
  }
  const totalPages = first.totalPages;
  for (let page = 2; page <= totalPages; page++) {
    const r = await fetchPublicSponsorsPage(tier, page, FETCH_ALL_PAGE_SIZE, init);
    for (const item of r.items) {
      byId.set(item.id, item);
    }
  }
  return Array.from(byId.values()).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

async function fetchSponsorsForTier(
  tier: PublicSponsorApiTier
): Promise<PublicSponsorCard[]> {
  const { items } = await fetchPublicSponsorsPage(tier, 1, 10);
  return items;
}

export async function fetchPublicSponsorsByTier(): Promise<SponsorsByTier> {
  const [gold, silver, bronze] = await Promise.all([
    fetchSponsorsForTier("GOLD"),
    fetchSponsorsForTier("SILVER"),
    fetchSponsorsForTier("BRONZE"),
  ]);
  return { gold, silver, bronze };
}

/** URL para link de site (adiciona https:// se faltar protocolo). */
export function publicSiteHref(site: string): string {
  const t = site.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

/** URL do perfil no Instagram a partir do valor da API. */
export function publicInstagramHref(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  const handle = t.replace(/^@+/, "").replace(/\/+$/, "");
  return `https://www.instagram.com/${handle}/`;
}
