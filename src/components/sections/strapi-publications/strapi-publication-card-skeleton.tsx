import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type StrapiPublicationCardSkeletonProps = {
  featured?: boolean;
  variant?: "skeleton" | "placeholder";
};

export function StrapiPublicationCardSkeleton({
  featured = false,
  variant = "skeleton",
}: StrapiPublicationCardSkeletonProps) {
  const isPlaceholder = variant === "placeholder";

  return (
    <Card
      aria-hidden
      className={cn(
        "overflow-hidden border-border/50 bg-card/80 pt-0",
        isPlaceholder && "border-dashed border-border/30 bg-muted/10",
        featured && "lg:col-span-2 lg:row-span-1",
      )}
    >
      {featured && (
        isPlaceholder ? (
          <div className="h-1 w-full bg-muted/20" />
        ) : (
          <Skeleton className="h-1 w-full rounded-none" />
        )
      )}

      {isPlaceholder ? (
        <div
          className={cn(
            "w-full bg-muted/20",
            featured ? "h-64" : "h-48",
          )}
        />
      ) : (
        <Skeleton
          className={cn(
            "w-full rounded-none",
            featured ? "h-64" : "h-48",
          )}
        />
      )}

      <CardHeader className="pb-2">
        {isPlaceholder ? (
          <>
            <div className="h-3 w-24 rounded-md bg-muted/20" />
            <div
              className={cn(
                "rounded-md bg-muted/20",
                featured ? "h-7 w-full" : "h-5 w-full",
              )}
            />
            <div
              className={cn(
                "rounded-md bg-muted/20",
                featured ? "h-7 w-4/5" : "h-5 w-4/5",
              )}
            />
          </>
        ) : (
          <>
            <Skeleton className="h-3 w-24" />
            <Skeleton className={cn("w-full", featured ? "h-7" : "h-5")} />
            <Skeleton className={cn("w-4/5", featured ? "h-7" : "h-5")} />
          </>
        )}
      </CardHeader>

      <CardContent className="space-y-2">
        {isPlaceholder ? (
          <>
            <div className="h-4 w-full rounded-md bg-muted/20" />
            <div className="h-4 w-full rounded-md bg-muted/20" />
            <div
              className={cn(
                "h-4 rounded-md bg-muted/20",
                featured ? "w-3/4" : "w-2/3",
              )}
            />
            {featured && <div className="h-4 w-1/2 rounded-md bg-muted/20" />}
            <div className="mt-2 h-4 w-20 rounded-md bg-muted/20" />
          </>
        ) : (
          <>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className={cn("h-4", featured ? "w-3/4" : "w-2/3")} />
            {featured && <Skeleton className="h-4 w-1/2" />}
            <Skeleton className="mt-2 h-4 w-20" />
          </>
        )}
      </CardContent>
    </Card>
  );
}
