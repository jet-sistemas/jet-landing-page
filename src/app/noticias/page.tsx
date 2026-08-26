import { Metadata } from "next";
import { Suspense } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NewsPageContent } from "@/components/sections/news-page";
import { NewsPageLoading } from "@/components/sections/news-page/news-page-loading";
import { Sponsors, SponsorsFallback } from "@/components/sections/sponsors";

export const metadata: Metadata = {
  title: "Notícias | Associação Desportiva J&T",
  description:
    "Fique por dentro das últimas notícias, eventos e histórias da Associação Desportiva J&T.",
};

function NewsLoading() {
  return <NewsPageLoading />;
}

export default function NoticiasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-17 md:pt-21">
        <Suspense fallback={<NewsLoading />}>
          <NewsPageContent />
        </Suspense>
        <Suspense fallback={<SponsorsFallback />}>
          <Sponsors />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
