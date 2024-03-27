"use server"

/* BOILERPLATE */
import prisma from "@/lib/prisma"
import { getNextAuthSession } from "@/lib/auth/session"; 
import { validateApiRequestWithSchema } from "@/lib/zod";

/* FOLDER */
import { updateUsernameSchema } from '@/boilerplate/auth/schemas';

export const updateCustomerNameInDB = async ( name: string ) => {

  const session = await getNextAuthSession();
  const user = session?.user;

  if(!user) return {
    ok: false,
    message: "Not Authorized"
  }

  try {
    await validateApiRequestWithSchema({ schema: updateUsernameSchema, data: { name } } );
  } catch (error) {
    return {
      ok: false,
      message: error as string
    }
  }
  
  try {

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        name,
      }
    })

  } catch (error) {
    return {
      ok: false,
      message: "Something was wrong"
    }
  }

  return {
    ok:true,
    message:"Name update successfully"
  }
}