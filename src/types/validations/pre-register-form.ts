import z from "zod";

type PartnerType = "associado" | "patrocinador";

const PRE_REGISTER_SCHEMA_BASE = z.object({
  type: z.enum(["associado", "patrocinador"], {
    required_error: "Selecione um tipo de parceria",
  }),
  // Associado
  name: z.string().max(120, "Nome muito longo").optional(),
  cpf: z.string().max(14, "CPF inválido").optional(),
  whatsapp: z.string().max(20, "WhatsApp inválido").optional(),
  // Patrocinador
  representativeName: z.string().max(120, "Nome muito longo").optional(),
  representativeWhatsapp: z.string().max(20, "WhatsApp inválido").optional(),
  companyCnpj: z.string().max(18, "CNPJ inválido").optional(),
});

const PRE_REGISTER_SCHEMA_REFINED = PRE_REGISTER_SCHEMA_BASE.superRefine(
  (data: PreRegisterForm, ctx: z.RefinementCtx) => {
    if (data.type === "associado") {
      if (!data.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o nome completo",
          path: ["name"],
        });
      }
      if (!data.cpf) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o CPF",
          path: ["cpf"],
        });
      }
      if (!data.whatsapp) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o WhatsApp",
          path: ["whatsapp"],
        });
      }
      return;
    }

    if (data.type === "patrocinador") {
      if (!data.representativeName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o nome do representante",
          path: ["representativeName"],
        });
      }
      if (!data.representativeWhatsapp) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o WhatsApp do representante",
          path: ["representativeWhatsapp"],
        });
      }
      if (!data.companyCnpj) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o CNPJ da empresa",
          path: ["companyCnpj"],
        });
      }
      return;
    }
  }
);

type PreRegisterForm = z.infer<typeof PRE_REGISTER_SCHEMA_BASE>;

export { PRE_REGISTER_SCHEMA_REFINED };
export type { PartnerType, PreRegisterForm };
