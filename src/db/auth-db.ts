import { drizzle } from "drizzle-orm/libsql";
import { env } from "~/env";
import * as schema from "./auth-schema";

export const authDb = drizzle({
  connection: {
    url: env.TURSO_AUTH_DATABASE_URL,
    authToken: env.TURSO_AUTH_DATABASE_AUTH_TOKEN,
  },
  schema,
  casing: "snake_case",
});
