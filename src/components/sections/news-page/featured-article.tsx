"use client";

import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { getStrapiImageUrl, StrapiArticle } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

type FeaturedArticleProps = {
  article: StrapiArticle;
};

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const coverUrl = getStrapiImageUrl(
    article?.cover?.formats?.large?.url ||
      article?.cover?.formats?.medium?.url ||
      article?.cover?.url
  );
  const authorAvatarUrl = getStrapiImageUrl(
    article?.author?.avatar?.formats?.thumbnail?.url ||
      article?.author?.avatar?.url
  );
  const slug = article?.slug || article?.documentId || article?.id?.toString();
  const description = article?.description || "";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-xl">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-secondary via-accent to-primary z-10" />

      <div className="grid gap-0 lg:grid-cols-2">
        {/* Image Section */}
        <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[400px] overflow-hidden">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={article?.title || "Imagem de destaque"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
              <div className="text-center text-muted-foreground">
                <div className="mx-auto mb-2 size-16 rounded-full bg-muted flex items-center justify-center">
                  <Calendar className="size-8" />
                </div>
                <span className="text-sm">Sem imagem</span>
              </div>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-background/20" />

          {/* Category badge on image */}
          {article?.category?.name && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm font-semibold">
                {article.category.name}
              </Badge>
            </div>
          )}

          {/* Featured indicator */}
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-green-500/90 text-white backdrop-blur-sm font-bold">
              Em Destaque
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="size-4" />
            <time dateTime={article?.publishedAt}>
              {formatDate(article?.publishedAt || article?.createdAt)}
            </time>
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4 transition-colors group-hover:text-accent">
            {article?.title}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 line-clamp-4">
              {description}
            </p>
          )}

          {/* Author Info */}
          {article?.author && (
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/50">
              {authorAvatarUrl ? (
                <Image
                  src={authorAvatarUrl}
                  alt={article.author.name || "Autor"}
                  width={48}
                  height={48}
                  className="rounded-full object-cover ring-2 ring-accent/20"
                />
              ) : (
                <div className="size-12 rounded-full bg-muted flex items-center justify-center ring-2 ring-accent/20">
                  <User className="size-6 text-muted-foreground" />
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name || "Autor desconhecido"}
                </p>
                <p className="text-sm text-muted-foreground">Autor</p>
              </div>
            </div>
          )}

          {/* Read More Link */}
          <Link
            href={`/noticias/${slug}`}
            className="inline-flex items-center gap-2 text-accent font-semibold hover:underline group/link"
          >
            Ler matéria completa
            <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
