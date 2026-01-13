"use client";

import {
  ArrowRight,
  Calendar,
  ImageIcon,
  Loader2,
  Newspaper,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { publications } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Publication } from "@/types/entities";
import { useEffect, useState } from "react";
import { fetchStrapiContent } from "@/lib/strapi";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

type PublicationCardProps = {
  publication: (typeof publications)[0];
  featured?: boolean;
};

function PublicationCard({
  publication,
  featured = false,
}: PublicationCardProps) {
  return (
    <Card
      className={cn(
        "hover:cursor-pointer",
        "group overflow-hidden border-border/50 bg-card/80 transition-all hover:border-accent/30 hover:shadow-lg",
        featured && "lg:col-span-2 lg:row-span-1 pt-0"
      )}
    >
      {featured && (
        <div className="h-1 w-full bg-linear-to-r from-primary to-accent" />
      )}

      {/* Image placeholder */}
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          featured ? "h-64" : "h-48"
        )}
      >
        <div className="flex size-full items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
          <ImageIcon className="size-16 text-muted-foreground/50" />
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="relative">
            {publication.category}
          </Badge>

          {featured && (
            <Badge className=" bg-green-500/90 text-white font-bold backdrop-blur-sm">
              Novidade
            </Badge>
          )}
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-3" />
          {formatDate(publication.publishedAt)}
        </div>
        <CardTitle
          className={cn(
            "line-clamp-2 font-serif transition-colors group-hover:text-accent",
            featured ? "text-2xl" : "text-lg"
          )}
        >
          {publication.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription
          className={cn("line-clamp-3", featured && "line-clamp-4 text-base")}
        >
          {publication.excerpt}
        </CardDescription>
        <Link
          href={`/publicacoes/${publication.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          Ler mais
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}

function EmptyPublication() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/20 py-16 text-center">
      <Newspaper className="size-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-medium text-foreground">
        Em breve teremos novidades para compartilhar!
      </h3>
    </div>
  );
}

type PublicationsGridProps = {
  publications: Publication[];
};

function PublicationsGrid({ publications }: PublicationsGridProps) {
  const [featuredPublication, ...otherPublications] = publications;
  console.log("🚀 ~ PublicationsGrid ~ publications:", publications);

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* <PublicationCard publication={featuredPublication} featured />

      {otherPublications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))} */}
      Tem coisa aqui
    </div>
  );
}

export function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   async function loadPublications() {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch("/api/strapi/articles");
  //       const result = await response.json();

  //       if (result.success) {
  //         setPublications(result.data);
  //       } else {
  //         setError("Erro ao carregar publicações");
  //       }
  //     } catch (err) {
  //       console.error("Erro:", err);
  //       setError("Erro ao carregar publicações");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   loadPublications();
  // }, []);

  useEffect(() => {
    // fetchStrapiContent<Publication>("articles")
    //   .then((response) => {
    //     setPublications(response.data.map((item) => item.attributes));
    //   })
    //   .catch((error) => {
    //     console.error("Erro ao carregar publicações:", error);
    //     setError("Erro ao carregar publicações");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  });

  const hasPublications = publications.length > 0;

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

          {hasPublications && (
            <Button asChild variant="outline" className="group shrink-0">
              <Link href="/publicacoes">
                Ver todas
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
        ) : (
          error && <div className="text-red-500">{error}</div>
        )}

        {/* Publications Grid */}
        {hasPublications && <PublicationsGrid publications={publications} />}

        {!hasPublications && <EmptyPublication />}
      </div>
    </section>
  );
}
