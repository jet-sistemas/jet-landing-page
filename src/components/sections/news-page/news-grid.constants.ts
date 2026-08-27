export const NEWS_GRID_LAYOUT = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";
export const NEWS_GRID_SKELETON_COUNT = 8;
export const NEWS_GRID_FULL_SKELETON_COUNT = 9;

export const RELATED_ARTICLES_GRID_LAYOUT =
  "grid gap-6 sm:grid-cols-2 lg:grid-cols-4";
export const RELATED_ARTICLES_COUNT = 4;

export function getArticleSlug(article: {
  slug?: string;
  documentId?: string;
  id?: string | number;
}) {
  return article.slug || article.documentId || article.id?.toString() || "";
}
