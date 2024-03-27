"use server"

/* BOILERPLATE */
import prisma from "@/lib/prisma"
import { getNextAuthSession } from "@/lib/auth/session";

export const completeOnboardingProcessInDB = async () => {

  const session = await getNextAuthSession();
  const user = session?.user;
  
  if(!user) return {
    ok: false,
    message: "Not Authorized" 
  }

  try {
    await prisma.user.update({
      where: { id: user?.id },
      data: {
        isOnboardingComplete: true
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
    message: "🚀 Onboarding complete...",
  }
}