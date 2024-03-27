/* LIBRARIES */
import NextAuth from "next-auth";

/* BOILERPLATE */
import { nextAuthOptions } from "@/lib/auth/nextAuthOptions";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST};