import { Newspaper } from "lucide-react";

import { GridPlaceholder } from "@/components/ui/grid-placeholder";
import {
  STRAPI_PUBLICATIONS_GRID_COUNT,
  STRAPI_PUBLICATIONS_GRID_LAYOUT,
} from "./strapi-publication-grid";

export function EmptyStrapiPublications() {
  return (
    <GridPlaceholder
      count={STRAPI_PUBLICATIONS_GRID_COUNT}
      gridClassName={STRAPI_PUBLICATIONS_GRID_LAYOUT}
      className="mt-12"
      aria-label="Nenhuma publicação disponível"
    >
      <Newspaper className="mx-auto size-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-medium text-foreground">
        Em breve teremos novidades para compartilhar!
      </h3>
    </GridPlaceholder>
  );
}
