import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function ArticleNotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 md:pt-24">
        <section className="relative overflow-hidden py-20 lg:py-32 not-dark:bg-muted/80">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/4 -right-1/4 size-[600px] rounded-full bg-secondary/5 blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 size-[600px] rounded-full bg-accent/5 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4">
            <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
              {/* Icon */}
              <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-muted">
                <FileQuestion className="size-12 text-muted-foreground" />
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                Artigo não encontrado
              </h1>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-8">
                O artigo que você está procurando não existe ou foi removido.
                Verifique se o endereço está correto ou navegue pelas nossas
                notícias para encontrar o que procura.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="default" size="lg">
                  <Link href="/noticias">
                    <ArrowLeft className="mr-2 size-4" />
                    Ver todas as notícias
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/">
                    <Home className="mr-2 size-4" />
                    Voltar ao início
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
