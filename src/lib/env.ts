import { z } from "zod";

/**
 * Server-side environment validation.
 * This file must only be imported in server-side code (route handlers, server components).
 * Never import in client components — the API key would be exposed.
 */
const serverEnvSchema = z.object({
  XAI_API_KEY: z.string().min(1, "XAI_API_KEY is required"),
  GROK_MODEL: z.string().min(1, "GROK_MODEL is required"),
  GROK_BASE_URL: z.string().url().default("https://api.x.ai/v1"),
  AI_RATE_LIMIT_PER_10MIN: z.coerce.number().int().positive().default(20),
  DEMO_FORCE_OFFLINE: z
    .string()
    .transform((v) => v === "true")
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    .default(false as any),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

/**
 * Public client-safe environment validation.
 * Only NEXT_PUBLIC_ prefixed variables.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_DEMO_BADGE: z
    .string()
    .transform((v) => v !== "false")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .default(true as any),
});

// Validate server env (only runs on server)
function validateServerEnv() {
  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    console.error(
      "❌ Invalid server environment variables:",
      result.error.flatten().fieldErrors
    );
    // In demo mode, we allow missing AI keys (will use fallback chain)
    if (process.env.NODE_ENV !== "production") {
      return {
        XAI_API_KEY: "",
        GROK_MODEL: "grok-2-vision-1212",
        GROK_BASE_URL: "https://api.x.ai/v1",
        AI_RATE_LIMIT_PER_10MIN: 20,
        DEMO_FORCE_OFFLINE: true,
        NODE_ENV: process.env.NODE_ENV ?? "development",
      } as z.infer<typeof serverEnvSchema>;
    }
    throw new Error("Invalid server environment variables");
  }
  return result.data;
}

export const serverEnv = validateServerEnv();

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_DEMO_BADGE: process.env.NEXT_PUBLIC_DEMO_BADGE,
});
