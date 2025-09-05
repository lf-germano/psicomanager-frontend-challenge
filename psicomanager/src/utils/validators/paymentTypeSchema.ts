import { z } from "zod";

export const paymentTypeSchema = z.object({
  paymentTypes: z.object({
    pix: z.boolean(),
    card: z.boolean(),
    bankSlip: z.boolean(),
  }),
  chargeFine: z.boolean(),
  fineValue: z.string().optional(),
  chargeInterest: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (!data.paymentTypes.pix && !data.paymentTypes.card && !data.paymentTypes.bankSlip) {
    console.log("No payment types selected");
    ctx.addIssue({
      path: ["paymentTypes"],
      code: z.ZodIssueCode.custom,
      message: "Selecione pelo menos um meio de pagamento",
    });
  }
  if (data.chargeFine && (!data.fineValue || data.fineValue.trim() === "")) {
    console.log("Fine charge is enabled but fine value is missing");
    ctx.addIssue({
      path: ["fineValue"],
      code: z.ZodIssueCode.custom,
      message: "Informe o valor da multa",
    });
  }
});