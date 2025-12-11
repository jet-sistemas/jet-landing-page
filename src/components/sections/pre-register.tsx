"use client";

import * as React from "react";
import { MessageCircle, Send, Phone, User, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { contactInfo } from "@/lib/data";

export function PreRegister() {
  const [formData, setFormData] = React.useState({
    name: "",
    cpf: "",
    whatsapp: "",
    type: "associado",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    console.log("Dados do pré-cadastro:", formData);

    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", cpf: "", whatsapp: "", type: "associado" });
    }, 3000);
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 10) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData((prev) => ({ ...prev, cpf: formatted }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, whatsapp: formatted }));
  };

  return (
    <section
      id="pre-cadastro"
      className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 lg:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 size-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 size-[500px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4">
            Pré-cadastro
          </Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Faça parte da <span className="text-accent">família J&T</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Preencha o formulário abaixo ou entre em contato diretamente pelo
            WhatsApp. Nossa equipe retornará em breve!
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Form Card */}
          <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">
                Formulário de Interesse
              </CardTitle>
              <CardDescription>
                Informe seus dados para iniciar seu cadastro
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                    <Send className="size-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Enviado com sucesso!
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Entraremos em contato em breve pelo WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Partner Type */}
                  <div className="space-y-3">
                    <Label>Tipo de Parceria</Label>
                    <RadioGroup
                      value={formData.type}
                      onValueChange={handleTypeChange}
                      className="grid grid-cols-2 gap-4"
                    >
                      <Label
                        htmlFor="associado"
                        className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem value="associado" id="associado" />
                        <div>
                          <span className="font-medium">Associado</span>
                          <p className="text-xs text-muted-foreground">
                            Atleta ou entusiasta
                          </p>
                        </div>
                      </Label>
                      <Label
                        htmlFor="patrocinador"
                        className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-jet-gold has-[:checked]:bg-jet-gold/5"
                      >
                        <RadioGroupItem
                          value="patrocinador"
                          id="patrocinador"
                        />
                        <div>
                          <span className="font-medium">Patrocinador</span>
                          <p className="text-xs text-muted-foreground">
                            Empresa parceira
                          </p>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* CPF */}
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={handleCPFChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        placeholder="(00) 0 0000-0000"
                        value={formData.whatsapp}
                        onChange={handlePhoneChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Enviar Pré-cadastro
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* WhatsApp Contact Card */}
          <div className="flex flex-col gap-6">
            <Card className="flex-1 border-2 border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <MessageCircle className="size-5 text-green-500" />
                  Contato via WhatsApp
                </CardTitle>
                <CardDescription>
                  Prefere falar diretamente conosco? Entre em contato pelo
                  WhatsApp!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    Envie uma mensagem com seus dados:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Nome completo</li>
                    <li>• CPF</li>
                    <li>• Número de WhatsApp</li>
                  </ul>
                </div>

                <div className="text-center">
                  <p className="mb-2 text-2xl font-bold text-foreground">
                    {contactInfo.whatsapp}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <a
                      href={`${
                        contactInfo.whatsappLink
                      }?text=${encodeURIComponent(
                        "Olá! Tenho interesse em me tornar parceiro da Associação J&T."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="size-5" />
                      Abrir WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <h4 className="mb-3 font-medium text-foreground">
                  Informações Importantes
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      O cadastro do associado será validado pela empresa
                      parceira ao utilizar benefícios.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      Patrocinadores podem escolher entre as categorias Ouro,
                      Prata ou Bronze.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      Entraremos em contato em até 48 horas úteis para finalizar
                      seu cadastro.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
