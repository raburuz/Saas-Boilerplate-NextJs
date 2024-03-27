/* LIBRARIES */
import { UserRole } from "@prisma/client";

/* BOILERPLATE */
import { Frequency, SubscriptionPlanKey } from "@/lib/plans";

/* Here you can extends the user object from next auth */
export interface IUserNextAuthSession{
  id: string,
  email: string,
  image: string,
  name: string,
  role: UserRole, 
  isOnboardingComplete: boolean,
  stripeCustomerId: string | null,
  /* SUBSCRIPTION MODE */
  subscription? : {
    plan: SubscriptionPlanKey | "free",
    frequency?: Frequency,
    currentPeriodStart?: number,
    currentPeriodEnd?: number,
    cancelAtPeriodEnd?: boolean,
  },
  /* PAYMENT MODE */
  oneTime? : { product: string }[],
}