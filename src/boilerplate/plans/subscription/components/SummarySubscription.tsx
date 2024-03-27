"use client"

/* LIBRARIES */
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";

/* BOILERPLATE */
import { formatDateFromTimestamp } from "@/lib/date";
import { planConfig } from "@/lib/plans";

/* SHADCN */
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn/ui/tooltip";
import { Badge } from "@/shadcn/ui/badge";

/* COMPONENT */
export const SummarySubscription = () => {

  //Hooks
  const { data } = useSession();
  const subscription = data?.user?.subscription;
  const mode = planConfig.mode;

  if(mode !== "subscription") return null; 

  //Dates
  const subscriptionStartDate = formatDateFromTimestamp(subscription?.currentPeriodStart ?? 0);
  const subscriptionEndDate = formatDateFromTimestamp(subscription?.currentPeriodEnd ?? 0);
  
  return (
    <>
      <div className='flex flex-col gap-1'>
        <div className="flex flex-row gap-2">
          <span className="text-[11px] font-normal">Plan</span>
          <Badge variant={"secondary"} className="py-0 px-1 text-[10px] font-semibold">
            {subscription?.plan}
          </Badge>
        </div>
        <div className='flex flex-row items-center justify-between gap-2'>

          {
            subscription?.plan !== "free" ? (
              <>
                {/* Start date */}
                <div className='flex flex-row items-center gap-2'>
                  <div className='flex flex-row gap-1 text-[10px]'>
                    <span>{subscriptionStartDate.month}.</span>
                    <span>{subscriptionStartDate.day}</span>
                    <span>{subscriptionStartDate.year}</span>
                  </div>
                  <ArrowRight className='w-4 text-foreground/70'/>

                  {/* End date */}
                  <TooltipProvider>
                    <Tooltip>
                      {
                        subscription?.cancelAtPeriodEnd ? (
                          <>
                          {/* Cancel at period end */}
                            <TooltipTrigger>
                              <div className='flex flex-row gap-1 text-[10px]'>
                                <span className="text-destructive">{subscriptionEndDate.month}.</span>
                                <span className="text-destructive">{subscriptionEndDate.day},</span>
                                <span className="text-destructive">{subscriptionEndDate.year}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              Subscription will be finish on
                            </TooltipContent>
                          </>
                        ) : (
                          <>
                          {/*NOT Cancel at period end */}
                            <TooltipTrigger>
                              <div className='flex flex-row gap-1 text-[10px]'>
                                <span className="text-green-500">{subscriptionEndDate.month}.</span>
                                <span className="text-green-500">{subscriptionEndDate.day},</span>
                                <span className="text-green-500">{subscriptionEndDate.year}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              Next payment will be on
                            </TooltipContent>
                          </>
                        )
                      }
                    </Tooltip>
                  </TooltipProvider>

                </div>
              </>
            ) : null
          }
        </div>
        <div data-status={subscription?.plan === "free"} className='w-full h-0.5 bg-green-500 data-[status=true]:bg-blue-500'></div>
      </div>

    </>
  )
}
