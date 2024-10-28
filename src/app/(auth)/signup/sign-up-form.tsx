"use client"

import {
  getFormProps,
  getInputProps,
  useForm,
  useInputControl,
} from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import Form from "next/form"
import { useActionState } from "react"
import { Alert, AlertDescription } from "~/components/ui/alert"
import { FormAwareButton } from "~/components/ui/form-aware-button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { signUpAction } from "./sign-up-action"
import { signUpFormSchema } from "./sign-up-form-schema"

type Props = {
  orgs: Array<{ ref: string; name: string }>
}
export function SignUpForm({ orgs }: Props) {
  const [lastResult, action] = useActionState(signUpAction, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpFormSchema })
    },
  })
  const selectControl = useInputControl(fields.orgRef)

  const formError = form.errors?.at(0)
  const orgError = fields.orgRef.errors?.at(0)
  const emailError = fields.email.errors?.at(0)

  return (
    <Form
      {...getFormProps(form)}
      action={action}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <Label htmlFor="organization">Organization</Label>

          <Select
            name={fields.orgRef.name}
            value={selectControl.value}
            onValueChange={(value) => {
              selectControl.change(value)
            }}
            onOpenChange={(open) => {
              if (!open) selectControl.blur()
            }}
          >
            <SelectTrigger id="organization">
              <SelectValue placeholder="Select an organization" />
            </SelectTrigger>
            <SelectContent>
              {orgs.map((org) => (
                <SelectItem value={org.ref} key={org.ref}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {orgError && (
            <p className="text-sm font-medium text-destructive">{orgError}</p>
          )}
        </div>

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
      </div>

      <FormAwareButton type="submit">Sign up</FormAwareButton>

      {formError && (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
    </Form>
  )
}
