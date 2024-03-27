/* LIBRARIES */
import { Stripe as StripeClient } from "stripe"

/* BOILERPLATE */
import prisma from "@/lib/prisma"
import { getNextAuthSession } from "@/lib/auth/session";
import { IPaymentPlan, ISubscriptionPlan, getPlanFromPriceId, planConfig } from "@/lib/plans";

/* CONFIG */
import { config } from "@/config";

/* ENV */
import { env_server } from "@/env/server.mjs";

class StripeProvider {
  static readonly stripe = new StripeClient( env_server.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
    appInfo: {
      name: config.app.name,
      version: config.app.version,
    }
  })  
}

class StripeCustomer extends StripeProvider {

  constructor(){
    super();
  }

  static async createOrGetCustomerId () {

    const session = await getNextAuthSession();
    const user = session?.user;

    if(!user || !user.email) throw new Error("Unauthenticated");

    const stripeCustomerId = user.stripeCustomerId;
  
    if(!stripeCustomerId) {

      const customer = await this.stripe.customers.create({ email: user.email, metadata: { userId: user.id } });
     
      await prisma.user.update({
        where: { id: user.id },
        data:{
          stripeCustomerId: customer.id,
        }
      })

      return customer.id;
  
    } else {
      return stripeCustomerId
    };
  }

}

class StripeSubscription extends StripeProvider {

  constructor(){
    super();
  }

  protected static async getCurrentSubscription ( { customerId }: { customerId: string } ) {
    return await this.stripe.subscriptions
      .list({
        customer: customerId,
      })
      .then((res) => res.data[0]);
  }

  static async cancel ( { customerId }: { customerId: string } ) {

    const subscription = await this.getCurrentSubscription({ customerId });

    await this.stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: true,
      cancellation_details: {
        comment: "Customer deleted their subscription",
      },
    });
  }

  static async renew ( { customerId }: { customerId: string } ) {
    const subscription = await this.getCurrentSubscription({ customerId });

    await this.stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: false,
    });
  }

  static async upgradeOrDowngrade ( { customerId, priceId }: { customerId: string, priceId: string } ) {
    const subscription = await this.getCurrentSubscription({ customerId });
    await this.stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: false,
      proration_behavior: 'always_invoice',
      items: [{
        id: subscription.items.data[0].id,
        price: priceId,
      }]
    });
  }

  static async retrieveUpcomingInvoice ( { customerId, priceId }: { customerId: string, priceId: string } ) {

    const session = await getNextAuthSession();
    const user = session?.user;

    if(!user || !user.email) throw new Error("Unauthenticated");

    const userSubscription = user.subscription;

    if(!userSubscription) throw new Error("Unauthenticated");

    const currentTimestamp = Math.floor( Date.now() / 1000 );
    const validProrationDate = Math.max( userSubscription.currentPeriodStart!, Math.min(currentTimestamp, userSubscription.currentPeriodEnd!) );

    const subscription = await this.getCurrentSubscription({ customerId });

    return await this.stripe.invoices.retrieveUpcoming({
      customer: customerId,
      subscription: subscription.id,
      subscription_proration_behavior:"always_invoice",
      subscription_items: [{
        id: subscription.items.data[0].id,
        price: priceId,
        quantity: 1,
      }],
      subscription_proration_date: validProrationDate,
    });
  }

}


export class Stripe extends StripeProvider {

  static subscription = StripeSubscription; 
  static customer = StripeCustomer; 

  constructor(){
    super();
  }

  static async billingPortalUrl ( { customerId } : { customerId: string } ) {
    const portal = await this.stripe.billingPortal.sessions.create(
      {
        customer: customerId,
        return_url: `${config.url.frontend[env_server.NODE_ENV]}/billing`,
      }
    );
  
    return portal.url
  }

  static async checkout ( { priceId, customerId } : { priceId: string, customerId: string } ) {

    const mode = planConfig.mode;

    const plan = getPlanFromPriceId(priceId) as ISubscriptionPlan | IPaymentPlan;

    return await this.stripe.checkout.sessions.create({
      // Payment Mode
      mode,
      // Product
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // Redirect URL's
      success_url: `${config.url.frontend[env_server.NODE_ENV]}${config.stripe.success_payment_url}`,
      cancel_url: `${config.url.frontend[env_server.NODE_ENV]}${config.stripe.cancel_payment_url}`,
      //Customer
      customer: customerId,
      //Payment Options
      allow_promotion_codes: true,
      payment_method_types:["card", "paypal"],
      billing_address_collection: 'required',
      metadata: {
        plan_key: plan.key,
        price_id: priceId,
      }
    });
  }

  static verifyWebhook ( { body, signature } : { body: string, signature: string } ) {
    const webhookSecretKey = env_server.STRIPE_WEBHOOK_SECRET;
    return this.stripe.webhooks.constructEvent( body, signature, webhookSecretKey );
  }

}
