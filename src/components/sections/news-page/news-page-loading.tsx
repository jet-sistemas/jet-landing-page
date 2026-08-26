import { Newspaper } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FeaturedArticleSkeleton } from "@/components/sections/news-page/featured-article-skeleton";
import { LoadingNewsGrid } from "@/components/sections/news-page/loading-news-grid";
import { NEWS_GRID_SKELETON_COUNT } from "@/components/sections/news-page/news-grid.constants";

export function NewsPageLoading() {
  return (
    <section className="relative overflow-hidden py-12 lg:py-16 not-dark:bg-muted/80">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 size-[600px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 size-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mb-10">
          <Badge className="mb-4">
            <Newspaper className="mr-1 size-3" />
            Central de Notícias
          </Badge>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Todas as <span className="gradient-primary-text">Notícias</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Acompanhe as últimas novidades, eventos e histórias da nossa
            comunidade esportiva. Use os filtros para encontrar o que procura.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-muted bg-card p-6 backdrop-blur-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="mb-10">
          <FeaturedArticleSkeleton />
        </div>

        <LoadingNewsGrid count={NEWS_GRID_SKELETON_COUNT} />
      </div>
    </section>
  );
}
