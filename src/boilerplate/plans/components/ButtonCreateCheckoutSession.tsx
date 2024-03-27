"use client"

/* SHADCN */
import { Button } from "@/shadcn/ui/button"

/* FOLDER */
import { usePlanActions } from "../hooks/usePlanActions";
import { planConfig } from "@/lib/plans";

/* COMPONENT */
interface IProps {
  stripePriceId: string
}

export const ButtonCreateCheckoutSession = ( { stripePriceId }: IProps ) => {

  //Custom hooks
  const { isBlockingActions, createCheckoutSession } = usePlanActions();

  const mode = planConfig.mode;

  const renderText = () => {
    return mode === "subscription" ? "Subscribe" : "Buy now!";
  }
  
  return (
    <>
        <Button 
          className="w-full font-bold" 
          onClick={ () => createCheckoutSession(stripePriceId) } 
          disabled={isBlockingActions }
        >
          { renderText() }
        </Button>
    </>
  )
}
