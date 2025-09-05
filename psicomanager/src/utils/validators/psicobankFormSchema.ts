import { z } from "zod";
import { accountSchema } from "./accountSchema";
import { channelsSchema } from "./channelsSchema";
import { paymentTypeSchema } from "./paymentTypeSchema";

// Merge all schemas into one
export const psicobankFormSchema = accountSchema
  .merge(channelsSchema)
  .merge(paymentTypeSchema);

export type PsicoBankForm = z.infer<typeof psicobankFormSchema>;