"use client"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { FormAwareButton } from "~/components/ui/form-aware-button"
import { FormAwareInput } from "~/components/ui/form-aware-input"
import { cn } from "~/lib/styles"
import { createContactAction } from "./create-contact-action"
import { newContactFormSchema } from "./new-contact-form-schema"

export function NewContactForm() {
  const [lastResult, action] = useActionState(createContactAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: newContactFormSchema })
    },
  })

  return (
    <Form
      {...getFormProps(form)}
      action={action}
      className="flex flex-col gap-3 border border-border rounded bg-secondary p-3"
    >
      <h5 className="text-sm font-semibold">Add a new contact</h5>

      <div className="flex items-center gap-4">
        <FormAwareInput
          {...getInputProps(fields.name, { type: "text" })}
          id="name"
          autoComplete="name"
          className={cn("bg-white", {
            "border-destructive": !!fields.name.errors?.length,
          })}
          placeholder="John Doe"
        />

        <FormAwareButton type="submit">Create</FormAwareButton>
      </div>
    </Form>
  )
}
