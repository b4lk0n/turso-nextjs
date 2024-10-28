import { z } from "zod"

const schema = z.object({
  ADMIN_API_KEY: z.string(),
  SESSION_SECRET: z.string(),

  TURSO_AUTH_DATABASE_URL: z.string().url(),
  TURSO_AUTH_DATABASE_AUTH_TOKEN: z.string(),

  TURSO_MAIN_DATABASE_URL: z.string().url(),

  TURSO_ORG: z.string(),
  TURSO_DATABASE_NAME: z.string(),
  TURSO_GROUP_AUTH_TOKEN: z.string(),
  TURSO_API_TOKEN: z.string(),
})

export const env = schema.parse(process.env)
