/* NEXT */
import { NextResponse } from "next/server";

/* LIBRARIES */
import IStripe from "stripe" 

/* BOILERPLATE */
import prisma from "@/lib/prisma";
import { sendLogToDiscord } from "@/lib/discord";
import { ISubscriptionPlan, getPlanFromPriceId, getSubscriptionFrequencyFromPriceId, planConfig } from "@/lib/plans";

/* FOLDER */
import { oneTimePaymentEvents, stripeSubscriptionEvents } from "./events";

const getUserByStripeCustomerId = async ( customerId: string | null ) => {
  //Users always have their StripeID at this particular stage.
  return await prisma.user.findFirstOrThrow({ where: { stripeCustomerId: customerId } });
}

//SUBSCRIPTION
const subscriptionActions = async ( { event } : { event: IStripe.Event } ) => {

    console.log(`🟢 Event type: ${event.type} | SUBSCRIPTION`);
    const eventObject = event.data.object;
    
    //CREATE SUBSCRIPTION
    if(event.type === "customer.subscription.created"){
      
      const subscription = eventObject as IStripe.Subscription;
      const user = await getUserByStripeCustomerId( subscription.customer as string );
      
      await prisma.subscription.update({
        where: { userId: user.id },
        data: {
          stripeId : subscription.id,
        }
      });
    }
  
    //PROVISION ACCESS & UPDATE SUBSCRIPTION WITH THE NEW DATA
    if(event.type === "customer.subscription.updated"){

      const subscription = eventObject as IStripe.Subscription;
      const user = await getUserByStripeCustomerId( subscription.customer as string );
  
      const priceId = subscription.items.data[0].price.id;
      const plan = getPlanFromPriceId(priceId) as ISubscriptionPlan;
      const frequency = getSubscriptionFrequencyFromPriceId(priceId);
  
      await prisma.subscription.update({
        where: { userId: user.id },
        data: {
          plan: plan.key,
          frequency,
          isRevoke: false,
          currentPeriodStart: subscription.current_period_start,
          currentPeriodEnd: subscription.current_period_end,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        }
      });
    }
  
    //REVOKE ACCESS & DELETE SUBSCRIPTION DATA & DOWNGRADE PLAN TO "free" (CANCELLED)
    if(event.type === "customer.subscription.deleted"){

      const subscription = eventObject as IStripe.Subscription;
      const user = await getUserByStripeCustomerId( subscription.customer as string );
  
      await prisma.subscription.update({
        where: { userId: user.id },
        data: {
          //Push to Free plan when the current subscription is canceled
          plan: "free",
          isRevoke: true,
          //Clean the period when the subscription is canceled
          frequency: null,
          currentPeriodStart: null,
          currentPeriodEnd: null,
          cancelAtPeriodEnd: null,
        }
      });
    }

    //REVOKE ACCESS TEMPORALLY AND WAIT TO customer.subscription.deleted EVENT TO CANCELLED
    if(event.type === "invoice.payment_failed" ){
      // OPTIONAL SEND EMAIL
      
      const invoice = eventObject as IStripe.Invoice;
      const user = await getUserByStripeCustomerId( invoice.customer as string );
      
      await prisma.subscription.update({
        where: { userId: user.id },
        data: {
          isRevoke: true,
        }
      });
    }

    //PROVISIONAL ACCESS
    if(event.type === "invoice.paid" ){

      const invoice = eventObject as IStripe.Invoice;
      const user = await getUserByStripeCustomerId( invoice.customer as string );
      
      await prisma.subscription.update({
        where: { userId: user.id },
        data: {
          isRevoke: false,
        }
      });
    }

    //PROVISIONAL ACCESS
    if(event.type === "checkout.session.completed" ){

      const checkout = eventObject as IStripe.Checkout.Session;
      const user = await getUserByStripeCustomerId( checkout.customer as string );

      await prisma.subscription.update({
        where: { userId: user.id },
        data: {
          isRevoke: false,
        }
      });
    }
}

//ONE-TIME PAYMENTS
const oneTimePaymentActions = async ( { event } : { event: IStripe.Event } ) => {

  console.log(`🟢 Event type: ${event.type} | PAYMENT`);
  const eventObject = event.data.object;

  //SEND RECEIPT TO EMAIL (OPTIONAL)
  if(event.type === "charge.succeeded"){
    // code
    /* 
      const charge = eventObject as IStripe.Charge;
      const receiptUrl = charge.receipt_url;
      console.log(receiptUrl);
    */
  }

  //REVOKE ACCESS IF EXIST AND SEND EMAIL (OPTIONAL)
  if(event.type === "payment_intent.payment_failed"){
    // code 
  }

  //PROVISIONAL ACCESS
  if(event.type === "checkout.session.completed"){

    const checkout = eventObject as IStripe.Checkout.Session;
    const metadata = checkout.metadata as { plan_key:string, price_id: string };
    const user = await getUserByStripeCustomerId( checkout.customer as string );

    await prisma.oneTime.create({
      data: {
        userId: user.id,
        product: metadata.plan_key,
        isPaid: true,
      }
    })

  }
}

export const webhook = async ( { event } : { event: IStripe.Event } ) => {

  const mode = planConfig.mode;

  try {
    
    if(mode === "subscription" && stripeSubscriptionEvents.includes( event.type )) {
      console.log('🔵 Subscription')

      await subscriptionActions({ event });
      return NextResponse.json("🟢 Received.", { status: 200 });
      
    }
    
    if(mode === "payment" && oneTimePaymentEvents.includes( event.type )) {
      console.log('🔵 Payment')
  
      await oneTimePaymentActions({ event });
      return NextResponse.json("🟢 Received.", { status: 200 });
    
    }

    console.log(`🟡 Unhandled event type: ${event.type}.`);
    return NextResponse.json(`🟡 Unhandled event type: ${event.type}.`, { status: 400 });

  } catch (error) {
    console.log("🔴 Webhook error: Webhook handler failed.");
    console.log(error);
    let customerId = ( event.data.object as any).customer ?? null;
    await sendLogToDiscord({
      channel: "stripe",
      event: `webhook ${event.type}`,
      icon: "💰",
      description: `cannot update the data where the customerId is: ${customerId}.`, 
      type: "error",
      tags: {
        event: event.type,
        customerId,
      },
    });
    return NextResponse.json("🔴 Webhook error: Webhook handler failed. View Logs.", { status: 400 });
  }

}