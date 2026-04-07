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
        tier.bgColor
      )}
    >
      <div
        className={cn(
          "absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
          tier.bgBadgeColor,
          tier.textBadgeColor
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
          <span className="text-muted-foreground mx-1">•</span>
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

export function SponsorsFallback() {
  return (
    <SponsorsSectionShell>
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="mb-4">Patrocinadores</Badge>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Nossos <span className={"gradient-sponsors-text"}>Parceiros</span>
        </h2>
      </div>
      <p className="mt-8 text-center text-muted-foreground">
        Carregando patrocinadores…
      </p>
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
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4">Patrocinadores</Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Nossos <span className={"gradient-sponsors-text"}>Parceiros</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Empresas que acreditam no poder transformador do esporte e apoiam
            nossa missão no sul do Piauí.
          </p>
        </div>
        <SponsorsError />
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
      </SponsorsSectionShell>
    );
  }

  return (
    <SponsorsSectionShell>
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="mb-4">Patrocinadores</Badge>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Nossos <span className={"gradient-sponsors-text"}>Parceiros</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Empresas que acreditam no poder transformador do esporte e apoiam
          nossa missão no sul do Piauí.
        </p>
      </div>

      <div className="mt-16 space-y-12">
        {goldSponsors.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center justify-center gap-2">
              <Crown className="size-5 text-jet-gold" />
              <h3 className="font-serif text-xl font-semibold text-jet-gold">
                Tier Ouro
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {goldSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        ) : null}

        {silverSponsors.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center justify-center gap-2">
              <Medal className="size-5 text-muted-foreground" />
              <h3 className="font-serif text-xl font-semibold text-muted-foreground">
                Tier Prata
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {silverSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        ) : null}

        {bronzeSponsors.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center justify-center gap-2">
              <Award className="size-5 text-jet-bronze" />
              <h3 className="font-serif text-xl font-semibold text-jet-bronze">
                Tier Bronze
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {bronzeSponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        ) : null}
      </div>

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
    </SponsorsSectionShell>
  );
}
