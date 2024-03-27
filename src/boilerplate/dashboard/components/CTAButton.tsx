"use client"

/* NEXT */
import Link from 'next/link'

/* LIBRARIES */
import { useSession } from 'next-auth/react'

/* BOILERPLATE */
import { planConfig } from '@/lib/plans'

/* SHADCN */
import { Button } from '@/shadcn/ui/button'

export const CTAButton = () => {

  const session = useSession();
  const user = session?.data?.user;

  if(planConfig.mode === "subscription"){
    if(!user || user.subscription?.plan !== "free" || user.role === "customer") return null
  }

  if( planConfig.mode === "payment"){
    if(!user || user.oneTime?.length !== 0) return null;
  }


  return (
    <>
      <Button asChild>
        <Link href={"/settings/billing"}>Unlock More Now!</Link>
      </Button>
    </>
  )
}
