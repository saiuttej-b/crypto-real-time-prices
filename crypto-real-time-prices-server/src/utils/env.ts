import { z } from 'zod';

export const Environments = Object.freeze({
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
});

export const EnvSchema = z.object({
  TZ: z.string().optional(),
  PORT: z.coerce.number().positive().default(3100),
  CORS_ORIGIN: z.string().optional(),

  MONGO_DB_HOST: z.string(),
  MONGO_DB_USERNAME: z.string(),
  MONGO_DB_PASSWORD: z.string(),
  MONGO_DB_DATABASE: z.string(),
  MONGO_DB_AUTO_INDEX: z.enum(['true', 'false']).optional().default('true'),

  LIVE_COIN_WATCH_API_KEY: z.string(),
  DISABLE_FETCH_LIVE_COIN_PRICES: z.enum(['true', 'false']).optional().default('false'),
});

export type EnvType = z.infer<typeof EnvSchema>;
