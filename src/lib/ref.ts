import { customAlphabet } from "nanoid"

const ALPHABET = "abcdefghijklmnopqrstuvwxyz234567"

export const REF_LEN = 12
export const createRef = customAlphabet(ALPHABET, REF_LEN)
