"use client";

import { useState } from "react";

import { Article } from "@/types/entities";
import { StrapiPublicationCard } from "./strapi-publication-card";

export const STRAPI_PUBLICATIONS_GRID_LAYOUT =
  "grid gap-6 md:grid-cols-2 lg:grid-cols-4";
export const STRAPI_PUBLICATIONS_GRID_CLASS = `mt-12 ${STRAPI_PUBLICATIONS_GRID_LAYOUT}`;
export const STRAPI_PUBLICATIONS_GRID_COUNT = 7;

type StrapiPublicationsGridProps = {
  articles: Article[];
};

export function StrapiPublicationsGrid({
  articles,
}: StrapiPublicationsGridProps) {
  const [navigatingSlug, setNavigatingSlug] = useState<string | null>(null);

  if (articles.length === 0) return null;

  const [featuredArticle, ...otherArticles] = articles;
  const featuredSlug =
    featuredArticle.slug || featuredArticle.id.toString();
  const isGridBusy = navigatingSlug !== null;

  return (
    <div className={STRAPI_PUBLICATIONS_GRID_CLASS}>
      <StrapiPublicationCard
        article={featuredArticle}
        featured
        isNavigating={navigatingSlug === featuredSlug}
        isGridBusy={isGridBusy}
        onNavigate={setNavigatingSlug}
      />

      {otherArticles.map((article) => {
        const slug = article.slug || article.id.toString();

        return (
          <StrapiPublicationCard
            key={article.id}
            article={article}
            isNavigating={navigatingSlug === slug}
            isGridBusy={isGridBusy}
            onNavigate={setNavigatingSlug}
          />
        );
      })}
    </div>
  );
}
