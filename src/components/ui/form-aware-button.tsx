"use client"

import type { ComponentPropsWithoutRef } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "./button"

type Props = ComponentPropsWithoutRef<typeof Button>

export function FormAwareButton({ disabled, ...props }: Props) {
  const { pending } = useFormStatus()
  return <Button {...props} disabled={disabled || pending} />
}
