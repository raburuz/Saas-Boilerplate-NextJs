"use client"

/* REACT */
import { useState } from "react"

/* LIBRARIES */
import { toast } from "react-hot-toast"
import { useSession } from "next-auth/react"

/* FOLDER */
import { cancelStripeSubscription, updateStripeSubscription, createStripeCheckoutSession, createStripePortalManage, renewStripeSubscription } from "../service"
import { planConfig } from "@/lib/plans"

/* HOOK */
export const usePlanActions = () => {

  //hooks
  const { data, update } = useSession();
  const [ isBlockingActions, setBlockingActions ] = useState(false);
  const userSubscription = data?.user?.subscription;

  const isSubscriptionMode = planConfig.mode === "subscription";

  const updateSession = () => {
    setTimeout(()=> {
        update();
    }, 3000)
  }

  const createStripePortal = () => {
    setBlockingActions(true);
    toast.promise(
      createStripePortalManage(),
      {
        loading: "loading...",
        success: ( { url } ) => {
          window.open(url);
          setBlockingActions(false);
          return "Redirect to portal manage";
        },
        error: () => {
          setBlockingActions(false);
          return "Something was wrong";
        },
      }
    )
  }

  const createCheckoutSession = async( stripePriceId: string | undefined ) => {
    
    if(!stripePriceId) return toast.error("Something was wrong");
    
    if(isSubscriptionMode && userSubscription?.plan !== "free" ) return toast.error("User already has a subscription");

    setBlockingActions(true);
    toast.promise(
      createStripeCheckoutSession(stripePriceId),
        {
          loading: "loading...",
          success: ( { url } ) => {
            if(url) window.open(url);
            setBlockingActions(false);
            return "Redirect to checkout";
          },
          error: () => {
            setBlockingActions(false);
            return "Something was wrong";
          },
        }
      )
    }

  const updateSubscription = ( stripePriceId: string | undefined ) => {

    if(!stripePriceId) return toast.error("Something was wrong");

    if(!isSubscriptionMode || userSubscription?.plan === "free") return;

    setBlockingActions(true);
    toast.promise(
      updateStripeSubscription(stripePriceId),
      {
        loading: "loading...",
        success: () => {
          updateSession();
          return "Your plan was update successfully";
        },
        error: () => {
          setBlockingActions(false);
          return "Something was wrong";
        },
      }
    )
  }

  const cancelSubscription = () => {

    if(!isSubscriptionMode || userSubscription?.plan === "free" || userSubscription?.cancelAtPeriodEnd) return;

    setBlockingActions(true);
    toast.promise(
      cancelStripeSubscription(),
      {
        loading: "loading...",
        success: ( ) => {
          updateSession();
          return "Current plan will be canceled at end of the current period";
        },
        error: () => {
          setBlockingActions(false);
          return "Something was wrong";
        },
      }
    )
  }

  const renewSubscription = () => {

    if(!isSubscriptionMode || userSubscription?.plan === "free" || !userSubscription?.cancelAtPeriodEnd) return;

    setBlockingActions(true);
    toast.promise(
      renewStripeSubscription(),
      {
        loading:"loading...",
        success: () => {
          updateSession();
          return "Subscription renew"
        },
        error: ()=> {
          setBlockingActions(false);
          return "Something was wrong";
        }
      }
    )
  }


 return {
  isBlockingActions, 
  createStripePortal,
  createCheckoutSession,
  updateSubscription,
  cancelSubscription,
  renewSubscription,
 }
}