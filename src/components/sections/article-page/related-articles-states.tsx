import type { ReactNode } from "react";

import { Newspaper } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  RELATED_ARTICLES_COUNT,
  RELATED_ARTICLES_GRID_LAYOUT,
} from "../news-page/news-grid.constants";
import { NewsCompactCardSkeleton } from "../news-page/news-compact-card-skeleton";

type RelatedArticlesSectionShellProps = {
  children: ReactNode;
  header?: ReactNode;
};

export function RelatedArticlesSectionShell({
  children,
  header,
}: RelatedArticlesSectionShellProps) {
  return (
    <section className="border-t border-border/50 py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {header}
        {children}
      </div>
    </section>
  );
}

export function RelatedArticlesLoading() {
  return (
    <RelatedArticlesSectionShell
      header={
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <div className="h-6 w-28 rounded-md bg-muted/20" />
            <div className="h-8 w-48 rounded-md bg-muted/20" />
          </div>
          <div className="h-10 w-32 rounded-md bg-muted/20" />
        </div>
      }
    >
      <div
        aria-busy
        aria-label="Carregando artigos relacionados"
        className={RELATED_ARTICLES_GRID_LAYOUT}
      >
        {Array.from({ length: RELATED_ARTICLES_COUNT }, (_, index) => (
          <NewsCompactCardSkeleton key={index} />
        ))}
      </div>
    </RelatedArticlesSectionShell>
  );
}

type EmptyRelatedArticlesProps = {
  currentCategoryName?: string;
};

export function EmptyRelatedArticles({
  currentCategoryName,
}: EmptyRelatedArticlesProps) {
  return (
    <RelatedArticlesSectionShell
      header={
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
            <Newspaper className="mr-1 size-3" />
            Mais Notícias
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            {currentCategoryName
              ? `Mais em ${currentCategoryName}`
              : "Continue lendo"}
          </h2>
        </div>
      }
    >
      <div className="relative">
        <div
          aria-label="Nenhum artigo relacionado disponível"
          className={RELATED_ARTICLES_GRID_LAYOUT}
        >
          {Array.from({ length: RELATED_ARTICLES_COUNT }, (_, index) => (
            <NewsCompactCardSkeleton key={index} variant="placeholder" />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-md rounded-xl border border-border/50 bg-background/95 px-8 py-10 text-center shadow-sm backdrop-blur-sm">
            <Newspaper className="mx-auto size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              Nenhuma notícia relacionada por enquanto
            </h3>
          </div>
        </div>
      </div>
    </RelatedArticlesSectionShell>
  );
}

export function RelatedArticlesGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(RELATED_ARTICLES_GRID_LAYOUT, className)}>{children}</div>
  );
}
