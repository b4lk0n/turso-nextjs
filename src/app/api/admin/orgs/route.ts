import { z } from "zod"
import { authDb } from "~/db/auth-db"
import { orgs } from "~/db/auth-schema"
import { invariant } from "~/lib/invariant"
import { createRef } from "~/lib/ref"

const requestScheme = z.object({
  name: z.string().min(3).max(50),
})

export async function POST(request: Request) {
  const data = await request.json()
  const validation = requestScheme.safeParse(data)

  if (!validation.success) {
    console.log(validation.error)
    return Response.json(validation.error.flatten().fieldErrors, {
      status: 400,
    })
  }

  const { name } = validation.data
  const ref = createRef()

  const [org] = await authDb
    .insert(orgs)
    .values({
      name,
      ref,
    })
    .returning()

  invariant(org, "Database hasn't returned an inserted org")

  return Response.json(org, { status: 201 })
}
