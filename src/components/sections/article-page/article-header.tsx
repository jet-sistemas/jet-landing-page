"use client";

import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Article, getStrapiImageUrl } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

import { GoldSponsorsCarousel } from "./gold-sponsors-carousel";

type ArticleHeaderProps = {
  article: Article;
};

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const coverUrl = getStrapiImageUrl(
    article?.cover?.formats?.large?.url ||
      article?.cover?.formats?.medium?.url ||
      article?.cover?.url
  );

  const authorAvatarUrl = getStrapiImageUrl(
    article?.author?.avatar?.formats?.thumbnail?.url ||
      article?.author?.avatar?.url
  );

  return (
    <header className="relative">
      {/* Hero Cover Image */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-primary/20 via-accent/10 to-secondary/20">
            <div className="text-center text-muted-foreground">
              <div className="mx-auto mb-4 size-20 rounded-full bg-muted/50 flex items-center justify-center">
                <Calendar className="size-10" />
              </div>
              <span className="text-lg">Sem imagem de capa</span>
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="backdrop-blur-sm bg-background/80 hover:bg-background"
          >
            <Link href="/noticias">
              <ArrowLeft className="mr-2 size-4" />
              Voltar às notícias
            </Link>
          </Button>
        </div>

        {/* Category badge */}
        {article.category?.name && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-accent text-accent-foreground backdrop-blur-sm font-semibold text-sm px-3 py-1">
              <Tag className="mr-1.5 size-3" />
              {article.category.name}
            </Badge>
          </div>
        )}
      </div>

      {/* Article Meta */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-24 sm:-mt-32 lg:-mt-40 z-10">
          <div className="rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:gap-8">
              {/* Main content */}
              <div className="flex-1 min-w-0">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="size-4" />
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt || article.createdAt)}
                  </time>
                </div>

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                  {article.title}
                </h1>

                {/* Description */}
                {article.description && (
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
                    {article.description}
                  </p>
                )}

                {/* Author Info */}
                {article.author && (
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    {authorAvatarUrl ? (
                      <Image
                        src={authorAvatarUrl}
                        alt={article.author.name || "Autor"}
                        width={56}
                        height={56}
                        className="rounded-full object-cover ring-2 ring-accent/20"
                      />
                    ) : (
                      <div className="size-14 rounded-full bg-muted flex items-center justify-center ring-2 ring-accent/20">
                        <User className="size-7 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground text-lg">
                        {article.author.name || "Autor desconhecido"}
                      </p>
                      <p className="text-sm text-muted-foreground">Autor</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sponsors Carousel - Desktop */}
              <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-l lg:border-border/50 lg:pl-8">
                <GoldSponsorsCarousel />
              </div>
            </div>

            {/* Sponsors Carousel - Mobile/Tablet */}
            <div className="lg:hidden mt-8 pt-8 border-t border-border/50">
              <GoldSponsorsCarousel />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
