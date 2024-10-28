import { isNullish } from "remeda"

type MaybeValue<T> = T | null | undefined
type Nullish = null | undefined

function invariant<T>(value: MaybeValue<T>): asserts value is T
function invariant<T>(value: MaybeValue<T>, err: string): asserts value is T
function invariant<T>(value: MaybeValue<T>, err: Error): asserts value is T
function invariant<T>(
  value: MaybeValue<T>,
  err?: Error | string,
): asserts value is T {
  if (isNullish(value)) {
    if (!err) {
      throw new Error("Invariant failed")
    }

    const error = err instanceof Error ? err : new Error(err)

    throw error
  }
}

export { invariant }

function refute<T>(value: MaybeValue<T>): asserts value is Nullish
function refute<T>(value: MaybeValue<T>, err: string): asserts value is Nullish
function refute<T>(value: MaybeValue<T>, err: Error): asserts value is Nullish
function refute<T>(
  value: MaybeValue<T>,
  err?: Error | string,
): asserts value is Nullish {
  if (!isNullish(value)) {
    if (!err) {
      throw new Error("Refute failed")
    }

    const error = err instanceof Error ? err : new Error(err)

    throw error
  }
}

export { refute }
