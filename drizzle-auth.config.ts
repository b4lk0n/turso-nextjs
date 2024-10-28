import { defineConfig } from "drizzle-kit"
import { env } from "~/env"

export default defineConfig({
  dialect: "turso",
  schema: "./src/db/auth-schema.ts",
  dbCredentials: {
    url: env.TURSO_AUTH_DATABASE_URL,
    authToken: env.TURSO_AUTH_DATABASE_AUTH_TOKEN,
  },
  casing: "snake_case",
})
