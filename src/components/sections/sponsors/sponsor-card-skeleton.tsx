import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SponsorCardSkeletonProps = {
  variant?: "skeleton" | "placeholder";
};

export function SponsorCardSkeleton({
  variant = "skeleton",
}: SponsorCardSkeletonProps) {
  const isPlaceholder = variant === "placeholder";

  return (
    <div
      aria-hidden
      className={cn(
        "relative flex w-[180px] flex-col items-center rounded-xl border-2 p-6",
        isPlaceholder
          ? "border-dashed border-border/30 bg-muted/10"
          : "border-border/30 bg-muted/10",
      )}
    >
      {isPlaceholder ? (
        <>
          <div className="absolute -top-3 h-6 w-20 rounded-full bg-muted/20" />
          <div className="size-24 rounded-lg bg-muted/20" />
          <div className="mt-4 h-5 w-32 rounded-md bg-muted/20" />
          <div className="mt-2 h-3 w-24 rounded-md bg-muted/20" />
        </>
      ) : (
        <>
          <Skeleton className="absolute -top-3 h-6 w-20 rounded-full" />
          <Skeleton className="size-24 rounded-lg" />
          <Skeleton className="mt-4 h-5 w-32" />
          <Skeleton className="mt-2 h-3 w-24" />
        </>
      )}
    </div>
  );
}
