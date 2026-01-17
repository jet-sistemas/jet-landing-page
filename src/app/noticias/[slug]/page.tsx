import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArticlePageContent } from "@/components/sections/article-page";
import {
  fetchArticleBySlug,
  fetchLatestArticles,
  fetchRelatedArticles,
  getStrapiImageUrl,
} from "@/lib/strapi";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artigo não encontrado | Associação Desportiva J&T",
    };
  }

  const coverUrl = getStrapiImageUrl(
    article.cover?.formats?.large?.url || article.cover?.url
  );

  return {
    title: `${article.title} | Associação Desportiva J&T`,
    description: article.description || `Leia mais sobre: ${article.title}`,
    openGraph: {
      title: article.title,
      description: article.description || `Leia mais sobre: ${article.title}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.author?.name ? [article.author.name] : undefined,
      images: coverUrl ? [{ url: coverUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description || `Leia mais sobre: ${article.title}`,
      images: coverUrl ? [coverUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Busca artigos relacionados (mesma categoria) ou mais recentes
  let relatedArticles = article.category?.slug
    ? await fetchRelatedArticles(article.category.slug, slug, 4)
    : [];

  // Se não houver artigos relacionados suficientes, busca os mais recentes
  if (relatedArticles.length < 3) {
    relatedArticles = await fetchLatestArticles(slug, 4);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-17 md:pt-21">
        <ArticlePageContent
          article={article}
          relatedArticles={relatedArticles}
        />
      </main>
      <Footer />
    </>
  );
}
