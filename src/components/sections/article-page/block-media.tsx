"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { MediaBlock } from "@/types/entities";
import { getStrapiImageUrl } from "@/lib/strapi";

type BlockMediaProps = {
  block: MediaBlock;
};

export function BlockMedia({ block }: BlockMediaProps) {
  const imageUrl = getStrapiImageUrl(
    block.file?.formats?.large?.url ||
      block.file?.formats?.medium?.url ||
      block.file?.url
  );

  const isVideo = block.file?.mime?.startsWith("video/");
  const caption = block.file?.caption;
  const alt = block.file?.alternativeText || "Imagem do artigo";

  if (!imageUrl && !isVideo) {
    return (
      <figure className="my-8">
        <div className="flex aspect-video items-center justify-center rounded-xl bg-muted">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="mx-auto size-12 mb-2" />
            <span className="text-sm">Mídia não disponível</span>
          </div>
        </div>
      </figure>
    );
  }

  if (isVideo) {
    const videoUrl = getStrapiImageUrl(block.file?.url);
    return (
      <figure className="my-8">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
          <video
            src={videoUrl || ""}
            controls
            className="size-full object-contain"
            preload="metadata"
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        <Image
          src={imageUrl!}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
