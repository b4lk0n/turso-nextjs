"use client"

import { TrashIcon } from "@radix-ui/react-icons"
import Form from "next/form"
import { useActionState } from "react"
import { deleteContactAction } from "./delete-contact-action"
import { FormAwareButton } from "~/components/ui/form-aware-button"

type Props = {
  contactId: number
}

export function DeleteContactForm({ contactId }: Props) {
  const [_, action] = useActionState(
    deleteContactAction.bind(null, contactId),
    undefined,
  )

  return (
    <Form action={action}>
      <FormAwareButton type="submit" size="icon" variant="destructive">
        <TrashIcon />
      </FormAwareButton>
    </Form>
  )
}
