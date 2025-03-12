import { z } from 'zod'

const envSchema = z.object({
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
