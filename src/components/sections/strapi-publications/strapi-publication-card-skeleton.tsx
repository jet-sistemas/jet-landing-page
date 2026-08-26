import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type StrapiPublicationCardSkeletonProps = {
  featured?: boolean;
};

export function StrapiPublicationCardSkeleton({
  featured = false,
}: StrapiPublicationCardSkeletonProps) {
  return (
    <Card
      aria-hidden
      className={cn(
        "overflow-hidden border-border/50 bg-card/80 pt-0",
        featured && "lg:col-span-2 lg:row-span-1",
      )}
    >
      {featured && <Skeleton className="h-1 w-full rounded-none" />}

      <Skeleton
        className={cn(
          "w-full rounded-none",
          featured ? "h-64" : "h-48",
        )}
      />

      <CardHeader className="pb-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className={cn("w-full", featured ? "h-7" : "h-5")} />
        <Skeleton className={cn("w-4/5", featured ? "h-7" : "h-5")} />
      </CardHeader>

      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className={cn("h-4", featured ? "w-3/4" : "w-2/3")} />
        {featured && <Skeleton className="h-4 w-1/2" />}
        <Skeleton className="mt-2 h-4 w-20" />
      </CardContent>
    </Card>
  );
}
