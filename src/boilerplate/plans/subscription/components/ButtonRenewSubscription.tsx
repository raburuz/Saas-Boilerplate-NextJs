"use client"
/* LIBRARIES */
import { Heart } from 'lucide-react';

/* SHADCN */
import { Button } from '@/shadcn/ui/button'
import { usePlanActions } from '../../hooks/usePlanActions';

/* FOLDER */

/* COMPONENT */
export const ButtonRenewSubscription = () => {

  //Custom hooks
  const { renewSubscription, isBlockingActions } = usePlanActions();

  return (
    <Button 
      variant={"default"} 
      className='w-full flex items-center gap-2' 
      onClick={renewSubscription} 
      disabled={isBlockingActions}
    >
      <Heart className='w-4'/>
      <span>Renew Subscription</span>
    </Button>
  )
}
