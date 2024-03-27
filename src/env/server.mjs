/* LIBRARIES */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env_server = createEnv({
  server: {
    /* ENVIRONMENT */
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    /* DATABASE */
    DATABASE_URL: z.string().min(1),
    /* AUTH */
    NEXTAUTH_URL: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    /*RESEND EMAIL */
    RESEND_API_KEY: z.string().min(1),
    /* GOOGLE */
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    /* STRIPE */
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_PUBLIC_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    /* DISCORD */
    DISCORD_WEBHOOK_URL: z.string().min(1),
  },
  runtimeEnv:{
    /* ENVIRONMENT */
    NODE_ENV: process.env.NODE_ENV,
    /* DATABASE */
    DATABASE_URL: process.env.DATABASE_URL,
    /* AUTH */
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    /*RESEND EMAIL */
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    /* GOOGLE */
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    /* STRIPE */
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    /* DISCORD */
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
  },
});