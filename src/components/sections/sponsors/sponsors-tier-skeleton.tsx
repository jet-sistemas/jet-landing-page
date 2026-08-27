import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { SponsorCardSkeleton } from "./sponsor-card-skeleton";
import {
  SPONSORS_TIER_SKELETON_CONFIG,
  type SponsorsTierSkeletonConfig,
} from "./sponsors.constants";

type SponsorsTierSkeletonProps = {
  config: SponsorsTierSkeletonConfig;
  variant?: "skeleton" | "placeholder";
};

function SponsorsTierSkeleton({
  config,
  variant = "skeleton",
}: SponsorsTierSkeletonProps) {
  const isPlaceholder = variant === "placeholder";

  return (
    <div>
      <div className="mb-6 flex items-center justify-center gap-2">
        {isPlaceholder ? (
          <>
            <div className="size-5 rounded-full bg-muted/20" />
            <div className="h-6 w-24 rounded-md bg-muted/20" />
          </>
        ) : (
          <>
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </>
        )}
        <span className="sr-only">{config.label}</span>
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center justify-center",
          config.gap,
        )}
      >
        {Array.from({ length: config.count }, (_, index) => (
          <SponsorCardSkeleton key={index} variant={variant} />
        ))}
      </div>
    </div>
  );
}

type SponsorsTiersSkeletonProps = {
  variant?: "skeleton" | "placeholder";
  className?: string;
  "aria-busy"?: boolean;
  "aria-label"?: string;
};

export function SponsorsTiersSkeleton({
  variant = "skeleton",
  className,
  "aria-busy": ariaBusy,
  "aria-label": ariaLabel,
}: SponsorsTiersSkeletonProps) {
  return (
    <div
      aria-busy={ariaBusy}
      aria-label={ariaLabel}
      className={className}
    >
      {SPONSORS_TIER_SKELETON_CONFIG.map((config) => (
        <SponsorsTierSkeleton key={config.tier} config={config} variant={variant} />
      ))}
    </div>
  );
}
