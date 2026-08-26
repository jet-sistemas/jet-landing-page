"use client";

import { ArrowRight, Calendar, Loader2, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { getStrapiImageUrl } from "@/lib/strapi";
import { cn, formatDate } from "@/lib/utils";
import { Article } from "@/types/entities";

import { getArticleSlug } from "./news-grid.constants";

type FeaturedArticleProps = {
  article: Article;
  isNavigating?: boolean;
  isGridBusy?: boolean;
  onNavigate?: (slug: string) => void;
};

export function FeaturedArticle({
  article,
  isNavigating = false,
  isGridBusy = false,
  onNavigate,
}: FeaturedArticleProps) {
  const router = useRouter();
  const coverUrl = getStrapiImageUrl(
    article?.cover?.formats?.large?.url ||
      article?.cover?.formats?.medium?.url ||
      article?.cover?.url,
  );
  const authorAvatarUrl = getStrapiImageUrl(
    article?.author?.avatar?.formats?.thumbnail?.url ||
      article?.author?.avatar?.url,
  );
  const slug = getArticleSlug(article);
  const description = article?.description || "";
  const href = `/noticias/${slug}`;

  const handleNavigate = () => {
    if (isGridBusy || !slug) return;
    onNavigate?.(slug);
    router.push(href);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleNavigate();
  };

  return (
    <article
      role="link"
      tabIndex={isGridBusy ? -1 : 0}
      aria-label={`Ler matéria em destaque: ${article?.title}`}
      aria-busy={isNavigating}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:cursor-pointer hover:border-accent/30 hover:shadow-xl",
        isGridBusy && !isNavigating && "pointer-events-none opacity-50",
        isNavigating && "pointer-events-none opacity-70",
      )}
    >
      {isNavigating && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-[1px]"
          aria-hidden
        >
          <Loader2 className="size-10 animate-spin text-accent" />
        </div>
      )}

      <div className="absolute top-0 right-0 left-0 z-10 h-1 bg-linear-to-r from-secondary via-accent to-primary" />

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full lg:min-h-[400px]">
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
                <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-muted">
                  <Calendar className="size-8" />
                </div>
                <span className="text-sm">Sem imagem</span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-background/20" />

          {article?.category?.name && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-accent/90 font-semibold text-accent-foreground backdrop-blur-sm">
                {article.category.name}
              </Badge>
            </div>
          )}

          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-green-500/90 font-bold text-white backdrop-blur-sm">
              Em Destaque
            </Badge>
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <time dateTime={article?.publishedAt}>
              {formatDate(article?.publishedAt || article?.createdAt)}
            </time>
          </div>

          <h2 className="mb-4 font-serif text-2xl leading-tight font-bold text-foreground transition-colors group-hover:text-accent sm:text-3xl lg:text-4xl">
            {article?.title}
          </h2>

          {description && (
            <p className="mb-6 line-clamp-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}

          {article?.author && (
            <div className="mb-6 flex items-center gap-3 border-b border-border/50 pb-6">
              {authorAvatarUrl ? (
                <Image
                  src={authorAvatarUrl}
                  alt={article.author.name || "Autor"}
                  width={48}
                  height={48}
                  className="rounded-full object-cover ring-2 ring-accent/20"
                />
              ) : (
                <div className="flex size-12 items-center justify-center rounded-full bg-muted ring-2 ring-accent/20">
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

          <span className="inline-flex items-center gap-2 font-semibold text-accent group-hover:underline">
            Ler matéria completa
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
