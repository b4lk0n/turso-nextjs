"use client"

import type { ComponentPropsWithoutRef } from "react"
import { useFormStatus } from "react-dom"
import { Input } from "./input"

type Props = ComponentPropsWithoutRef<typeof Input>

export function FormAwareInput({ disabled, ...props }: Props) {
  const { pending } = useFormStatus()
  return <Input {...props} disabled={disabled || pending} />
}
