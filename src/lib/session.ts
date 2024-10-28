import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { env } from "~/env"

const encodedKey = new TextEncoder().encode(env.SESSION_SECRET)

type SessionTokenPayload = {
  userId: number
}

export async function encryptSessionToken({
  userId,
}: SessionTokenPayload): Promise<string> {
  return new SignJWT({ sub: String(userId) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decryptSessionToken(
  token?: string,
): Promise<SessionTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token ?? "", encodedKey, {
      algorithms: ["HS256"],
    })

    const userId = Number.parseInt(payload.sub ?? "", 10)

    if (!userId) {
      throw new Error("No sub claim")
    }

    return {
      userId,
    }
  } catch {
    return null
  }
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encryptSessionToken({ userId })

  const cookiesStore = await cookies()
  cookiesStore.set("_session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("_session")
}
