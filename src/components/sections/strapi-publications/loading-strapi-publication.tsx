import { StrapiPublicationCardSkeleton } from "./strapi-publication-card-skeleton";
import {
  STRAPI_PUBLICATIONS_GRID_CLASS,
  STRAPI_PUBLICATIONS_GRID_COUNT,
} from "./strapi-publication-grid";

export function LoadingStrapiPublications() {
  return (
    <div
      aria-busy="true"
      aria-label="Carregando publicações"
      className={STRAPI_PUBLICATIONS_GRID_CLASS}
    >
      <StrapiPublicationCardSkeleton featured />

      {Array.from({ length: STRAPI_PUBLICATIONS_GRID_COUNT - 1 }, (_, index) => (
        <StrapiPublicationCardSkeleton key={index} />
      ))}
    </div>
  );
}
