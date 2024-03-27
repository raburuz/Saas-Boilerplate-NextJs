/* NEXT */
import { NextResponse } from "next/server";

/* BOILERPLATE */
import { authentication } from "@/lib/auth/auth";
import { Stripe } from "@/lib/stripe";
import { SubscriptionPlanKey } from "@/lib/plans";

export async function POST(){

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
    
    try {
      await Stripe.subscription.renew({ customerId: stripeCustomerId });
    } catch (error) {
      console.log("Error when renew Stripe subscription", error);
      return NextResponse.json("Something was wrong", { status: 500 });
    }
  
    return NextResponse.json("Done", { status: 200 });

  } else {

    return NextResponse.json(auth.message, { status: auth.statusCode });

  }
} 