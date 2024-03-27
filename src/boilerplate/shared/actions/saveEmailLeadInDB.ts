"use server"

/* LIBRARIES */
import { z } from 'zod';

/* BOILERPLATE */
import { validateApiRequestWithSchema } from '@/lib/zod';
import prisma from "@/lib/prisma"

/* SCHEMA */
const schema = z.object({
  email: z.string( { required_error: "Email is required" } )
    .trim()
    .min( 1, "Email is required")
    .email('Must be a valid email'),
})

export const saveEmailLeadInDB = async ( email: string ) => {

  try {
    await validateApiRequestWithSchema({ schema, data: { email } } );
  } catch (error) {
    return {
      ok: false,
      message: error as string
    }
  }

  try {
    await prisma.lead.create({ data: { email } })
  } catch (error) {
    return {
      ok: false,
      message: "This is email is already register"
    }
  }
  
  return {
    ok: true,
    message: "Email registered successfully"
  }
}