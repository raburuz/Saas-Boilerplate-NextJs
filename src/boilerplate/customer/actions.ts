"use server"

/* BOILERPLATE */
import prisma from "@/lib/prisma"

/* FOLDER */
import { IFeedbackFormData } from "@/boilerplate/customer/schemas"
import { authentication } from "@/lib/auth/auth"

export const sendFeedback = async ( { feedback }: IFeedbackFormData ) => {

  const { user } = await authentication({  allow: { roles: ["customer"] } })

  if(!user) {
    return {
      ok: false,
      message: "You can not send feedback"
    }
  }

  try {
    await prisma.feedback.create({
      data: {
        userId: user.id, 
        feedback,
      }
    })
  } catch (error) {
    return {
      ok: false,
      message: "Something was wrong"
    }
  }

  return {
    ok: true,
    message: "Appreciate your input!",
  }

}