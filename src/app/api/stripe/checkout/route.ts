/* NEXT */
import { NextResponse } from "next/server";

/* LIBRARIES */
import { z } from "zod";

/* BOILERPLATE */
import { authentication } from "@/lib/auth/auth";
import { validateApiRequestWithSchema } from "@/lib/zod";
import { Stripe } from "@/lib/stripe";
import { getPlanFromPriceId } from "@/lib/plans/utils";

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
      },
      block: {
        oneTime: [
          "pro"
        ],
        subscriptions: [ 
          "pro", "business"
        ]
      }
    }
  );

  if(auth.user){
    
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
    
      let url = null;
    
      try {
    
        const session = await Stripe.checkout({ customerId: stripeCustomerId, priceId: body.stripePriceId});
        url = session.url;
        
      } catch (error) {
        console.log(`Stripe checkout error: ${error}`);
        return NextResponse.json("Something was wrong", { status: 500 });
      }
    
      return NextResponse.json({ url }, { status: 200 })

  } else {

    console.log("It appears that the user already has an active subscription assigned. Please note that each user can only have one subscription at a time. If you want update your subscription go to stripe portal")
    return NextResponse.json(auth.message, { status: auth.statusCode });
  
  }
}