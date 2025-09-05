import { z } from "zod";

export const channelsSchema = z.object({
  message: z.string().refine(
    (val) => {
      const tempElem = document.createElement("div");
      tempElem.innerHTML = val || "";
      return !!tempElem.textContent?.trim();
    },
    { message: "A mensagem não pode estar vazia" }
  ),
});