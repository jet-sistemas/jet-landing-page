import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ArticlePageContent } from "@/components/sections/article-page";
import { RelatedArticlesLoader } from "@/components/sections/article-page/related-articles-loader";
import { RelatedArticlesLoading } from "@/components/sections/article-page/related-articles-states";
import { Sponsors, SponsorsFallback } from "@/components/sections/sponsors";
import { fetchArticleBySlug, getStrapiImageUrl } from "@/lib/strapi";

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
    article.cover?.formats?.large?.url || article.cover?.url,
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

  return (
    <>
      <Header />
      <main className="min-h-screen pt-17 md:pt-21">
        <ArticlePageContent article={article} />
        <Suspense fallback={<RelatedArticlesLoading />}>
          <RelatedArticlesLoader
            slug={slug}
            categorySlug={article.category?.slug}
            categoryName={article.category?.name}
          />
        </Suspense>
        <Suspense fallback={<SponsorsFallback />}>
          <Sponsors />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
