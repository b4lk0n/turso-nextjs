"use server"

import { parseWithZod } from "@conform-to/zod"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { authDb } from "~/db/auth-db"
import { consultants, orgs } from "~/db/auth-schema"
import { createRef } from "~/lib/ref"
import { createDatabase } from "~/lib/turso"
import { signUpFormSchema } from "./sign-up-form-schema"

export async function signUpAction(_: unknown, formData: FormData) {
  const sub = parseWithZod(formData, {
    schema: signUpFormSchema,
  })

  if (sub.status !== "success") {
    return sub.reply()
  }

  const org = await authDb.query.orgs.findFirst({
    where: eq(orgs.ref, sub.value.orgRef),
  })

  if (!org) {
    return sub.reply({
      formErrors: ["Organization does not exist"],
    })
  }

  const [fullName] = sub.value.email.split("@")

  await authDb.transaction(async (tx) => {
    const userRef = createRef()

    await tx.insert(consultants).values({
      orgId: org.id,
      ref: userRef,
      email: sub.value.email,
      fullName,
    })

    await createDatabase(userRef)
  })

  redirect("/signin")
}
