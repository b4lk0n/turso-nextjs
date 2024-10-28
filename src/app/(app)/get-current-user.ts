import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { authDb } from "~/db/auth-db"
import { type Consultant, consultants } from "~/db/auth-schema"
import { decryptSessionToken, destroySession } from "~/lib/session"

export async function getCurrentUser(): Promise<Consultant> {
  const cookieStore = await cookies()
  const session = cookieStore.get("_session")?.value

  if (!session) {
    await destroySession()
    redirect("/signin")
  }

  const payload = await decryptSessionToken(session)

  if (!payload) {
    await destroySession()
    redirect("/signin")
  }

  const user = await authDb.query.consultants.findFirst({
    where: eq(consultants.id, payload.userId),
  })

  if (!user) {
    await destroySession()
    redirect("/signin")
  }

  return user
}
