"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, MessageCircle, Phone, Send, User } from "lucide-react";
import { Activity, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

import { Badge } from "@/components/ui/badge";
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
import { contactInfo } from "@/lib/data";
import { cn, formatCNPJ, formatCPF, formatPhone } from "@/lib/utils";
import {
  PartnerType,
  PRE_REGISTER_SCHEMA_REFINED,
  PreRegisterForm,
} from "@/types/validations/PreRegisterForm";

const REQUESTED_DATA_MEMBERSHIP = [
  "Nome Completo",
  "CPF",
  "Número de Whatsapp (opcional)",
];

const REQUESTED_DATA_SPONSOR = [
  "Nome do Representante",
  "CNPJ da Empresa",
  "Número de Whatsapp (opcional)",
];

function ListRequiredData({ type }: { type: "associado" | "patrocinador" }) {
  return (
    <>
      {type === "associado" &&
        REQUESTED_DATA_MEMBERSHIP.map((item) => <li key={item}>• {item}</li>)}
      {type === "patrocinador" &&
        REQUESTED_DATA_SPONSOR.map((item) => <li key={item}>• {item}</li>)}
    </>
  );
}

export function PreRegister() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formMethods = useForm<PreRegisterForm>({
    defaultValues: {
      type: "associado",
      name: undefined,
      cpf: undefined,
      whatsapp: undefined,
      representativeName: undefined,
      representativeWhatsapp: undefined,
      companyCnpj: undefined,
    },
    mode: "onSubmit",
    resolver: zodResolver(PRE_REGISTER_SCHEMA_REFINED),
  });

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = formMethods;

  const partnerType = watch("type");

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setValue("cpf", formatted);
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setValue("companyCnpj", formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);

    if (partnerType === "associado") {
      setValue("whatsapp", formatted);
    } else {
      setValue("representativeWhatsapp", formatted);
    }
  };

  const onSubmit: SubmitHandler<PreRegisterForm> = async (
    data: PreRegisterForm
  ) => {
    try {
      const response = await fetch("/api/pre-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erro ao enviar pré-cadastro");
      }

      setIsSubmitted(true);
      reset({
        type: data.type,
        name: "",
        cpf: "",
        whatsapp: "",
        representativeName: "",
        representativeWhatsapp: "",
        companyCnpj: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar pré-cadastro. Por favor, tente novamente.");
    }
  };

  return (
    <section
      id="pre-cadastro"
      className="relative overflow-hidden bg-linear-to-b from-background to-muted/30 py-20 lg:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 size-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 size-[500px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4">Pré-cadastro</Badge>
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
                <FormProvider {...formMethods}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Tipo de Parceria */}
                    <div className="space-y-3">
                      <Label>Tipo de Parceria</Label>
                      <RadioGroup
                        value={partnerType}
                        onValueChange={(value) =>
                          setValue("type", value as PartnerType)
                        }
                        className="grid grid-cols-2 gap-4"
                      >
                        <Label
                          htmlFor="associado"
                          className={cn(
                            "flex cursor-pointer items-center",
                            "gap-3 rounded-lg border-2 border-border p-4",
                            "transition-colors hover:bg-muted/50 has-checked:border-accent has-checked:bg-accent/5"
                          )}
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
                          className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-border p-4 transition-colors hover:bg-muted/50 has-checked:border-jet-gold has-checked:bg-jet-gold/5"
                        >
                          <RadioGroupItem
                            value="patrocinador"
                            id="patrocinador"
                          />
                          <div>
                            <span
                              className={cn(
                                "font-medium",
                                partnerType === "patrocinador" &&
                                  "text-jet-gold"
                              )}
                            >
                              Patrocinador
                            </span>
                            <p className="text-xs text-muted-foreground">
                              Empresa parceira
                            </p>
                          </div>
                        </Label>
                      </RadioGroup>
                    </div>

                    <Activity
                      mode={partnerType === "associado" ? "visible" : "hidden"}
                    >
                      <FormMembership
                        onCPFChange={handleCPFChange}
                        onPhoneChange={handlePhoneChange}
                      />
                    </Activity>

                    <Activity
                      mode={
                        partnerType === "patrocinador" ? "visible" : "hidden"
                      }
                    >
                      <FormSponsor
                        onCNPJChange={handleCNPJChange}
                        onPhoneChange={handlePhoneChange}
                      />
                    </Activity>

                    <Button
                      type="submit"
                      className={cn(
                        "w-full",
                        partnerType === "patrocinador" &&
                          "bg-jet-gold text-jet-dark-blue hover:bg-jet-gold/90",
                        partnerType === "associado" &&
                          "dark:bg-accent dark:text-foreground dark:hover:bg-accent/90"
                      )}
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
                </FormProvider>
              )}
            </CardContent>
          </Card>

          {/* WhatsApp Contact Card */}
          <div className="flex flex-col gap-6">
            <Card className="flex-1 border-2 border-green-500/20 bg-green-500/5 dark:bg-green-500/15">
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
                    <ListRequiredData type={partnerType} />
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

type FormMembershipProps = {
  onCPFChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormMembership({ onCPFChange, onPhoneChange }: FormMembershipProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<PreRegisterForm>();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            {...register("name")}
            type="text"
            placeholder="Seu nome completo"
            className="pl-10"
          />
        </div>
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* CPF */}
      <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            {...register("cpf")}
            type="text"
            placeholder="000.000.000-00"
            onChange={onCPFChange}
            className="pl-10"
          />
        </div>
        {errors.cpf && (
          <p className="text-xs text-destructive">{errors.cpf.message}</p>
        )}
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            {...register("whatsapp")}
            type="tel"
            placeholder="(00) 0 0000-0000"
            onChange={onPhoneChange}
            className="pl-10"
          />
        </div>
        {errors.whatsapp && (
          <p className="text-xs text-destructive">{errors.whatsapp.message}</p>
        )}
      </div>
    </>
  );
}

type FormSponsorProps = {
  onCNPJChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormSponsor({ onCNPJChange, onPhoneChange }: FormSponsorProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<PreRegisterForm>();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Representante</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            {...register("representativeName")}
            type="text"
            placeholder="Seu nome completo"
            className="pl-10"
          />
        </div>
        {errors.representativeName && (
          <p className="text-xs text-destructive">
            {errors.representativeName.message}
          </p>
        )}
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            {...register("representativeWhatsapp")}
            type="tel"
            placeholder="(00) 0 0000-0000"
            onChange={onPhoneChange}
            className="pl-10"
          />
        </div>
        {errors.representativeWhatsapp && (
          <p className="text-xs text-destructive">
            {errors.representativeWhatsapp.message}
          </p>
        )}
      </div>

      {/* Company CNPJ */}
      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ da Empresa</Label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            {...register("companyCnpj")}
            type="text"
            placeholder="00.000.000/0000-00"
            className="pl-10"
            onChange={onCNPJChange}
            maxLength={18}
          />
        </div>
        {errors.companyCnpj && (
          <p className="text-xs text-destructive">
            {errors.companyCnpj.message}
          </p>
        )}
      </div>
    </>
  );
}
