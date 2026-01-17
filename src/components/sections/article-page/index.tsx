"use client";

import { Article } from "@/lib/strapi";

import { ArticleHeader } from "./article-header";
import { ArticleBlocks } from "./article-blocks";
import { RelatedArticles } from "./related-articles";

type ArticlePageContentProps = {
  article: Article;
  relatedArticles: Article[];
};

export function ArticlePageContent({
  article,
  relatedArticles,
}: ArticlePageContentProps) {
  return (
    <article className="relative overflow-hidden not-dark:bg-muted/80">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 size-[600px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 size-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Article Header with Cover, Title, Author, Sponsors */}
      <ArticleHeader article={article} />

      {/* Article Content */}
      <div className="relative container mx-auto px-4 py-10 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Blocks Content */}
          {article.blocks && article.blocks.length > 0 ? (
            <ArticleBlocks blocks={article.blocks} />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">Este artigo não possui conteúdo adicional.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Articles */}
      <RelatedArticles
        articles={relatedArticles}
        currentCategoryName={article.category?.name}
      />
    </article>
  );
}
