import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type NewsCompactCardSkeletonProps = {
  variant?: "skeleton" | "placeholder";
};

export function NewsCompactCardSkeleton({
  variant = "skeleton",
}: NewsCompactCardSkeletonProps) {
  const isPlaceholder = variant === "placeholder";

  return (
    <article
      aria-hidden
      className={cn(
        "h-full overflow-hidden rounded-xl border border-border/50 bg-card/80",
        isPlaceholder && "border-dashed border-border/30 bg-muted/10",
      )}
    >
      {isPlaceholder ? (
        <div className="h-40 w-full bg-muted/20" />
      ) : (
        <Skeleton className="h-40 w-full rounded-none" />
      )}

      <div className="space-y-2 p-4">
        {isPlaceholder ? (
          <>
            <div className="h-3 w-24 rounded-md bg-muted/20" />
            <div className="h-5 w-full rounded-md bg-muted/20" />
            <div className="h-4 w-full rounded-md bg-muted/20" />
            <div className="h-4 w-4/5 rounded-md bg-muted/20" />
          </>
        ) : (
          <>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </>
        )}
      </div>
    </article>
  );
}
