// Drizzle config — schema export only, no live database in demo
// When you add a real DB (Turso, Postgres), update the driver and dbCredentials here.
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // driver: "turso",  // Uncomment when adding a real DB
  // dbCredentials: { url: process.env.DATABASE_URL! },
} satisfies Config;
