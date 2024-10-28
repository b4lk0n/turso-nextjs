import { z } from "zod"

export const signUpFormSchema = z.object({
  orgRef: z.string().min(1),
  email: z.string().email(),
})
