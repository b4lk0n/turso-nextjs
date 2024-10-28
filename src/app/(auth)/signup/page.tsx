import { asc } from "drizzle-orm"
import Link from "next/link"
import { authDb } from "~/db/auth-db"
import { orgs } from "~/db/auth-schema"
import { SignUpForm } from "./sign-up-form"

export default async function SignUp() {
  const orgsList = await authDb.query.orgs.findMany({
    orderBy: [asc(orgs.id)],
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up to get started with our service
          </p>
        </div>

        <SignUpForm orgs={orgsList} />

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
