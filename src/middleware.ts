import { type NextRequest, NextResponse } from "next/server"
import { decryptSessionToken } from "./lib/session"

const authPaths = ["/signup", "/signin"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path))
  const session = request.cookies.get("_session")?.value ?? ""
  const payload = await decryptSessionToken(session)

  if (payload) {
    const response = NextResponse.next()

    // refresh session token
    if (request.method === "GET") {
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      response.cookies.set("_session", session, {
        httpOnly: true,
        secure: true,
        expires,
        sameSite: "lax",
        path: "/",
      })
    }

    // do not allow authenticated users to navigate to auth pages
    if (isAuthPath) {
      const nextUrl = request.nextUrl.clone()
      nextUrl.pathname = "/"

      return NextResponse.redirect(nextUrl)
    }

    return NextResponse.next()
  }

  if (!isAuthPath) {
    const nextUrl = request.nextUrl.clone()
    nextUrl.pathname = "/signin"

    return NextResponse.redirect(nextUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
