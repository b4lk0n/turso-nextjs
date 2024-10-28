import { ContactsList } from "./contacts-list"
import { getCurrentUser } from "./get-current-user"
import { Header } from "./header"
import { NewContactForm } from "./new-contact-form"

export default async function ContactsPage() {
  const user = await getCurrentUser()

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Header userName={user.fullName} />

      <NewContactForm />

      <main className="space-y-4">
        <header className="border-b border-muted space-y-1">
          <h2 className="text-sm font-semibold">Contacts list</h2>
        </header>

        <ContactsList userRef={user.ref} />
      </main>
    </div>
  )
}
