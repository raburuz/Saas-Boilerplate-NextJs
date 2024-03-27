/* FOLDER */
import { planConfig } from "./plans";

export const getPlanFromPriceId = ( priceId : string ) => {

  if ( planConfig.mode === "subscription" ) {
    
    return planConfig.plans.find( (plan) => {
      const matchingPrice = plan.prices.find( price => Object.values(price.priceIds).includes(priceId) );
      return !!matchingPrice;
    });

  } else {
    
    return planConfig.plans.find( plan => Object.values(plan.priceIds).includes(priceId) );
  
  }
  
}
