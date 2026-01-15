"use client";

import { Building2, Crown, ExternalLink } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { sponsors } from "@/lib/data";
import { cn } from "@/lib/utils";

export function GoldSponsorsSidebar() {
  const goldSponsors = sponsors.filter((s) => s.tier === "gold");

  if (goldSponsors.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-xl border border-jet-gold/60 bg-jet-gold/15 p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Crown className="size-5 text-jet-gold" />
        <h3 className="font-serif text-lg font-semibold text-jet-gold">
          Patrocinadores Ouro
        </h3>
      </div>

      {/* Sponsors List */}
      <div className="space-y-4">
        {goldSponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className={cn(
              "group relative flex flex-col items-center rounded-lg border border-jet-gold/20 bg-background/50 p-4 transition-all hover:border-jet-gold/40 hover:shadow-md"
            )}
          >
            {/* Logo placeholder */}
            <div className="flex size-16 items-center justify-center rounded-lg bg-jet-gold/10 mb-3 transition-transform group-hover:scale-105">
              <Building2 className="size-8 text-jet-gold" />
            </div>

            {/* Name */}
            <h4 className="text-center font-medium text-foreground text-sm mb-2">
              {sponsor.name}
            </h4>

            {/* Website link */}
            {sponsor.website && (
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-jet-gold transition-colors"
              >
                Visitar site
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6 pt-6 border-t border-jet-gold/60">
        <p className="text-center font-semibold text-sm text-muted-foreground mb-3">
          Quer ser um patrocinador?
        </p>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full border-jet-gold/30 text-jet-gold hover:bg-jet-gold/10 hover:text-jet-gold"
        >
          <Link href="/#pre-cadastro">Seja um Parceiro</Link>
        </Button>
      </div>
    </aside>
  );
}

/**
 * Versão compacta para mobile - exibida abaixo da paginação
 */
export function GoldSponsorsCompact() {
  const goldSponsors = sponsors.filter((s) => s.tier === "gold");

  if (goldSponsors.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-jet-gold/30 bg-jet-gold/5 p-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Crown className="size-5 text-jet-gold" />
        <h3 className="font-serif text-lg font-semibold text-jet-gold">
          Patrocinadores Ouro
        </h3>
      </div>

      {/* Sponsors Grid */}
      <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-6">
        {goldSponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="group flex flex-col items-center rounded-lg border border-jet-gold/20 bg-background/50 p-4 transition-all hover:border-jet-gold/40"
          >
            <div className="flex size-14 items-center justify-center rounded-lg bg-jet-gold/10 mb-2">
              <Building2 className="size-7 text-jet-gold" />
            </div>
            <h4 className="text-center font-medium text-foreground text-sm">
              {sponsor.name}
            </h4>
            {sponsor.website && (
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-jet-gold transition-colors"
              >
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-jet-gold/30 text-jet-gold hover:bg-jet-gold/10"
        >
          <Link href="/#pre-cadastro">Seja um Patrocinador</Link>
        </Button>
      </div>
    </section>
  );
}
