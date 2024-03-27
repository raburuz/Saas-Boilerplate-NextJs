"use client"

/* REACT */
import { useState } from 'react'

/* NEXT */
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';

/* LIBRARIES */
import { signIn, signOut, useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

/* CONFIG */
import { config } from '@/config'

/* HOOK */
export const useAuth = () => {

  //hooks
  const { status } = useSession();
  const [ isBlockActions, setIsBlockActions ] = useState(false);
  const router = useRouter();
  const path = usePathname();

  //Login Email 
  const loginWithMagicLink = ( email: string ) => {
    if( status !== "unauthenticated" ) return;

    setIsBlockActions(true);
    toast.promise(
      signIn("email", { email, redirect: false, callbackUrl: config.next_auth.auth_callback_url }),
      {
        loading: "Loading...",
        success: () => {
          //Show alert
          router.push(`${path}?action=magic_link_send`)
          return "Email sent - check your inbox!"
        },
        error: () => {
          setIsBlockActions(false);
          return "Error sending email - Please try again";
        }
      }
    )
  }

  //login Google
  const loginWithGoogle = () => {
    if( status !== "unauthenticated" ) return;
    signIn("google", { redirect: true, callbackUrl: config.next_auth.auth_callback_url });
  }

  const logout = () => {
    if( status !== "authenticated" ) return;
    signOut({ callbackUrl: config.next_auth.logout_callback_url });
  }


  return {
    isBlockActions,
    loginWithMagicLink,
    loginWithGoogle,
    logout,
  }

}
