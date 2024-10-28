import { createClient } from "@tursodatabase/api"
import { drizzle } from "drizzle-orm/libsql"
import * as schema from "~/db/schema"
import { env } from "~/env"

const client = createClient({
  token: env.TURSO_API_TOKEN,
  org: env.TURSO_ORG,
})

export async function createDatabase(name: string): Promise<void> {
  await client.databases.create(name, {
    schema: env.TURSO_DATABASE_NAME,
    group: "default",
  })
}

export function createDatabaseClient(ref: string) {
  const syncUrl = `libsql://${ref}-${env.TURSO_ORG}.turso.io`
  const url = "file:local-replica.db"

  return drizzle({
    connection: {
      url,
      syncUrl,
      authToken: env.TURSO_GROUP_AUTH_TOKEN,
      syncInterval: 30,
    },
    schema,
    casing: "snake_case",
  })
}
