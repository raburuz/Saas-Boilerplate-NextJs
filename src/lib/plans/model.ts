
//Plans
/* ---------------------------------------- */

export type IPlan = 
{
  mode: "subscription"
  plans: ISubscriptionPlan[];
  faqs?: {
    question: string;
    answer: string;
  }[];
} 
  | 
{
  mode: "payment"
  plans: IPaymentPlan[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

//Subscription
/* ---------------------------------------- */

//Must be a enum to use the Switch Component
export enum Frequency {
  monthly = "monthly", 
  yearly = "yearly"
};

export type SubscriptionPlanKey = "pro" | "business";

export interface ISubscriptionPlan {
  name: string;
  key: SubscriptionPlanKey | "free";
  isPopular?: boolean;
  prices: {
    frequency: Frequency;
    amount: string;
    priceIds: {
      development: string;
      production: string;
      test : string;
    };
  }[];
  description?: string;
  features?: {
    text: string;
    state: "available" | "limit" | "unavailable";
  }[];
}

//Payment
/* ---------------------------------------- */

export type PaymentPlanKey = "pro"

export interface IPaymentPlan {
  name: string;
  isPopular?: boolean;
  key: PaymentPlanKey | "free";
  amount: string;
  priceIds: {
    development: string;
    production: string;
    test : string;
  };
  description?: string;
  features?: {
    text: string;
    state: "available" | "limit" | "unavailable";
  }[];
}