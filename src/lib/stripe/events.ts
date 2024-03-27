import Stripe from "stripe";

/* STRIPE RELEVANT EVENTS. NOTE: YOU CAN ADD MORE EVENTS HERE */
//REMEMBER CHECK THE EVENTS IN YOUR STRIPE/WEBHOOK/EVENTS TO LISTEN EVENTS IN PRODUCTION

// SUBSCRIPTIONS
export const stripeSubscriptionEvents: Stripe.Event.Type[] = [
  'customer.subscription.created',
  //The subscription was created -> Create Record (Previously created, when the user login first time)
  'customer.subscription.updated',
  //The subscription was downgraded/upgraded -> Provisional Access and Updated Record
  'customer.subscription.deleted',
  //The subscription was canceled -> Revoke access and set to "free"
  'invoice.payment_failed',
  //The user payment failed -> Revoke access and send email to user (optional) to pay/update payment method
  //Sent each billing interval if there is an issue with your customer’s payment method.
  'invoice.paid',
  //The user payment was made -> Provisional access 
  //Sent each billing interval when a payment succeeds.
  'checkout.session.completed',
  //The user paid successfully and the subscription was created -> Provisional Access
  //Sent when a customer clicks the Pay or Subscribe button in Checkout, informing you of a new purchase
]

// ONE-TIME PAYMENTS
export const oneTimePaymentEvents: Stripe.Event.Type[] = [
  //"charge.succeeded",
  //Help to capture the receipt_url 
  //By default billing portal don't show one-time invoices 
  //"payment_intent.succeeded",
  // The payment intend was made succeeded -> Provisional Access and Update Record
  // It will get fired and at the very next second the checkout.session.completed will get fired
  "payment_intent.payment_failed",
  // A payment failed, to notify the customer that their payment has failed. -> Revoke access if exist
  'checkout.session.completed',
  //The user paid successfully and the subscription was created -> Provisional Access
  //The event won't be emitted if a user's payment fails, or if they fail to provide any of the required fields.
]