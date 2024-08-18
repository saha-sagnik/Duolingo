import "dotenv/config";
import type { Config } from "drizzle-kit";
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
