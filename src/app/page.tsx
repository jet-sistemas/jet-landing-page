import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { PreRegister } from "@/components/sections/pre-register";
import { Sponsors } from "@/components/sections/sponsors";
import { Publications } from "@/components/sections/publications";
import { StrapiPublications } from "@/components/sections/strapi-publications";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Sponsors />
        {/* <Publications /> */}
        <StrapiPublications />
        <PreRegister />
      </main>
      <Footer />
    </>
  );
}
