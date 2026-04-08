"use client";

import { ExternalLink } from "lucide-react";

import { SponsorLogo } from "@/components/sections/sponsor-logo";
import {
  publicSiteHref,
  type PublicSponsorCard,
} from "@/lib/backoffice-sponsors";
import { cn } from "@/lib/utils";

const GOLD_TEXT = "text-jet-gold";

type GoldSponsorCardProps = {
  sponsor: PublicSponsorCard;
  variant?: "carousel" | "sidebar" | "compact";
  className?: string;
};

export function GoldSponsorCard({
  sponsor,
  variant = "sidebar",
  className,
}: GoldSponsorCardProps) {
  const siteUrl = sponsor.site ? publicSiteHref(sponsor.site) : "";

  const isCarousel = variant === "carousel";
  const isCompact = variant === "compact";

  const logoWrap = cn(
    "flex items-center justify-center rounded-lg bg-jet-gold/10 transition-transform group-hover:scale-105",
    isCompact ? "size-14 p-1.5 mb-2" : "size-16 p-2 mb-3"
  );

  const titleCls = cn(
    "text-center font-medium text-foreground",
    isCompact ? "text-sm" : "text-sm mb-2"
  );

  const linkCls = cn(
    "inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-jet-gold",
    isCarousel && "mb-0"
  );

  const inner = (
    <>
      <div className={logoWrap}>
        <SponsorLogo
          src={sponsor.logoUrl}
          alt={sponsor.publicName}
          tierColorClass={GOLD_TEXT}
        />
      </div>
      <h4 className={titleCls}>{sponsor.publicName}</h4>
      {siteUrl ? (
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkCls}
        >
          Visitar site
          <ExternalLink className="size-3 shrink-0" />
        </a>
      ) : null}
    </>
  );

  if (isCarousel) {
    return (
      <div
        className={cn(
          "flex min-w-0 flex-col items-center justify-center",
          className
        )}
      >
        {inner}
      </div>
    );
  }

  if (isCompact) {
    return (
      <div
        className={cn(
          "group flex flex-col items-center rounded-lg border border-jet-gold/20 bg-background/50 p-4 transition-all hover:border-jet-gold/40",
          className
        )}
      >
        {inner}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center rounded-lg border border-jet-gold/20 bg-background/50 p-4 transition-all hover:border-jet-gold/40 hover:shadow-md",
        className
      )}
    >
      {inner}
    </div>
  );
}
