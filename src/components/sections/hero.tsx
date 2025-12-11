import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Handshake } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-20 dark:to-primary/20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 size-[800px] rounded-full bg-secondary/10 blur-3xl dark:bg-secondary/5" />
        <div className="absolute -bottom-1/4 -left-1/4 size-[600px] rounded-full bg-accent/10 blur-3xl dark:bg-accent/5" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-8 py-12 lg:flex-row lg:gap-12 lg:py-20">
          {/* Content */}
          <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-jet-red/30 bg-jet-red/10 px-4 py-1.5 text-sm font-medium text-jet-red">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-jet-red opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-jet-red" />
              </span>
              Associação Desportiva J&T
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Transformando{" "}
              <span className="bg-linear-to-r from-secondary via-jet-red to-primary bg-clip-text text-transparent">
                vidas
              </span>{" "}
              através do{" "}
              <span className="bg-linear-to-r from-primary to-jet-red bg-clip-text text-transparent">
                esporte
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Nascemos do amor pelo vôlei e pelo propósito de desenvolver
              talentos no esporte, na arte e na cultura em todo o sul do Piauí.
              Junte-se a nós nessa jornada!
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="xl" className="group">
                <Link href="#pre-cadastro">
                  <Users className="size-5" />
                  Quero ser Associado
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="xl"
                className="group bg-linear-to-r transition-all duration-300 from-secondary to-jet-gold"
              >
                <Link href="#pre-cadastro">
                  <Handshake className="size-5" />
                  Quero Patrocinar
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-3xl font-bold text-foreground">
                  2025
                </span>
                <span className="text-sm text-muted-foreground">Fundação</span>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-3xl font-bold text-foreground">
                  Sul do PI
                </span>
                <span className="text-sm text-muted-foreground">Região</span>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-3xl font-bold text-foreground">
                  R$ 20
                </span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
            </div>
          </div>

          {/* Image/Logo */}
          <div className="relative flex items-center justify-center lg:flex-1">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-gradient-to-br from-secondary/30 via-accent/20 to-primary/30 blur-3xl" />

              <Image
                src="/logo_gradient.svg"
                alt="J&T Associação Desportiva"
                width={400}
                height={400}
                className="size-64 drop-shadow-2xl sm:size-80 md:size-96 lg:size-[400px]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Role para baixo
            </span>
            <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1">
              <div className="size-1.5 animate-bounce rounded-full bg-muted-foreground/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
