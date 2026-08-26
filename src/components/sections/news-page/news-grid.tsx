"use client";

import { Article } from "@/types/entities";
import { StrapiPublicationCard } from "../strapi-publications/strapi-publication-card";

import {
  getArticleSlug,
  NEWS_GRID_FULL_SKELETON_COUNT,
  NEWS_GRID_SKELETON_COUNT,
} from "./news-grid.constants";
import { EmptyNewsGrid, LoadingNewsGrid } from "./loading-news-grid";

type NewsGridProps = {
  articles: Article[];
  isLoading?: boolean;
  skeletonCount?: number;
  navigatingSlug?: string | null;
  onNavigate?: (slug: string) => void;
};

export function NewsGrid({
  articles,
  isLoading,
  skeletonCount = NEWS_GRID_SKELETON_COUNT,
  navigatingSlug = null,
  onNavigate,
}: NewsGridProps) {
  const isGridBusy = navigatingSlug !== null;

  if (isLoading) {
    return <LoadingNewsGrid count={skeletonCount} />;
  }

  if (articles.length === 0) {
    return (
      <EmptyNewsGrid
        count={
          skeletonCount === NEWS_GRID_SKELETON_COUNT
            ? NEWS_GRID_SKELETON_COUNT
            : NEWS_GRID_FULL_SKELETON_COUNT
        }
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const slug = getArticleSlug(article);

        return (
          <StrapiPublicationCard
            key={article.documentId || article.id}
            article={article}
            isNavigating={navigatingSlug === slug}
            isGridBusy={isGridBusy}
            onNavigate={onNavigate}
          />
        );
      })}
    </div>
  );
}
