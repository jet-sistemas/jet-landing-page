import type { SponsorTier } from "@/types/entities";

const DEFAULT_API_BASE = "http://localhost:8080";

/** Base pública do R2 (Public Development URL ou CDN) — sem barra final. */
const DEFAULT_R2_PUBLIC_BASE =
  "https://pub-134d43c3b2494394b518c46b052650ee.r2.dev";

type ApiTier = "GOLD" | "SILVER" | "BRONZE";

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

function getApiBase(): string {
  const raw =
    process.env.NEXT_PUBLIC_BACKOFFICE_API_URL?.trim() || DEFAULT_API_BASE;
  return raw.replace(/\/$/, "");
}

function getR2PublicBase(): string {
  const raw =
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim() || DEFAULT_R2_PUBLIC_BASE;
  return raw.replace(/\/$/, "");
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

function parseItem(item: unknown, requestTier: ApiTier): PublicSponsorCard | null {
  const row = item as { user?: RawPublicSponsorUser };
  const user = row.user;
  const sponsor = user?.sponsor;
  if (!user || !sponsor) return null;

  const id = sponsor.id ?? user.id;
  if (id == null) return null;

  return {
    id: String(id),
    publicName:
      sponsor.publicName?.trim() ||
      user.name?.trim() ||
      "Patrocinador",
    tier: mapApiTierToUi(sponsor.tier ?? requestTier),
    logoUrl: resolveSponsorLogoUrl(sponsor.logoUrl),
    site: sponsor.site?.trim() || null,
    instagram: sponsor.instagram?.trim() || null,
    createdAt: user.createdAt ?? new Date(0).toISOString(),
  };
}

async function fetchSponsorsForTier(tier: ApiTier): Promise<PublicSponsorCard[]> {
  const base = getApiBase();
  const url = new URL(`${base}/v1/public/sponsors`);
  url.searchParams.set("tier", tier);
  url.searchParams.set("page", "1");
  url.searchParams.set("size", "10");

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Backoffice sponsors HTTP ${res.status}`);
  }

  let json: RawEnvelope;
  try {
    json = (await res.json()) as RawEnvelope;
  } catch {
    throw new Error("Resposta de patrocinadores inválida");
  }

  if (json.status === "ERROR") {
    throw new Error(json.message || "Erro ao listar patrocinadores");
  }

  const data = json.data;
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

  return items.slice(0, 10);
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
