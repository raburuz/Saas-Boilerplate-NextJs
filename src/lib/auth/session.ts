"use server"
/* NEXT */
import { getServerSession } from "next-auth/next";

/* FOLDER */
import { nextAuthOptions } from "./nextAuthOptions";


export const getNextAuthSession = async () => {
  return await getServerSession(nextAuthOptions);
}