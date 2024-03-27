"use client"

/* REACT */
import { useState } from "react";

/* BOILERPLATE */
import { getSubscriptionsPlansByFrequency, Frequency, planConfig } from "@/lib/plans";
import { MagicBorder } from "@/boilerplate/shared/components";

/* FOLDER */
import { SubscriptionCard } from "./SubscriptionCard";

/* COMPONENT */
export const SubscriptionsList = () => {

  const [ selectedFrequency, setSelectedFrequency ] = useState<Frequency>(Frequency.monthly);

  if(planConfig.mode !== "subscription") return null;

  const frequencies = Object.values(Frequency);

  const plans = getSubscriptionsPlansByFrequency(selectedFrequency);

  const renderSwitch = () => {
    return (
      <>
        <div className="w-full flex flex-row justify-center">
          <MagicBorder className="rounded-full p-0 pb-[1px]">
            <div className="flex h-9 items-center space-x-1 px-1.5 rounded-full border border-b-0 bg-background p-1 shadow-sm">
              { 
                frequencies.map( frequency => 
                  <button 
                    key={frequency} 
                    data-active={ selectedFrequency === frequency }
                    onClick={()=>setSelectedFrequency(frequency)}
                    className={`min-w-[5rem] rounded-full hover:bg-muted hover:text-primary first-letter:uppercase data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground data-[active=true]:font-semibold`}
                    >
                      {frequency}
                    </button>
                )
              }
            </div>
          </MagicBorder>
        </div>
      </>
    )
  }

  return (
    <>
      <section className="relative flex flex-col gap-10">

        {/* Switch */}
        { renderSwitch() }

        {/* Price list */}
        <div className="pb-20 sm:px-0 flex flex-wrap flex-col lg:flex-row justify-center items-center lg:items-stretch gap-1.5">
          { plans?.map( plan => <SubscriptionCard key={plan.key} plan={plan} frequency={selectedFrequency}/> ) }
        </div>
        {/* Gradient */}
        <div className="absolute top-0 right-0 left-0 bottom-0 -z-10 opacity-[0.35] bg-circle-gradient"></div>
      </section>
    </>
  )
}