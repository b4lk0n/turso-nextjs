import { defineConfig } from "drizzle-kit"
import { env } from "~/env"

export default defineConfig({
  dialect: "turso",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: env.TURSO_MAIN_DATABASE_URL,
    authToken: env.TURSO_GROUP_AUTH_TOKEN,
  },
  casing: "snake_case",
})
