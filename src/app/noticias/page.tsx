import { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NewsPageContent } from "@/components/sections/news-page";

export const metadata: Metadata = {
  title: "Notícias | Associação Desportiva J&T",
  description:
    "Fique por dentro das últimas notícias, eventos e histórias da Associação Desportiva J&T.",
};

function NewsLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <Loader2 className="size-10 animate-spin text-accent" />
      <p className="mt-4 text-muted-foreground">Carregando notícias...</p>
    </div>
  );
}

export default function NoticiasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 md:pt-24">
        <Suspense fallback={<NewsLoading />}>
          <NewsPageContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
