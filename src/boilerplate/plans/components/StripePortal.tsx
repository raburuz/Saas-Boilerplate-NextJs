"use client"

/* LIBRARIES */
import { CreditCard } from 'lucide-react';

/* SHADCN */
import { Button } from '@/shadcn/ui/button';
import { usePlanActions } from '../hooks/usePlanActions';

/* BOILERPLATE */

/* COMPONENT */
export const StripePortal = () => {

  //Custom hooks
  const { createStripePortal, isBlockingActions } = usePlanActions();

  return (
    <>
      <Button onClick={createStripePortal} variant={"outline"} className="w-full flex items-center gap-2" disabled={isBlockingActions}>
        <CreditCard className="w-4"/>
        <span>Details</span>
      </Button>
    </>
  )
}
