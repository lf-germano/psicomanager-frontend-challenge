import { z } from "zod";
import { PersonType } from "../enums/PersonType";

export const accountSchema = z.object({
  professional: z.string().min(1),
  bank: z.string().min(1, "Selecione o banco"),
  accountType: z.string().min(1),
  agency: z.string().min(1),
  accountNumber: z.string().min(1),
  personType: z.nativeEnum(PersonType),
  cpf: z.string().min(1, "Informe o CPF").regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).optional(),
  cnpj: z.string().min(1, "Informe o CNPJ").regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/).optional(),
  phone: z.string().min(1, "Informe o telefone").regex(/^\(\d{2}\) \d{4,5}-\d{4}$/),
  fullName: z.string().min(1, "Informe o nome completo").optional(),
  companyName: z.string().min(1, "Informe a razão social").optional(),
  responsibleName: z.string().min(1, "Informe o nome do responsável").optional(),
  responsibleCpf: z.string().min(1, "Informe o CPF do responsável").regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).optional(),
  cep: z.string().min(1, "Informe o CEP").regex(/^\d{5}-\d{3}$/),
  state: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  number: z.string().min(1),
}).refine((data) => {
  if (data.personType === "FISICA") {
    return !!data.cpf && !!data.fullName;
  }
  return !!data.cnpj && !!data.companyName && !!data.responsibleName && !!data.responsibleCpf;
}, {
  message: "Preencha todos os campos obrigatórios de acordo com o tipo de pessoa",
});

