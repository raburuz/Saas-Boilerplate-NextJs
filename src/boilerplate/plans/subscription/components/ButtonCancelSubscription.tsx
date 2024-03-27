/* SHADCN */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog"
import { Button } from '@/shadcn/ui/button'

/* FOLDER */
import { usePlanActions } from "../../hooks/usePlanActions";

/* COMPONENT */
export const ButtonCancelSubscription = () => {

  //Custom hooks
  const { cancelSubscription, isBlockingActions } = usePlanActions();

  const renderAlertDialogTrigger = () => {
    return (
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className='w-full' disabled={isBlockingActions}>
          Cancel Subscription
        </Button>
      </AlertDialogTrigger>
    )
  }

  const renderAlertDialogContent = () => {
    return (
      <AlertDialogContent>
        {/* Header */}
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel current subscription, confirmation needed</AlertDialogTitle>
        </AlertDialogHeader>
        {/* Content */}
        <AlertDialogDescription asChild>
          <div>
            <p>
              Starting from the end of the current period, your plan will be upgraded to our free version. 
              This means that you will continue to enjoy our free services, allowing you to access all the 
              essential features we offer.
            </p>
          </div>
        </AlertDialogDescription>
        {/* ACTIONS */}
        <AlertDialogFooter>
          {/* Cancel */}
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* Confirm */}
          <AlertDialogAction onClick={()=>cancelSubscription()} disabled={isBlockingActions} className='disabled:pointer-events-auto disabled:cursor-wait'>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    )
  }

  return (
    <>
      <AlertDialog>
        {/* TRIGGER */}
        { renderAlertDialogTrigger() }
        {/* CONTENT */}
        { renderAlertDialogContent() }
      </AlertDialog>
    </>
  )
}
