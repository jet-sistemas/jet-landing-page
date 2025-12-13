import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { associateBenefits, membershipFee, sponsorBenefits } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Benefits() {
  return (
    <section
      id="beneficios"
      className="relative overflow-hidden bg-muted/30 py-20 lg:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="size-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4">Benefícios</Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Por que se tornar um <span className="text-accent">parceiro</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Seja como associado ou patrocinador, você faz parte de um movimento
            que transforma vidas através do esporte no sul do Piauí.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Associados Card */}
          <Card className="relative overflow-hidden border-2 border-primary/20 dark:border-accent/20 bg-card/80 backdrop-blur-sm">
            <div className="absolute top-0 left-0 h-1 w-full gradient-membership" />
            <CardHeader className="pb-4">
              <div className="mb-2 flex items-center justify-between">
                <Badge variant={"accent"}>Associado</Badge>
                <div className="text-right">
                  <span className="text-3xl font-bold text-foreground">
                    {membershipFee}
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>
              <CardTitle className="font-serif text-2xl">
                Para Atletas e Entusiastas
              </CardTitle>
              <p className="text-muted-foreground">
                Participe dos treinos, campeonatos e aproveite benefícios
                exclusivos com nossos parceiros comerciais.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {associateBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-lg",
                        "bg-primary/10 text-primary",
                        "dark:bg-foreground/10 dark:text-foreground"
                      )}
                    >
                      <benefit.icon className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* How to join */}
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-2 font-medium text-foreground">
                  Como se associar:
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span>Entre em contato via WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span>Envie: Nome completo, CPF e WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span>Mensalidade inicial: {membershipFee}</span>
                  </li>
                </ul>
              </div>

              <Button
                asChild
                className="w-full group gradient-membership text-white"
                size="lg"
              >
                <Link href="#pre-cadastro">
                  Quero ser Associado
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Patrocinadores Card */}
          <Card className="relative overflow-hidden border-2 border-jet-gold/30 bg-card/80 backdrop-blur-sm">
            <div
              className={cn(
                "absolute top-0 left-0 h-1 w-full gradient-sponsors"
              )}
            />
            <CardHeader className="pb-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="gold">Ouro</Badge>
                <Badge variant="silver">Prata</Badge>
                <Badge variant="bronze">Bronze</Badge>
              </div>
              <CardTitle className="font-serif text-2xl">
                Para Empresas e Parceiros
              </CardTitle>
              <p className="text-muted-foreground">
                Invista no esporte local e tenha sua marca associada a valores
                como saúde, educação e desenvolvimento social.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {sponsorBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-jet-gold/10 text-jet-gold">
                      <benefit.icon className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tiers explanation */}
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-3 font-medium text-foreground">
                  Categorias de Patrocínio:
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-jet-gold" />
                    <span className="font-medium text-jet-gold dark:text-jet-gold">
                      Ouro
                    </span>
                    <span className="text-muted-foreground">
                      - Máxima visibilidade
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-jet-silver" />
                    <span className="font-medium text-muted-foreground">
                      Prata
                    </span>
                    <span className="text-muted-foreground">
                      - Destaque em eventos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-jet-bronze" />
                    <span className="font-medium text-jet-bronze">Bronze</span>
                    <span className="text-muted-foreground">
                      - Presença garantida
                    </span>
                  </div>
                </div>
              </div>

              <Button
                asChild
                variant="secondary"
                className="w-full group bg-linear-to-r from-secondary to-jet-gold"
                size="lg"
              >
                <Link href="#pre-cadastro">
                  Quero Patrocinar
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
