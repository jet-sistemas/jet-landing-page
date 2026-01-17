"use client";

import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Building2, Crown, ExternalLink } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { sponsors } from "@/lib/data";

export function GoldSponsorsCarousel() {
  const goldSponsors = sponsors.filter((s) => s.tier === "gold");

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Re-init embla when sponsors change
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, goldSponsors]);

  if (goldSponsors.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Crown className="size-4 text-jet-gold" />
        <h3 className="font-serif text-sm font-semibold text-jet-gold">
          Patrocinador Ouro
        </h3>
      </div>

      {/* Carousel */}
      <div className="relative rounded-xl border border-jet-gold/30 bg-jet-gold/5 p-4 overflow-hidden">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {goldSponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="flex-[0_0_100%] min-w-0 flex flex-col items-center justify-center"
              >
                {/* Logo placeholder */}
                <div className="flex size-16 items-center justify-center rounded-lg bg-jet-gold/10 mb-3 transition-transform hover:scale-105">
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
        </div>

        {/* Navigation dots */}
        {goldSponsors.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {goldSponsors.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="size-2 rounded-full bg-jet-gold/30 hover:bg-jet-gold/60 transition-colors"
                aria-label={`Ir para patrocinador ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-4 text-center">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-jet-gold"
        >
          <Link href="/#pre-cadastro">Seja um Patrocinador</Link>
        </Button>
      </div>
    </div>
  );
}
