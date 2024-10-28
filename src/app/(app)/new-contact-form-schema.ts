import { z } from "zod"

export const newContactFormSchema = z.object({
  name: z.string().min(3).max(100),
})
