import {
  fetchLatestArticles,
  fetchRelatedArticles,
} from "@/lib/strapi";

import { RelatedArticles } from "./related-articles";
import { EmptyRelatedArticles } from "./related-articles-states";

type RelatedArticlesLoaderProps = {
  slug: string;
  categorySlug?: string;
  categoryName?: string;
};

export async function RelatedArticlesLoader({
  slug,
  categorySlug,
  categoryName,
}: RelatedArticlesLoaderProps) {
  let relatedArticles = categorySlug
    ? await fetchRelatedArticles(categorySlug, slug, 4)
    : [];

  if (relatedArticles.length < 3) {
    relatedArticles = await fetchLatestArticles(slug, 4);
  }

  if (relatedArticles.length === 0) {
    return <EmptyRelatedArticles currentCategoryName={categoryName} />;
  }

  return (
    <RelatedArticles
      articles={relatedArticles}
      currentCategoryName={categoryName}
    />
  );
}
