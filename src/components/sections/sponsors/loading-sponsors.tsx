import { Handshake } from "lucide-react";

import { SponsorsTiersSkeleton } from "./sponsors-tier-skeleton";
import { SPONSORS_TIERS_LAYOUT_CLASS } from "./sponsors.constants";

export function LoadingSponsors() {
  return (
    <SponsorsTiersSkeleton
      variant="skeleton"
      className={SPONSORS_TIERS_LAYOUT_CLASS}
      aria-busy
      aria-label="Carregando patrocinadores"
    />
  );
}

export function EmptySponsors() {
  return (
    <div className="relative mt-16">
      <SponsorsTiersSkeleton
        variant="placeholder"
        className="space-y-12"
        aria-label="Nenhum patrocinador disponível"
      />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="max-w-md rounded-xl border border-border/50 bg-background/95 px-8 py-10 text-center shadow-sm backdrop-blur-sm">
          <Handshake className="mx-auto size-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            Em breve teremos parceiros para apresentar!
          </h3>
        </div>
      </div>
    </div>
  );
}
