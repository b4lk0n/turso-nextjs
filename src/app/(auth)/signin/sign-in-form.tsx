"use client"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Alert, AlertDescription } from "~/components/ui/alert"
import { FormAwareButton } from "~/components/ui/form-aware-button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { signInAction } from "./sign-in-action"
import { signInFormSchema } from "./sign-in-form-schema"

export function SignInForm() {
  const [lastResult, action] = useActionState(signInAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: signInFormSchema,
      })
    },
  })

  const formError = form.errors?.at(0)
  const emailError = fields.email.errors?.at(0)

  return (
    <Form
      {...getFormProps(form)}
      action={action}
      className="flex flex-col gap-6"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email address</Label>
        <Input
          {...getInputProps(fields.email, { type: "email" })}
          id="email"
          autoComplete="email"
          className="w-full"
          placeholder="you@website.com"
        />

        {emailError && (
          <p className="text-sm font-medium text-destructive">{emailError}</p>
        )}
      </div>

      <FormAwareButton type="submit">Sign in</FormAwareButton>

      {formError && (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
    </Form>
  )
}
