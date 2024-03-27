"use server"

/* LIBRARIES */
import prisma from "@/lib/prisma";

/* BOILERPLATE */
import { authentication } from "@/lib/auth/auth";

export const getFeedbackData = async ( ) => {

  const { user } = await authentication({ allow: {roles: ["admin"]} });
  if(!user) return {
    feedbackList: [],
  }

  const feedbackList = await prisma.feedback.findMany();

  return {
    feedbackList,
  }
}