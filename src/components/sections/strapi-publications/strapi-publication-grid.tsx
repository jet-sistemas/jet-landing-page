import { Article } from "@/types/entities";
import { StrapiPublicationCard } from "./strapi-publication-card";

type StrapiPublicationsGridProps = {
  articles: Article[];
};

export function StrapiPublicationsGrid({
  articles,
}: StrapiPublicationsGridProps) {
  if (articles.length === 0) return null;

  const [featuredArticle, ...otherArticles] = articles;

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StrapiPublicationCard article={featuredArticle} featured />

      {otherArticles.map((article) => (
        <StrapiPublicationCard key={article.id} article={article} />
      ))}
    </div>
  );
}
