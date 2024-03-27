/* NEXT */
import { NextResponse } from "next/server";

/* BOILERPLATE */
import { authentication } from "@/lib/auth/auth";
import { Stripe } from "@/lib/stripe";

export async function POST(){

  const auth = await authentication({ allow:{roles : [ "customer" ]} });

  if(auth.user){

    let stripeCustomerId = null;
    
    try {
      stripeCustomerId = await Stripe.customer.createOrGetCustomerId();
    } catch (error) {
      console.log(`Stripe cannot create a new customer: ${error}`);
      return NextResponse.json("Something was wrong", { status: 500 }); 
    }
    
    let url: string;

    try {
      
      url = await Stripe.billingPortalUrl( { customerId: stripeCustomerId  } );
  
    } catch (error) {
      console.log(`Stripe checkout error: ${error}`);
      return NextResponse.json("Something was wrong", { status: 500 });
    }
  
    return NextResponse.json({ url }, { status: 200 });

  } else {

    return NextResponse.json(auth.message, { status: auth.statusCode });

  }
} 