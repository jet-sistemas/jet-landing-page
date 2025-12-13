import Link from "next/link";
import { Calendar, ArrowRight, Newspaper, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { publications } from "@/lib/data";
import { cn } from "@/lib/utils";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function PublicationCard({
  publication,
  featured = false,
}: {
  publication: (typeof publications)[0];
  featured?: boolean;
}) {
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

export function Publications() {
  const [featuredPublication, ...otherPublications] = publications;

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
          <Button asChild variant="outline" className="group shrink-0">
            <Link href="/publicacoes">
              Ver todas
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Publications Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Featured publication */}
          <PublicationCard publication={featuredPublication} featured />

          {/* Other publications */}
          {otherPublications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>

        {/* Empty state (if no publications) */}
        {publications.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/20 py-16 text-center">
            <Newspaper className="size-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium text-foreground">
              Nenhuma publicação ainda
            </h3>
            <p className="mt-2 text-muted-foreground">
              Em breve teremos novidades para compartilhar!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
