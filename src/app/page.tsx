import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Benefits } from "@/components/sections/benefits";
import { Hero } from "@/components/sections/hero";
import { PreRegister } from "@/components/sections/pre-register";
import { Sponsors } from "@/components/sections/sponsors";
import { StrapiPublications } from "@/components/sections/strapi-publications";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Sponsors />
        <StrapiPublications />
        <PreRegister />
      </main>
      <Footer />
    </>
  );
}
