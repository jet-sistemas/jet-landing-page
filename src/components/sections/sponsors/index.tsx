import { ArrowRight, Award, Crown, Medal } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { SponsorLogo } from "@/components/sections/sponsor-logo";
import { SponsorsError } from "@/components/sections/sponsors-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchPublicSponsorsByTier,
  publicInstagramHref,
  publicSiteHref,
  type PublicSponsorCard,
} from "@/lib/backoffice-sponsors";
import { cn } from "@/lib/utils";
import type { SponsorTier } from "@/types/entities";

import { EmptySponsors, LoadingSponsors } from "./loading-sponsors";
import { SPONSORS_TIERS_LAYOUT_CLASS } from "./sponsors.constants";
import { SponsorsTiersSkeleton } from "./sponsors-tier-skeleton";

const tierConfig: Record<
  SponsorTier,
  {
    label: string;
    icon: typeof Crown;
    color: string;
    bgColor: string;
    borderColor: string;
    bgBadgeColor: string;
    textBadgeColor: string;
  }
> = {
  gold: {
    label: "Ouro",
    icon: Crown,
    color: "text-yellow-900",
    bgColor: "bg-jet-gold/10",
    borderColor: "border-jet-gold/30",
    bgBadgeColor: "bg-jet-gold",
    textBadgeColor: "text-yellow-900",
  },
  silver: {
    label: "Prata",
    icon: Medal,
    color: "text-muted-foreground",
    bgColor: "bg-jet-silver/30",
    borderColor: "border-jet-silver/50",
    bgBadgeColor: "bg-jet-silver",
    textBadgeColor: "text-muted-foreground",
  },
  bronze: {
    label: "Bronze",
    icon: Award,
    color: "text-jet-bronze",
    bgColor: "bg-jet-bronze/10",
    borderColor: "border-jet-bronze/30",
    bgBadgeColor: "bg-jet-bronze",
    textBadgeColor: "text-white",
  },
};

function SponsorCard({ sponsor }: { sponsor: PublicSponsorCard }) {
  const tier = tierConfig[sponsor.tier];
  const TierIcon = tier.icon;
  const siteUrl = sponsor.site ? publicSiteHref(sponsor.site) : "";
  const instagramUrl = sponsor.instagram
    ? publicInstagramHref(sponsor.instagram)
    : "";

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center rounded-xl border-2 p-6 transition-all hover:shadow-lg",
        tier.borderColor,
        tier.bgColor,
      )}
    >
      <div
        className={cn(
          "absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
          tier.bgBadgeColor,
          tier.textBadgeColor,
        )}
      >
        <TierIcon className="size-3" />
        {tier.label}
      </div>

      <div className="flex size-24 items-center justify-center overflow-hidden rounded-lg bg-background/80 shadow-sm transition-transform group-hover:scale-105">
        <SponsorLogo
          src={sponsor.logoUrl}
          alt={sponsor.publicName}
          tierColorClass={tier.color}
        />
      </div>

      <h4 className="mt-4 text-center font-medium text-foreground">
        {sponsor.publicName}
      </h4>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-y-1 text-xs">
        {siteUrl ? (
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground hover:underline"
          >
            Site
          </a>
        ) : null}
        {siteUrl && instagramUrl ? (
          <span className="mx-1 text-muted-foreground">•</span>
        ) : null}
        {instagramUrl ? (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground hover:underline"
          >
            Instagram
          </a>
        ) : null}
      </div>
    </div>
  );
}

function SponsorsSectionShell({ children }: { children: ReactNode }) {
  return (
    <section
      id="patrocinadores"
      className="relative overflow-hidden bg-background py-20 lg:py-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 size-[400px] rounded-full bg-jet-gold/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 size-[400px] rounded-full bg-jet-silver/10 blur-3xl" />
      </div>
      <div className="container relative mx-auto px-4">{children}</div>
    </section>
  );
}

function SponsorsSectionHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge className="mb-4">Patrocinadores</Badge>
      <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        Nossos <span className="gradient-sponsors-text">Parceiros</span>
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Empresas que acreditam no poder transformador do esporte e apoiam nossa
        missão no sul do Piauí.
      </p>
    </div>
  );
}

function SponsorsCta() {
  return (
    <div className="mt-16 text-center">
      <p className="mb-6 text-lg text-muted-foreground">
        Quer ver sua empresa aqui?
      </p>
      <Button asChild variant="outline" size="lg" className="group">
        <Link href="/#pre-cadastro">
          Torne-se um Patrocinador
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}

function SponsorsTierSection({
  tier,
  sponsors,
  gapClassName,
}: {
  tier: SponsorTier;
  sponsors: PublicSponsorCard[];
  gapClassName: string;
}) {
  if (sponsors.length === 0) return null;

  const config = tierConfig[tier];
  const TierIcon = config.icon;
  const tierTitle =
    tier === "gold" ? "Tier Ouro" : tier === "silver" ? "Tier Prata" : "Tier Bronze";
  const titleClassName =
    tier === "gold"
      ? "text-jet-gold"
      : tier === "silver"
        ? "text-muted-foreground"
        : "text-jet-bronze";
  const iconClassName =
    tier === "gold"
      ? "text-jet-gold"
      : tier === "silver"
        ? "text-muted-foreground"
        : "text-jet-bronze";

  return (
    <div>
      <div className="mb-6 flex items-center justify-center gap-2">
        <TierIcon className={cn("size-5", iconClassName)} />
        <h3 className={cn("font-serif text-xl font-semibold", titleClassName)}>
          {tierTitle}
        </h3>
      </div>
      <div
        className={cn(
          "flex flex-wrap items-center justify-center",
          gapClassName,
        )}
      >
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}

export function SponsorsFallback() {
  return (
    <SponsorsSectionShell>
      <SponsorsSectionHeader />
      <LoadingSponsors />
      <SponsorsCta />
    </SponsorsSectionShell>
  );
}

export async function Sponsors() {
  let goldSponsors: PublicSponsorCard[];
  let silverSponsors: PublicSponsorCard[];
  let bronzeSponsors: PublicSponsorCard[];

  try {
    const data = await fetchPublicSponsorsByTier();
    goldSponsors = data.gold;
    silverSponsors = data.silver;
    bronzeSponsors = data.bronze;
  } catch {
    return (
      <SponsorsSectionShell>
        <SponsorsSectionHeader />
        <div className="relative mt-16">
          <SponsorsTiersSkeleton
            variant="placeholder"
            className="space-y-12"
            aria-label="Erro ao carregar patrocinadores"
          />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <SponsorsError className="max-w-md bg-background/95 shadow-sm backdrop-blur-sm" />
          </div>
        </div>
        <SponsorsCta />
      </SponsorsSectionShell>
    );
  }

  const hasSponsors =
    goldSponsors.length > 0 ||
    silverSponsors.length > 0 ||
    bronzeSponsors.length > 0;

  return (
    <SponsorsSectionShell>
      <SponsorsSectionHeader />

      {hasSponsors ? (
        <div className={SPONSORS_TIERS_LAYOUT_CLASS}>
          <SponsorsTierSection
            tier="gold"
            sponsors={goldSponsors}
            gapClassName="gap-6"
          />
          <SponsorsTierSection
            tier="silver"
            sponsors={silverSponsors}
            gapClassName="gap-6"
          />
          <SponsorsTierSection
            tier="bronze"
            sponsors={bronzeSponsors}
            gapClassName="gap-4"
          />
        </div>
      ) : (
        <EmptySponsors />
      )}

      <SponsorsCta />
    </SponsorsSectionShell>
  );
}
