import { type ComponentPropsWithoutRef, Suspense } from "react"
import { ContactsListComponent } from "./contacts-list-component"
import { ContactsListLoading } from "./contacts-list-loading"

type Props = ComponentPropsWithoutRef<typeof ContactsListComponent>

export function ContactsList({ userRef }: Props) {
  return (
    <Suspense fallback={<ContactsListLoading />}>
      <ContactsListComponent userRef={userRef} />
    </Suspense>
  )
}
