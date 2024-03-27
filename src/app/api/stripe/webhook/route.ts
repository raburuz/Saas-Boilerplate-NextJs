/* NEXT */
import { NextResponse } from "next/server";
import { headers } from "next/headers";

/* LIBRARIES */
import IStripe from "stripe"

/* BOILERPLATE */
import { sendLogToDiscord } from "@/lib/discord";
import { Stripe, webhook } from "@/lib/stripe";

/* HANDLER */
export async function POST( req: Request ){

  let event: IStripe.Event;
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  if (!signature) {
    console.log("🔴 Webhook error: Missing Stripe-Signature.");
    await sendLogToDiscord({
      channel: "stripe",
      event: `webhook`,
      icon: "💰",
      description: "Missing Stripe-Signature", 
      type: "error",
    });
    return NextResponse.json("🔴 Webhook error: Missing Stripe-Signature.", { status: 400 });
  } 

  try {
    event = Stripe.verifyWebhook({ body, signature } );
  } catch (error) {
    console.log(`🔴 Webhook signature verification failed ${error}.`);
    await sendLogToDiscord({
      channel: "stripe",
      event: `webhook`,
      icon: "💰",
      description: "Webhook signature verification failed", 
      type: "error",
    });
    return NextResponse.json("🔴 Webhook error: Webhook signature verification failed.", { status: 400 });
  }

  return await webhook({ event  });

}
