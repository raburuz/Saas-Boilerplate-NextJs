"use client"
/* LIBRARIES */
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"

/* COMPONENT */
interface Props {
  children: React.ReactNode,
  session: Session | null | undefined,
}


/* COMPONENT */
export const Providers = ({children, session}:Props) => {
  return (
    <>
    {/* Providers */}
      <SessionProvider session={session} >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </SessionProvider>

      {/* Alerts */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}
