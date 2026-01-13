"use client";

import { ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchStrapiContent, StrapiArticle } from "@/lib/strapi";
import { StrapiPublicationsGrid } from "./strapi-publication-grid";
import { EmptyStrapiPublications } from "./empty-strapi-publication";
import { LoadingStrapiPublications } from "./loading-strapi-publication";
import { ErrorStrapiPublications } from "./error-strapi-publication";

export function StrapiPublications() {
  const [articles, setArticles] = useState<StrapiArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        setError(null);

        const result = await fetchStrapiContent("articles", {
          populate: ["cover"],
          pagination: {
            pageSize: 7,
            page: 1,
          },
        });
        console.log("🚀 ~ loadArticles ~ response:", result);

        if (result.data.length > 0) {
          setArticles(result.data);
        } else {
          setError(result.message || "Erro ao carregar artigos");
        }
      } catch (err) {
        setError(
          "Erro ao conectar com o Strapi. Verifique se o servidor está rodando."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadArticles();
  }, []);

  const hasArticles = articles.length > 0;
  const mustDisplayError = error && !isLoading;
  const mustDisplayContent = hasArticles && !isLoading && !mustDisplayError;
  const mustDisplayEmpty = !hasArticles && !isLoading && !mustDisplayError;

  return (
    <section
      id="publicacoes"
      className="relative overflow-hidden bg-muted/30 py-20 lg:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 right-0 size-[500px] rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <Badge className="mb-4">
              <Newspaper className="mr-1 size-3" />
              Publicações
            </Badge>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Últimas <span className="text-accent">Notícias</span>
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Fique por dentro das novidades, eventos e histórias da nossa
              comunidade esportiva.
            </p>
          </div>

          {hasArticles && (
            <Button
              asChild
              variant="outline"
              className="group shrink-0"
              disabled={isLoading || !!error}
            >
              <Link href="/artigos">
                Ver todas
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>

        {isLoading && <LoadingStrapiPublications />}

        {mustDisplayError && <ErrorStrapiPublications />}

        {mustDisplayContent && <StrapiPublicationsGrid articles={articles} />}

        {mustDisplayEmpty && <EmptyStrapiPublications />}
      </div>
    </section>
  );
}
