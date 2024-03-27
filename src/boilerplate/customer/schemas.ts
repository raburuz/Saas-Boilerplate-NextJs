/* LIBRARIES */
import { InferSchemaValues } from "@/lib/zod"
import { z } from "zod"

/* UPDATE SCHEMA */
export const feedbackSchemaValidation = z.object({
  feedback: 
    z.string( { required_error:"Feedback is required" } )
    .trim()
    .min(1, "Feedback is required")
    .min(30, "Feedback should be more than 30 characters")
    .max(255, "Feedback must be less than 255 characters")
})
export type IFeedbackFormData = InferSchemaValues<typeof feedbackSchemaValidation>