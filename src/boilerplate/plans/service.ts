/* BOILERPLATE */
import { apiClient } from "@/lib/api";

/* CHECKOUT */
export const createStripeCheckoutSession = async ( stripePriceId:string ): Promise<{ url: string }> => {
  
  const response = await apiClient('stripe/checkout', { 
    method: "POST", 
    body: JSON.stringify({ stripePriceId }), 
  });

  if(!response.ok) throw new Error();

  return response.json();
}

/* CREATE STRIPE PORTAL */
export const createStripePortalManage = async ( ): Promise<{ url: string }> => {
  
  const response = await apiClient('stripe/portal', { 
    method: "POST", 
  });
  
  if(!response.ok) throw new Error();

  return response.json();
}

/* CANCEL SUBSCRIPTION */
export const cancelStripeSubscription = async ( ): Promise<{ url: string }> => {
  
  const response = await apiClient('/stripe/subscription/cancel', { 
    method: "POST", 
  });

  if(!response.ok) throw new Error();

  return response.json();
}

/* UPDATE SUBSCRIPTION */
export const updateStripeSubscription = async ( stripePriceId:string ): Promise<void> => {
  
  const response = await apiClient('/stripe/subscription/update', { 
    method: "PUT", 
    body: JSON.stringify({ stripePriceId }), 
  });

  if(!response.ok) throw new Error();

  return response.json();
}

/* RENEW SUBSCRIPTION */
export const renewStripeSubscription = async ( ): Promise<void> => {
  
  const response = await apiClient('/stripe/subscription/renew', { 
    method: "POST",
  });

  if(!response.ok) throw new Error();

  return response.json();
}

/* RETRIEVE NEXT SUBSCRIPTION INVOICE */
export const retrieveNextSubscriptionInvoice = async ( stripePriceId: string ): Promise<{ amountDue:string }> => {
  
  const response = await apiClient('/stripe/subscription/retrieve-next-invoice', { 
    method: "POST",
    body: JSON.stringify({ stripePriceId }), 
  });

  if(!response.ok) throw new Error();

  return response.json();
}