"use client"

/* REACT */
import { useState } from "react"

/* LIBRARIES */
import { toast } from "react-hot-toast"
import { useSession } from "next-auth/react"

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
import { Skeleton } from "@/shadcn/ui/skeleton"
import { Button } from "@/shadcn/ui/button"
import { Badge } from "@/shadcn/ui/badge"

/* FOLDER */
import { usePlanActions } from "../../hooks/usePlanActions"
import { retrieveNextSubscriptionInvoice } from "../../service"

/* COMPONENT */
interface IProps {
  amount: string,
  planName: string,
  stripePriceId: string,
  isUserSubscribedToPlan: boolean
}

export const ButtonUpdateSubscription = ( props : IProps ) => {

  const { isUserSubscribedToPlan, planName, stripePriceId, amount } = props;

  //Hooks
  const { data } = useSession();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ amountDueToday, setAmountDueToday ] = useState('');

  //Custom Hooks
  const { updateSubscription , isBlockingActions } = usePlanActions();

  const user = data?.user;

  const retrieveInvoice = async () => {

    setIsLoading(true);

    try {

      const { amountDue }  = await retrieveNextSubscriptionInvoice(stripePriceId);
      setAmountDueToday(amountDue);
      setIsLoading(false);

    } catch (error) {
      toast.error("Can not retrieve the next invoice");
    }
  }

  const renderAlertDialogTrigger = () => {
    return (
      <AlertDialogTrigger asChild>
          <Button 
            className="w-full font-bold" 
            onClick={ retrieveInvoice }
            disabled={ isBlockingActions || isUserSubscribedToPlan }>
            { isUserSubscribedToPlan ? "Subscribed": "Change Subscription" }
          </Button>
        </AlertDialogTrigger>
    )
  }

  const renderAlertDialogFooter = () => {
    return (
      <AlertDialogFooter>
        {/* cancel */}
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        {/* confirm */}
        <AlertDialogAction 
          onClick={ () => updateSubscription(stripePriceId) } 
          disabled={ isLoading || isBlockingActions }
        >Confirm</AlertDialogAction>
      </AlertDialogFooter>
    )
  }

  const renderAlertDialogContent = () => {

    return (
      <AlertDialogContent>

        {/* Header */}
        <AlertDialogHeader>
          <AlertDialogTitle>Update to {planName} Subscription, confirmation needed</AlertDialogTitle>
        </AlertDialogHeader>
        
        {/* Description */}
        <AlertDialogDescription asChild>
          <div className="flex flex-col gap-1">
            <p>
              Your current plan will be update to <strong>{ planName }</strong>
            </p>
            {
                user?.subscription?.cancelAtPeriodEnd ? (
                  <span className="text-xs">Note: Your plan will be reactivate</span>
                ) : null
            }
            { 
              isLoading ? (
                <>
                  <div className="mt-2 flex flex-col gap-4">
                    <Skeleton className="w-2/12 h-[12px]"/>
                    <Skeleton className="w-8/12 h-[12px]"/>
                    <Skeleton className="w-5/12 h-[12px]"/>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-2 flex flex-col gap-2">
                    <h3 className="font-bold text-sm">Amount: </h3>
                    <div className="flex flex-row flex-wrap items-center gap-2">
                      <span className="text-xs">Next invoice:</span>
                      <Badge variant={"outline"}>{ amount }</Badge>
                    </div>
                    <div className="flex flex-row flex-wrap items-center gap-2">
                      <span className="text-xs">Due today:</span>
                      <Badge variant={"outline"}>{ amountDueToday }</Badge>
                    </div>
                  </div>
                </>
              )
            }
          </div>
        </AlertDialogDescription>

        {/* Footer */}
        { renderAlertDialogFooter() }
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

