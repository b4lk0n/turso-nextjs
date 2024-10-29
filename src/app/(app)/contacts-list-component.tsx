import { desc } from "drizzle-orm"
import * as schema from "~/db/schema"
import { createDatabaseClient } from "~/lib/turso"
import { DeleteContactForm } from "./delete-contact-form"

type Props = {
  userRef: string
}

export async function ContactsListComponent({ userRef }: Props) {
  const db = createDatabaseClient(userRef)

  const start = performance.now()
  const contacts = await db.query.contacts.findMany({
    orderBy: desc(schema.contacts.id),
  })
  const end = performance.now()

  console.log("Fetch contact took:", end - start, "ms")

  if (!contacts.length) {
    return <div className="text-muted-foreground">No contacts</div>
  }

  return (
    <div className="space-y-4">
      {contacts.map((c) => (
        <section key={c.id} className="flex items-center gap-4">
          <DeleteContactForm contactId={c.id} />

          <h4 className="font-semibold text-secondary-foreground">
            {c.fullName}
          </h4>
        </section>
      ))}
    </div>
  )
}
