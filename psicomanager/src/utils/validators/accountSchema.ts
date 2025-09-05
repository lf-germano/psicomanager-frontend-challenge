import { z } from "zod";
import { PersonType } from "../enums/PersonType";

export const accountSchema = z.object({
  professional: z.string().min(1),
  bank: z.string().min(1, "Selecione o banco"),
  accountType: z.string().min(1),
  agency: z.string().min(1),
  accountNumber: z.string().min(1),
  personType: z.nativeEnum(PersonType),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  phone: z.string().min(1, "Informe o telefone").regex(/^\(\d{2}\) \d{4,5}-\d{4}$/),
  fullName: z.string().optional(),
  companyName: z.string().optional(),
  responsibleName: z.string().optional(),
  responsibleCpf: z.string().optional(),
  cep: z.string().min(1, "Informe o CEP").regex(/^\d{5}-\d{3}$/),
  state: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  number: z.string().min(1),
}).superRefine((data, ctx) => {
  if (data.personType === "FISICA") {
    if (!data.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(data.cpf)) {
      ctx.addIssue({
        path: ["cpf"],
        code: z.ZodIssueCode.custom,
        message: "Informe o CPF válido",
      });
    }
    if (!data.fullName || data.fullName.trim().length === 0) {
      ctx.addIssue({
        path: ["fullName"],
        code: z.ZodIssueCode.custom,
        message: "Informe o nome completo",
      });
    }
  }
  if (data.personType === "JURIDICA") {
    if (!data.cnpj || !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(data.cnpj)) {
      ctx.addIssue({
        path: ["cnpj"],
        code: z.ZodIssueCode.custom,
        message: "Informe o CNPJ válido",
      });
    }
    if (!data.companyName || data.companyName.trim().length === 0) {
      ctx.addIssue({
        path: ["companyName"],
        code: z.ZodIssueCode.custom,
        message: "Informe a razão social",
      });
    }
    if (!data.responsibleName || data.responsibleName.trim().length === 0) {
      ctx.addIssue({
        path: ["responsibleName"],
        code: z.ZodIssueCode.custom,
        message: "Informe o nome do responsável",
      });
    }
    if (!data.responsibleCpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(data.responsibleCpf)) {
      ctx.addIssue({
        path: ["responsibleCpf"],
        code: z.ZodIssueCode.custom,
        message: "Informe o CPF do responsável válido",
      });
    }
  }
});

