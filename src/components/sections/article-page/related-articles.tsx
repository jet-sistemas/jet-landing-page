"use client";

import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Article, getStrapiImageUrl } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

type RelatedArticlesProps = {
  articles: Article[];
  currentCategoryName?: string;
};

export function RelatedArticles({
  articles,
  currentCategoryName,
}: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Badge className="mb-3">
              <Newspaper className="mr-1 size-3" />
              Mais Notícias
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
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

        {/* Articles Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => {
            const coverUrl = getStrapiImageUrl(
              article.cover?.formats?.medium?.url ||
                article.cover?.formats?.small?.url ||
                article.cover?.url
            );
            const slug =
              article.slug || article.documentId || article.id?.toString();

            return (
              <Link
                key={article.id}
                href={`/noticias/${slug}`}
                className="group"
              >
                <article className="h-full rounded-xl border border-border/50 bg-card/80 overflow-hidden transition-all hover:border-accent/30 hover:shadow-lg">
                  {/* Cover Image */}
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

                    {/* Category badge */}
                    {article.category?.name && (
                      <div className="absolute top-2 left-2">
                        <Badge
                          variant="outline"
                          className="bg-background/80 backdrop-blur-sm text-xs"
                        >
                          {article.category.name}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                      <Calendar className="size-3" />
                      <time dateTime={article.publishedAt}>
                        {formatDate(article.publishedAt || article.createdAt)}
                      </time>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>

                    {/* Description */}
                    {article.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {article.description}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
