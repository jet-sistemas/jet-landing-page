import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedArticleSkeleton() {
  return (
    <article
      aria-busy
      aria-label="Carregando matéria em destaque"
      className="overflow-hidden rounded-2xl border border-border/50 bg-card/80"
    >
      <div className="h-1 w-full bg-muted/20" />

      <div className="grid gap-0 lg:grid-cols-2">
        <Skeleton className="h-64 w-full rounded-none sm:h-80 lg:min-h-[400px]" />

        <div className="space-y-4 p-6 sm:p-8 lg:p-10">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center gap-3 border-b border-border/50 pb-6">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-5 w-40" />
        </div>
      </div>
    </article>
  );
}
