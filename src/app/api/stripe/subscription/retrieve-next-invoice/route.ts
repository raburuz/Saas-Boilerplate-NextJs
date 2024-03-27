/* NEXT */
import { NextResponse } from "next/server";

/* LIBRARIES */
import { z } from "zod";

/* BOILERPLATE */
import { authentication } from "@/lib/auth/auth";
import { validateApiRequestWithSchema } from "@/lib/zod";
import { Stripe } from "@/lib/stripe";
import { getPlanFromPriceId } from "@/lib/plans/utils";
import { SubscriptionPlanKey } from "@/lib/plans/model";

/* SCHEMA */
const schema = z.object({
  body: z.object({
    stripePriceId: 
      z.string({ required_error: "Price Id is required" })
      .trim()
      .min(1, "Price Id is required")
      .refine( async value => {
        const exist = getPlanFromPriceId(value)
        return !!exist
      }, "Subscription plan not found"),
  })
})

export async function POST( request: Request ){

  const auth = await authentication({ 
    allow: {
        roles : [ "customer" ], 
        subscriptions: [
          "pro", "business"
        ] 
      }
    }
  );

  if(auth.user) {

    let body = null;

    try {
      const response = await validateApiRequestWithSchema({ schema, data: { body: await request.json() }});
      body = response.body;
    } catch (error) {
      return NextResponse.json(error, { status: 400 });
    }
  
    let stripeCustomerId = null;
    
    try {
      stripeCustomerId = await Stripe.customer.createOrGetCustomerId();
    } catch (error) {
      console.log(`Stripe cannot create a new customer: ${error}`);
      return NextResponse.json("Something was wrong", { status: 500 }); 
    }
    
    let invoice = null;

    try {
      
      invoice = await Stripe.subscription.retrieveUpcomingInvoice({ customerId: stripeCustomerId, priceId: body.stripePriceId});
    
    } catch (error) {
      console.log("Error when renew Stripe subscription", error);
      return NextResponse.json("Something was wrong", { status: 500 });
    }
  
    return NextResponse.json({
      amountDue: `${invoice.amount_due / 100} ${invoice.currency}`,
      /* endingBalance: invoice.ending_balance ? invoice.ending_balance / 100 : 0, */
    }, { status: 200 });

  } else {

    return NextResponse.json(auth.message, { status: auth.statusCode });

  }


} 