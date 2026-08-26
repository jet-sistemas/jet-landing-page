"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStrapiImageUrl } from "@/lib/strapi";
import { cn, formatDate } from "@/lib/utils";
import { Article } from "@/types/entities";
import { ArrowRight, Calendar, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";

type StrapiPublicationCardProps = {
  article: Article;
  featured?: boolean;
  isNavigating?: boolean;
  isGridBusy?: boolean;
  onNavigate?: (slug: string) => void;
};

export function StrapiPublicationCard({
  article,
  featured = false,
  isNavigating = false,
  isGridBusy = false,
  onNavigate,
}: StrapiPublicationCardProps) {
  const router = useRouter();
  const imageUrl = getStrapiImageUrl(
    article?.cover?.formats?.small?.url ??
      article?.cover?.formats?.thumbnail?.url,
  );
  const slug = article?.slug || article.id.toString();
  const description = article?.description || "";
  const href = `/noticias/${slug}`;

  const handleNavigate = () => {
    if (isGridBusy) return;
    onNavigate?.(slug);
    router.push(href);
  };

  const handlePrefetch = () => {
    if (isGridBusy) return;
    router.prefetch(href);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleNavigate();
  };

  return (
    <Card
      role="link"
      tabIndex={isGridBusy ? -1 : 0}
      aria-label={`Ler artigo: ${article?.title}`}
      aria-busy={isNavigating}
      onClick={handleNavigate}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative hover:cursor-pointer",
        "group overflow-hidden border-border/50 bg-card/80 transition-all hover:border-accent/30 hover:shadow-lg",
        featured && "lg:col-span-2 lg:row-span-1 pt-0",
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

      {featured && (
        <div className="h-1 w-full bg-linear-to-r from-primary to-accent" />
      )}

      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          featured ? "h-64" : "h-48",
        )}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article?.title}
            width={500}
            height={500}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
            <ImageIcon className="size-16 text-muted-foreground/50" />
          </div>
        )}

        <div className="absolute top-4 left-4 flex gap-2">
          {featured && (
            <Badge className="bg-green-500/90 text-white font-bold backdrop-blur-sm">
              Novidade
            </Badge>
          )}
          {article?.category?.name && (
            <Badge
              variant="outline"
              className="bg-background/80 backdrop-blur-sm border-border/50"
            >
              {article.category.name}
            </Badge>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-3" />
          {formatDate(article?.publishedAt || article?.createdAt)}
        </div>
        <CardTitle
          className={cn(
            "line-clamp-2 font-serif transition-colors group-hover:text-accent",
            featured ? "text-2xl" : "text-lg",
          )}
        >
          {article?.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription
          className={cn("line-clamp-3", featured && "line-clamp-4 text-base")}
        >
          {description}
        </CardDescription>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline">
          Ler mais
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
        </span>
      </CardContent>
    </Card>
  );
}
