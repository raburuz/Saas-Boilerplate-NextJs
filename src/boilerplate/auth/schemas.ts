/* LIBRARIES */
import { z } from "zod";

/* BOILERPLATE */
import { InferSchemaValues } from "@/lib/zod";

/* AUTH SCHEMA */
export const emailSchema = z.object({
  email: 
    z.string( { required_error:"Email is required" } )
    .trim()
    .min(1, "Email is required")
    .email('Must be a valid email'),
})
export type IEmailSchema= InferSchemaValues<typeof emailSchema>

/* UPDATE SCHEMA */
export const updateUsernameSchema = z.object({
  name: 
    z.string( { required_error:"Name is required" } )
    .trim()
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters")
})
export type IUpdateUsernameSchema = InferSchemaValues<typeof updateUsernameSchema>