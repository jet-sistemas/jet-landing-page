"use client";

import { StrapiArticle } from "@/lib/strapi";
import { StrapiPublicationCard } from "../strapi-publications/strapi-publication-card";
import { FileX, Loader2 } from "lucide-react";

type NewsGridProps = {
  articles: StrapiArticle[];
  isLoading?: boolean;
};

export function NewsGrid({ articles, isLoading }: NewsGridProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="size-10 animate-spin text-accent" />
        <p className="mt-4 text-muted-foreground">Carregando notícias...</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <FileX className="size-10 text-muted-foreground" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground">
          Nenhuma notícia encontrada
        </h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          Tente ajustar os filtros ou buscar por outros termos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <StrapiPublicationCard
          key={article.documentId || article.id}
          article={article}
        />
      ))}
    </div>
  );
}
