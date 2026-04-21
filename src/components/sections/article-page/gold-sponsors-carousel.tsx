"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Crown } from "lucide-react";
import Link from "next/link";

import { GoldSponsorCard } from "@/components/sections/gold-sponsor-card";
import { Button } from "@/components/ui/button";
import {
  fetchPublicSponsorsPage,
  type PublicSponsorCard,
} from "@/lib/backoffice-sponsors";

export function GoldSponsorsCarousel() {
  const [items, setItems] = useState<PublicSponsorCard[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loadedPage, setLoadedPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadLock = useRef(false);

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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const r = await fetchPublicSponsorsPage("GOLD", 1, 10);
        if (cancelled) return;
        setItems(r.items);
        setTotalPages(Math.max(1, r.totalPages));
        setLoadedPage(1);
      } catch {
        if (!cancelled) {
          setItems([]);
          setTotalPages(1);
          setLoadedPage(0);
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

    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      const len = items.length;
      if (len === 0) return;
      if (idx !== len - 1) return;
      if ((idx + 1) % 10 !== 0) return;
      if (loadedPage >= totalPages) return;
      if (loadLock.current) return;

      loadLock.current = true;
      fetchPublicSponsorsPage("GOLD", loadedPage + 1, 10)
        .then((r) => {
          setItems((prev) => {
            const ids = new Set(prev.map((p) => p.id));
            const merged = [...prev];
            for (const it of r.items) {
              if (!ids.has(it.id)) merged.push(it);
            }
            return merged;
          });
          setLoadedPage((p) => p + 1);
        })
        .catch(() => {})
        .finally(() => {
          loadLock.current = false;
        });
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, items.length, loadedPage, totalPages]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, items]);

  if (loading) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="mb-4 flex shrink-0 items-center justify-center gap-2">
        <Crown className="size-4 text-jet-gold" />
        <h3 className="font-serif text-md font-semibold text-jet-gold">
          Patrocinador Ouro
        </h3>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-jet-gold/30 bg-jet-gold/5 p-4">
        <div ref={emblaRef} className="min-h-0 flex-1 overflow-hidden">
          <div className="flex h-full">
            {items.map((sponsor) => (
              <div
                key={sponsor.id}
                className="group flex h-full min-h-0 min-w-0 flex-[0_0_100%] flex-col items-center justify-center"
              >
                <GoldSponsorCard variant="carousel" sponsor={sponsor} />
              </div>
            ))}
          </div>
        </div>

        {items.length > 1 ? (
          <div className="mt-4 flex shrink-0 justify-center gap-1.5">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className="size-2 rounded-full bg-jet-gold/30 transition-colors hover:bg-jet-gold/60"
                aria-label={`Ir para patrocinador ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-4 shrink-0 text-center">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-jet-gold/30 text-jet-gold hover:bg-jet-gold/10 hover:text-jet-gold"
        >
          <Link href="/#pre-cadastro">Seja um Patrocinador</Link>
        </Button>
      </div>
    </div>
  );
}
