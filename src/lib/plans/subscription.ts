/* BOILERPLATE */
import { getPlanFromPriceId } from "./utils";
import { planConfig } from "./plans";
import { Frequency, ISubscriptionPlan } from "./model";

export const subscriptionConfig = planConfig.mode === "subscription" ? planConfig : null;

export const getSubscriptionFrequencyFromPriceId = ( priceId : string ) => {

  if( planConfig.mode !== "subscription"  ) return null;
  
  const plan = getPlanFromPriceId(priceId) as ISubscriptionPlan;
  
  return plan?.prices.find((price) => Object.values(price.priceIds).includes(priceId))!.frequency;

}

export const getSubscriptionsPlansByFrequency  = ( frequency: Frequency ) => {

  if( planConfig.mode !== "subscription"  ) return null;

  return subscriptionConfig?.plans.filter( plan => plan.prices.filter(price => price.frequency === frequency ) ) ?? null

}
