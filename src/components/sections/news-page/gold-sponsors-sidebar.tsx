"use client";

import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Crown } from "lucide-react";
import Link from "next/link";

import { GoldSponsorCard } from "@/components/sections/gold-sponsor-card";
import { Button } from "@/components/ui/button";
import {
  fetchAllPublicSponsorsForTier,
  type PublicSponsorCard,
} from "@/lib/backoffice-sponsors";
import { cn } from "@/lib/utils";

function SponsorsCtaBlock() {
  return (
    <div className="mt-6 border-t border-jet-gold/60 pt-6">
      <p className="mb-3 text-center text-sm font-semibold text-muted-foreground">
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
  );
}

function chunkSponsorsInPairs(list: PublicSponsorCard[]): PublicSponsorCard[][] {
  const pairs: PublicSponsorCard[][] = [];
  for (let i = 0; i < list.length; i += 2) {
    pairs.push(list.slice(i, i + 2));
  }
  return pairs;
}

export function GoldSponsorsSidebar() {
  const [items, setItems] = useState<PublicSponsorCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(0);

  const slideGroups = useMemo(() => chunkSponsorsInPairs(items), [items]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: slideGroups.length > 1,
      align: "start",
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const all = await fetchAllPublicSponsorsForTier("GOLD");
        if (!cancelled) setItems(all);
      } catch {
        if (!cancelled) {
          setError(true);
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, items]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <aside className="rounded-xl border border-jet-gold/60 bg-jet-gold/15 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-2">
        <Crown className="size-5 text-jet-gold" />
        <h3 className="font-serif text-xl font-semibold text-jet-gold">
          Patrocinadores Ouro
        </h3>
      </div>

      {loading && items.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          Carregando patrocinadores…
        </p>
      ) : error ? (
        <p className="text-center text-sm text-muted-foreground">
          Não foi possível carregar os patrocinadores. Tente novamente mais
          tarde.
        </p>
      ) : items.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          Nenhum patrocinador ouro no momento.
        </p>
      ) : (
        <div>
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex touch-pan-y">
              {slideGroups.map((pair) => (
                <div
                  key={`${pair[0]?.id ?? ""}-${pair[1]?.id ?? ""}`}
                  className="min-w-0 flex-[0_0_100%]"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {pair.map((sponsor) => (
                      <div key={sponsor.id} className="min-w-0">
                        <GoldSponsorCard sponsor={sponsor} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {slideGroups.length > 1 ? (
            <div className="mt-4 flex justify-center gap-1.5">
              {slideGroups.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    index === selectedSlide
                      ? "bg-jet-gold"
                      : "bg-jet-gold/30 hover:bg-jet-gold/60"
                  )}
                  aria-label={`Ir para o grupo ${index + 1} de patrocinadores`}
                  aria-current={index === selectedSlide ? "true" : undefined}
                />
              ))}
            </div>
          ) : null}
        </div>
      )}

      <SponsorsCtaBlock />
    </aside>
  );
}

export function GoldSponsorsCompact() {
  const [items, setItems] = useState<PublicSponsorCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const all = await fetchAllPublicSponsorsForTier("GOLD");
        if (!cancelled) setItems(all);
      } catch {
        if (!cancelled) {
          setError(true);
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="rounded-xl border border-jet-gold/30 bg-jet-gold/5 p-6">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Crown className="size-5 text-jet-gold" />
        <h3 className="font-serif text-lg font-semibold text-jet-gold">
          Patrocinadores Ouro
        </h3>
      </div>

      {loading && items.length === 0 ? (
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Carregando patrocinadores…
        </p>
      ) : error ? (
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Não foi possível carregar os patrocinadores.
        </p>
      ) : items.length === 0 ? (
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Nenhum patrocinador ouro no momento.
        </p>
      ) : (
        <div className="mb-6 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-6">
          {items.map((sponsor) => (
            <GoldSponsorCard
              key={sponsor.id}
              variant="compact"
              className="sm:max-w-[140px]"
              sponsor={sponsor}
            />
          ))}
        </div>
      )}

      <div className="text-center">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-jet-gold/30 text-jet-gold hover:bg-jet-gold/10 hover:text-jet-gold"
        >
          <Link href="/#pre-cadastro">Seja um Patrocinador</Link>
        </Button>
      </div>
    </section>
  );
}
