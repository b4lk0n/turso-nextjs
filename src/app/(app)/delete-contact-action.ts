"use server"

import * as schema from "~/db/schema"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createDatabaseClient } from "~/lib/turso"
import { getCurrentUser } from "./get-current-user"

export async function deleteContactAction(
  contactId: number,
  _: unknown,
  formData: FormData,
) {
  const user = await getCurrentUser()
  const db = createDatabaseClient(user.ref)

  await db.delete(schema.contacts).where(eq(schema.contacts.id, contactId))

  revalidatePath("/")
  redirect("/")
}
