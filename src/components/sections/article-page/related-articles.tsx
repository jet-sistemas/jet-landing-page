"use client";

import { useState } from "react";

import { ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/entities";

import { NewsCompactArticleCard } from "../news-page/news-compact-article-card";
import { getArticleSlug } from "../news-page/news-grid.constants";
import {
  RelatedArticlesGrid,
  RelatedArticlesSectionShell,
} from "./related-articles-states";

type RelatedArticlesProps = {
  articles: Article[];
  currentCategoryName?: string;
};

function RelatedArticlesHeader({
  currentCategoryName,
}: {
  currentCategoryName?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Badge className="mb-3">
          <Newspaper className="mr-1 size-3" />
          Mais Notícias
        </Badge>
        <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
          {currentCategoryName
            ? `Mais em ${currentCategoryName}`
            : "Continue lendo"}
        </h2>
      </div>
      <Button asChild variant="outline" className="self-start sm:self-auto">
        <Link href="/noticias">
          Ver todas
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </Button>
    </div>
  );
}

export function RelatedArticles({
  articles,
  currentCategoryName,
}: RelatedArticlesProps) {
  const [navigatingSlug, setNavigatingSlug] = useState<string | null>(null);
  const isGridBusy = navigatingSlug !== null;

  return (
    <RelatedArticlesSectionShell
      header={
        <RelatedArticlesHeader currentCategoryName={currentCategoryName} />
      }
    >
      <RelatedArticlesGrid>
        {articles.map((article) => {
          const slug = getArticleSlug(article);

          return (
            <NewsCompactArticleCard
              key={article.id}
              article={article}
              isNavigating={navigatingSlug === slug}
              isGridBusy={isGridBusy}
              onNavigate={setNavigatingSlug}
            />
          );
        })}
      </RelatedArticlesGrid>
    </RelatedArticlesSectionShell>
  );
}
