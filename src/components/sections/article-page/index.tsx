"use client";

import { Article } from "@/types/entities";

import { ArticleBlocks } from "./article-blocks";
import { ArticleHeader } from "./article-header";

type ArticlePageContentProps = {
  article: Article;
};

export function ArticlePageContent({ article }: ArticlePageContentProps) {
  return (
    <article className="relative overflow-hidden not-dark:bg-muted/80">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 size-[600px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 size-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <ArticleHeader article={article} />

      <div className="relative container mx-auto px-4 py-10 lg:py-16">
        <div className="mx-auto max-w-3xl">
          {article.blocks && article.blocks.length > 0 ? (
            <ArticleBlocks blocks={article.blocks} />
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-lg">
                Este artigo não possui conteúdo adicional.
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
