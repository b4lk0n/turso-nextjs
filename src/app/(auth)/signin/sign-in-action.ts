"use server"

import { parseWithZod } from "@conform-to/zod"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { authDb } from "~/db/auth-db"
import { consultants } from "~/db/auth-schema"
import { createSession } from "~/lib/session"
import { signInFormSchema } from "./sign-in-form-schema"

export async function signInAction(_: unknown, formData: FormData) {
  const sub = parseWithZod(formData, {
    schema: signInFormSchema,
  })

  if (sub.status !== "success") {
    return sub.reply()
  }

  const user = await authDb.query.consultants.findFirst({
    where: eq(consultants.email, sub.value.email),
  })

  if (!user) {
    return sub.reply({
      formErrors: ["Invalid credentials"],
    })
  }

  await createSession(user.id)

  revalidatePath("/")
  redirect("/")
}
