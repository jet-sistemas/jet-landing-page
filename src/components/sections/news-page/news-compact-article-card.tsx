"use client";

import { Calendar, Loader2, Newspaper } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { getStrapiImageUrl } from "@/lib/strapi";
import { ArticleDates } from "@/components/article-dates";
import { cn } from "@/lib/utils";
import { Article } from "@/types/entities";

type NewsCompactArticleCardProps = {
  article: Article;
  isNavigating?: boolean;
  isGridBusy?: boolean;
  onNavigate?: (slug: string) => void;
};

export function NewsCompactArticleCard({
  article,
  isNavigating = false,
  isGridBusy = false,
  onNavigate,
}: NewsCompactArticleCardProps) {
  const router = useRouter();
  const coverUrl = getStrapiImageUrl(
    article.cover?.formats?.medium?.url ||
      article.cover?.formats?.small?.url ||
      article.cover?.url,
  );
  const slug = article.slug || article.documentId || article.id?.toString();
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
      aria-label={`Ler artigo: ${article.title}`}
      aria-busy={isNavigating}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative h-full overflow-hidden rounded-xl border border-border/50 bg-card/80 transition-all hover:cursor-pointer hover:border-accent/30 hover:shadow-lg",
        isGridBusy && !isNavigating && "pointer-events-none opacity-50",
        isNavigating && "pointer-events-none opacity-70",
      )}
    >
      {isNavigating && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]"
          aria-hidden
        >
          <Loader2 className="size-8 animate-spin text-accent" />
        </div>
      )}

      <div className="relative h-40 overflow-hidden bg-muted">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Newspaper className="size-10 text-muted-foreground" />
          </div>
        )}

        {article.category?.name && (
          <div className="absolute top-2 left-2">
            <Badge
              variant="outline"
              className="bg-background/80 text-xs backdrop-blur-sm"
            >
              {article.category.name}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-start gap-1.5 text-muted-foreground">
          <Calendar className="mt-0.5 size-3 shrink-0" />
          <ArticleDates article={article} size="sm" />
        </div>

        <h3 className="line-clamp-2 font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
          {article.title}
        </h3>

        {article.description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {article.description}
          </p>
        )}
      </div>
    </article>
  );
}
