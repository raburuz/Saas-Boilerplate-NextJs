"use client"

/* LIBRARIES */
import { useSession } from "next-auth/react";

/* BOILERPLATE */
import { formatDateFromTimestamp } from "@/lib/date";
import { subscriptionConfig } from "@/lib/plans";

/* SHADCN */
import { Badge } from "@/shadcn/ui/badge";

/* FOLDER */
import { StripePortal } from "../../components/StripePortal";
import { ButtonRenewSubscription } from "./ButtonRenewSubscription";
import { ButtonCancelSubscription } from "./ButtonCancelSubscription";

/* COMPONENT */
export const SubscriptionBillingSummary = () => {

  //Hooks
  const { data } = useSession();
    
  const subscription = data?.user?.subscription;
  const subscriptionEndDate = formatDateFromTimestamp(subscription?.currentPeriodEnd ?? 0);

  const plan = subscriptionConfig?.plans.map( plan => {
                           const price =  plan.prices.find((price)=> price.frequency === subscription?.frequency )
                           return {
                             name: plan.name,
                             key: plan.key,
                             price
                           }
                       }).find((plan)=> plan.key === subscription?.plan);

  const renderActionButtons = () => {

    if (subscription?.plan !== "free") {

      if (subscription?.cancelAtPeriodEnd) {
        return <ButtonRenewSubscription/>
      }
      else {
        return <ButtonCancelSubscription/>
      }
      
    }; 

    return null;
  }

  return (
    <>
      <h2 className="text-lg">
        Manage your subscription and update your payment details.
      </h2>
      <div className="mt-6 flex flex-row justify-between gap-4 lg:gap-8">
        {/* Subscription Card */}
        <div className="flex flex-col gap-2">
          <h3>Your active subscription</h3>

          {
            subscription?.plan === "free" ? (
              <>
              {/* WITHOUT SUBSCRIPTION */}

                <p className="text-xs">
                  You&apos;re currently plan-free. Unlock a World of Possibilities now!
                </p>
              
              </>
            ) : (
            <>
            {/* WITH SUBSCRIPTION */}
            
              <div className="flex flex-row flex-wrap items-center gap-1 text-sm">
                <Badge variant={"outline"}>{ plan?.name }</Badge> 
                <Badge variant={"outline"}>( { plan?.price?.amount } )</Badge> 
                <Badge variant={"outline"}>Active</Badge>
              </div>

              {
                subscription?.cancelAtPeriodEnd ? (
                  <>
                  {/* Subscription will be cancel at period end */}
                    <p className="flex flew-row lg:items-center gap-1 text-xs">
                      <span>Your current plan will finish on </span> 
                      <span className="font-black text-destructive whitespace-nowrap">
                        {subscriptionEndDate.month}.  
                        {" "}
                        {subscriptionEndDate.day},
                        {" "}
                        {subscriptionEndDate.year}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                  {/* Subscription will not be cancel at period end */}
                    <p className="flex flew-row lg:items-center gap-1 text-xs">
                      <span>Your next payment will be on </span>
                      <span className="font-semibold text-green-500 whitespace-nowrap">
                        {subscriptionEndDate.month}.  
                        {" "}
                        {subscriptionEndDate.day},
                        {" "}
                        {subscriptionEndDate.year}
                      </span>
                    </p>
                  </>
                )
              }
            </>
          )
        }
      </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <StripePortal/>
          {/* Has Subscription */}
          { renderActionButtons() }
        </div>

      </div>
    </>
  )
}
