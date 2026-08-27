import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GridPlaceholderItemConfig = {
  imageHeight?: string;
  className?: string;
};

type GridPlaceholderProps = {
  count: number;
  gridClassName?: string;
  className?: string;
  featuredIndex?: number | null;
  featuredClassName?: string;
  itemConfig?: GridPlaceholderItemConfig;
  featuredItemConfig?: GridPlaceholderItemConfig;
  children?: ReactNode;
  "aria-label"?: string;
};

function PlaceholderCard({
  imageHeight = "h-48",
  className,
}: GridPlaceholderItemConfig) {
  return (
    <div
      aria-hidden
      className={cn(
        "overflow-hidden rounded-xl border border-dashed border-border/30 bg-muted/10",
        className,
      )}
    >
      <div className={cn("w-full bg-muted/20", imageHeight)} />
      <div className="space-y-3 px-6 py-6">
        <div className="h-3 w-24 rounded-md bg-muted/20" />
        <div className="h-5 w-full rounded-md bg-muted/20" />
        <div className="h-5 w-4/5 rounded-md bg-muted/20" />
        <div className="h-4 w-full rounded-md bg-muted/20" />
        <div className="h-4 w-2/3 rounded-md bg-muted/20" />
        <div className="h-4 w-20 rounded-md bg-muted/20" />
      </div>
    </div>
  );
}

export function GridPlaceholder({
  count,
  gridClassName = "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
  className,
  featuredIndex = 0,
  featuredClassName = "lg:col-span-2 lg:row-span-1",
  itemConfig,
  featuredItemConfig,
  children,
  "aria-label": ariaLabel,
}: GridPlaceholderProps) {
  return (
    <div className={cn("relative", className)}>
      <div aria-label={ariaLabel} className={gridClassName}>
        {Array.from({ length: count }, (_, index) => {
          const isFeatured =
            featuredIndex !== null && index === featuredIndex;
          const config = isFeatured
            ? { imageHeight: "h-64", ...featuredItemConfig }
            : { imageHeight: "h-48", ...itemConfig };

          return (
            <PlaceholderCard
              key={index}
              imageHeight={config.imageHeight}
              className={cn(isFeatured && featuredClassName, config.className)}
            />
          );
        })}
      </div>

      {children && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-md rounded-xl border border-border/50 bg-background/95 px-8 py-10 text-center shadow-sm backdrop-blur-sm">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
