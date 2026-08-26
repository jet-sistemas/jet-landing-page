import { FileX } from "lucide-react";

import { GridPlaceholder } from "@/components/ui/grid-placeholder";
import { cn } from "@/lib/utils";
import { StrapiPublicationCardSkeleton } from "../strapi-publications/strapi-publication-card-skeleton";

import {
  NEWS_GRID_FULL_SKELETON_COUNT,
  NEWS_GRID_LAYOUT,
  NEWS_GRID_SKELETON_COUNT,
} from "./news-grid.constants";

type LoadingNewsGridProps = {
  count?: number;
  className?: string;
};

export function LoadingNewsGrid({
  count = NEWS_GRID_SKELETON_COUNT,
  className,
}: LoadingNewsGridProps) {
  return (
    <div
      aria-busy
      aria-label="Carregando notícias"
      className={cn(NEWS_GRID_LAYOUT, className)}
    >
      {Array.from({ length: count }, (_, index) => (
        <StrapiPublicationCardSkeleton key={index} />
      ))}
    </div>
  );
}

type EmptyNewsGridProps = {
  count?: number;
  className?: string;
  title?: string;
  description?: string;
};

export function EmptyNewsGrid({
  count = NEWS_GRID_FULL_SKELETON_COUNT,
  className,
  title = "Nenhuma notícia encontrada",
  description = "Tente ajustar os filtros ou buscar por outros termos.",
}: EmptyNewsGridProps) {
  return (
    <GridPlaceholder
      count={count}
      featuredIndex={null}
      gridClassName={NEWS_GRID_LAYOUT}
      className={className}
      itemConfig={{ imageHeight: "h-48" }}
      aria-label="Nenhuma notícia disponível"
    >
      <FileX className="mx-auto size-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </GridPlaceholder>
  );
}

export {
  NEWS_GRID_FULL_SKELETON_COUNT,
  NEWS_GRID_LAYOUT,
  NEWS_GRID_SKELETON_COUNT,
};
