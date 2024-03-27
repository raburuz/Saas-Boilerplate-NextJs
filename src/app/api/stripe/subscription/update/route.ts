/* NEXT */
import { NextResponse } from "next/server";

/* LIBRARIES */
import { z } from "zod";

/* BOILERPLATE */
import { authentication } from "@/lib/auth/auth";
import { validateApiRequestWithSchema } from "@/lib/zod";
import { Stripe } from "@/lib/stripe";
import { getPlanFromPriceId } from "@/lib/plans";
import { SubscriptionPlanKey } from "@/lib/plans/model";

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

export async function PUT( request: Request ) {

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

    let stripeCustomerId = null;
    
    try {
      stripeCustomerId = await Stripe.customer.createOrGetCustomerId();
    } catch (error) {
      console.log(`Stripe cannot create a new customer: ${error}`);
      return NextResponse.json("Something was wrong", { status: 500 }); 
    }
    
    let body = null;

    try {
      const response = await validateApiRequestWithSchema({ schema, data:{ body: await request.json() } });
      body = response.body;
    } catch (error) {
      return NextResponse.json(error, { status: 400 } );
    }
  
    try {
      await Stripe.subscription.upgradeOrDowngrade({ customerId: stripeCustomerId, priceId: body.stripePriceId });
    } catch (err) {
      console.log("Error updating plan", err);
      return NextResponse.json("Something was wrong", { status: 500 });
    }
  
    return NextResponse.json("Done", { status: 200 });

  } else {

    return NextResponse.json(auth.message, { status: auth.statusCode });

  }
}