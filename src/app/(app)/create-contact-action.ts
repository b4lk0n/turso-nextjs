"use server"

import { parseWithZod } from "@conform-to/zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { contacts } from "~/db/schema"
import { createDatabaseClient } from "~/lib/turso"
import { getCurrentUser } from "./get-current-user"
import { newContactFormSchema } from "./new-contact-form-schema"

export async function createContactAction(_: unknown, formData: FormData) {
  const sub = parseWithZod(formData, {
    schema: newContactFormSchema,
  })

  if (sub.status !== "success") {
    return sub.reply()
  }

  console.info("getting current user")
  const user = await getCurrentUser()
  console.info("Current user:", user)
  console.info("Creating db")
  const db = createDatabaseClient(user.ref)
  console.info("db client created")

  console.log("inserting new contact ")
  await db.insert(contacts).values({
    fullName: sub.value.name,
    consultantId: user.id,
  })

  console.log("new contact inserted")

  revalidatePath("/")
  redirect("/")
}
