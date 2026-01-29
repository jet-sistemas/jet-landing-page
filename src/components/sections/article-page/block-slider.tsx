"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

import { SliderBlock } from "@/types/entities";
import { getStrapiImageUrl } from "@/lib/strapi";
import { cn } from "@/lib/utils";

type BlockSliderProps = {
  block: SliderBlock;
};

export function BlockSlider({ block }: BlockSliderProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
    return () => {
      emblaMainApi.off("select", onSelect);
      emblaMainApi.off("reInit", onSelect);
    };
  }, [emblaMainApi]);

  if (!block.files || block.files.length === 0) {
    return (
      <figure className="my-8">
        <div className="flex aspect-video items-center justify-center rounded-xl bg-muted">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="mx-auto size-12 mb-2" />
            <span className="text-sm">Galeria vazia</span>
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure className="my-10">
      {/* Main Carousel */}
      <div className="relative group">
        <div ref={emblaMainRef} className="overflow-hidden rounded-xl">
          <div className="flex">
            {block.files.map((file, index) => {
              const imageUrl = getStrapiImageUrl(
                file.formats?.large?.url ||
                  file.formats?.medium?.url ||
                  file.url
              );

              return (
                <div key={file.id || index} className="flex-[0_0_100%] min-w-0">
                  <div className="relative aspect-video bg-muted">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={file.alternativeText || `Imagem ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center">
                        <ImageIcon className="size-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {block.files.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium">
          {selectedIndex + 1} / {block.files.length}
        </div>
      </div>

      {/* Thumbnails */}
      {block.files.length > 1 && (
        <div className="mt-4">
          <div ref={emblaThumbsRef} className="overflow-hidden">
            <div className="flex gap-2">
              {block.files.map((file, index) => {
                const thumbUrl = getStrapiImageUrl(
                  file.formats?.thumbnail?.url ||
                    file.formats?.small?.url ||
                    file.url
                );

                return (
                  <button
                    key={file.id || index}
                    onClick={() => onThumbClick(index)}
                    className={cn(
                      "flex-[0_0_80px] min-w-0 h-16 rounded-lg overflow-hidden border-2 transition-all",
                      selectedIndex === index
                        ? "border-accent opacity-100"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                    aria-label={`Ver imagem ${index + 1}`}
                  >
                    {thumbUrl ? (
                      <div className="relative size-full">
                        <Image
                          src={thumbUrl}
                          alt={file.alternativeText || `Miniatura ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ) : (
                      <div className="flex size-full items-center justify-center bg-muted">
                        <ImageIcon className="size-4 text-muted-foreground" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Caption */}
      {block.files[selectedIndex]?.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {block.files[selectedIndex].caption}
        </figcaption>
      )}
    </figure>
  );
}
