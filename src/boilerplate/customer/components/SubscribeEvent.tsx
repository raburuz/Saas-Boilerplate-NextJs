"use client"

/* NEXT */
import Link from 'next/link'

/* LIBRARIES */
import { Boxes, Rocket } from 'lucide-react'
import { useSession } from 'next-auth/react'

/* SHADCN */
import { Alert } from '@/shadcn/ui/alert'
import { Button } from '@/shadcn/ui/button'

export const SubscribeEvent = () => {

  const { data } = useSession();
  const hasSubscription = data?.user?.subscription?.plan !== "free";

  if(hasSubscription) return null;

  return (
    <>
      <Alert variant={"info"}>

        <div className="flex flex-row items-center gap-2">
          <Boxes className="w-4"/>
          <h2>Unlock a World of Possibilities with a <b>Subscription</b>!</h2>
        </div>
        <p className="mt-3">
          We&apos;re excited to introduce you to a whole new level of experience with our subscription service! Access to more features is just a click away, and we&apos;re here to make your journey even more exciting and rewarding.
        </p>

        <Button variant={"outline"} className='mt-5 flex flex-row items-center gap-2' asChild>
          <Link href="/settings/billing">
            <Rocket className='w-4'/>
            <span>Upgrade for Enhanced Benefits!</span>
          </Link>
        </Button>

      </Alert>
    </>
  )
}
