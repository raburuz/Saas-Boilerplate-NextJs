/* CONFIG */
import { config } from "@/config";

/* FOLDER */
import { Frequency, IPlan, PaymentPlanKey, SubscriptionPlanKey } from "./model";


export const planConfig: IPlan = { 
  mode : "payment",
  plans:[
    {
      key: "free",
      name: "Free",
      amount: "$0 / forever",
      priceIds: {
        production: "",
        development: "",
        test: "",
      }
    },
    {
      key: "pro",
      name: "Pro",
      amount: "$150 / one-time",
      isPopular: true,
      priceIds: {
        production: "",
        development: "price_1O8Z5tD9qpfeQPHMM0vhfzc1",
        test: "",
      }
    }
  ]
}


/* export const planConfig: IPlan = {
  mode : "subscription",
  plans: [
    {
      key: "free",
      name: "Free",
      description: "For individuals",
      prices: [
        {
          frequency: Frequency.monthly,
          amount: "$0/month",
          priceIds: {
            development: "",
            production: "",
            test: "",
          },
        },
        {
          frequency: Frequency.yearly,
          amount: "0/year",
          priceIds: {
            development: "",
            production: "",
            test: "",
          },
        },
      ]
    },
    {
      key: "pro",
      name: "Pro",
      description:"For medium-sized business",
      isPopular: true,
      features: [
        {
          state:"available",
          text:"Full Access to application",
        },
        {
          state:"unavailable",
          text:"Email Support",
        },
      ],
      prices: [
        {
          frequency:Frequency.monthly,
          amount: "$9/month",
          priceIds: {
            development: "price_1NT3L1D9qpfeQPHMWJr8qNSH",
            production: "",
            test: "",
          },
        },
        {
          frequency:Frequency.yearly,
          amount: "$100/year",
          priceIds: {
            development: "price_1NT3L2D9qpfeQPHMya1HyFSG",
            production: "",
            test: "",
          },
        },
      ]
    },
    {
      key: SubscriptionPlanKey.business,
      name: "Business",
      prices: [
        {
          frequency:Frequency.monthly,
          amount: "$49/month",
          priceIds: {
            development: "price_1NT3PDD9qpfeQPHMN3FJLRwe",
            production: "",
            test: "",
          },
        },
        {
          frequency:Frequency.yearly,
          amount: "$490/year",
          priceIds: {
            development: "price_1NT3PDD9qpfeQPHMbpkqP5b1",
            production: "",
            test: "",
          },
        },
      ]
    },
  ],
  faqs: [
    {
      question:"Can I cancel my subscription at any time",
      answer:`
        Yes, you can cancel your subscription at any time. If you cancel your subscription, 
        you will still be able to use ${config.app.name} until the end of your billing period. 
        After that, you will be downgraded to the free plan.
      `,
    },
    {
      question:"Do you offer refunds?",
      answer:`
        No, we don't offer refunds. However you can cancel your subscription at any time, 
        after which you won't be charged again. 
      `,
    },
  ]
}  */
