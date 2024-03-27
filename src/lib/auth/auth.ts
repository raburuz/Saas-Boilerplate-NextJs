/* LIBRARIES */
import { UserRole } from "@prisma/client";

/* BOILERPLATE */
import { PaymentPlanKey, SubscriptionPlanKey, planConfig } from "@/lib/plans";

/* FOLDER */
import { getNextAuthSession } from "./session";
import { IUserNextAuthSession } from "./types";


interface IAuthenticationProps  {
  allow?: {
    roles?: UserRole[],
    subscriptions?: (SubscriptionPlanKey | "free")[], 
    oneTime? : PaymentPlanKey[],
  }, 
  block?: {
    roles?: UserRole[],
    subscriptions?: (SubscriptionPlanKey | "free")[], 
    oneTime? : PaymentPlanKey[],
  }
}


type IAuthenticationResult = {
  user: IUserNextAuthSession,
} | {
  user: null,
  message: string, 
  statusCode: number,
}

export const authentication = async ( { allow = { oneTime: [], subscriptions: [], roles: [], } , block = { oneTime: [], subscriptions: [], roles: [], } } : IAuthenticationProps ): Promise<IAuthenticationResult> => {

  // RETRIEVE THE CURRENT USER SESSION
  const session = await getNextAuthSession();
  const user = session?.user;

  // NOT USER SESSION FOUND
  if(!user || !user.email) return {
    user: null,
    statusCode: 401,
    message: "Unauthorized: Please log in to access this resource.",
  };

  if(allow.roles) {
    // USER DOESN'T HAVE THE REQUIRED ROLE
    if(allow.roles.length !== 0 && !allow.roles.includes(user.role))  return {
      user: null,
      statusCode: 403,
      message: "Access Denied: You do not have the necessary role to access this resource.",
    }
  }

  if(block.roles) {
    // USER HAVE THE BLOCKED ROLE
    if(block.roles.length !== 0 && block.roles.includes(user.role))  return {
      user: null,
      statusCode: 403,
      message: "Access Denied: You do not have the necessary role to access this resource.",
    }
  }
  
  
  // SUBSCRIPTION
  if(planConfig.mode === "subscription") {

    // CANNOT RETRIEVE THE USER SUBSCRIPTION OBJECT FROM DATABASE
    if(!user.subscription) return {
      user: null,
      statusCode: 500,
      message: "Internal Server Error: User does not have a valid subscription assigned.",
    }

    if( allow.subscriptions ) {
      
      // USER DOESN'T HAVE THE REQUIRED SUBSCRIPTION PLAN
      if(allow.subscriptions.length !== 0 && !allow.subscriptions.includes(user.subscription.plan))  return {
        user: null,
        statusCode: 403,
        message: "Access Denied: Your current subscription plan does not allow access to this resource.",
      }

    }

    if( block.subscriptions ) {

      // USER WITH SPECIFIC SUBSCRIPTION PLAN DON'T HAVE ALLOW ACCESS
      if(block.subscriptions.length !== 0 && !block.subscriptions.includes(user.subscription.plan as any))  return {
        user: null,
        statusCode: 403,
        message: "Access Denied: Your current subscription plan does not allow access to this resource.",
      }
    }

  }

   // ONE-TIME PAYMENT
   if(planConfig.mode === "payment") {

    // CANNOT RETRIEVE THE USER PAYMENT OBJECT FROM DATABASE
    if(!user.oneTime) return {
      user: null,
      statusCode: 500,
      message: "Internal Server Error: User does not have a valid payment assigned.",
    }

    
    if( allow.oneTime ){

      const hasOneTimeProductPaid = user.oneTime.some((payment) => allow.oneTime?.includes((payment.product as PaymentPlanKey)) );
      
      // USER DOESN'T HAVE THE REQUIRED ONE-TIME PLAN
      if(allow.oneTime.length !== 0 && !hasOneTimeProductPaid)  {
          return {
          user: null,
          statusCode: 403,
          message: "Access Denied: Your current one-time plan does not allow access to this resource.",
        }
      }

    }

    if( block.oneTime ) {

      const hasOneTimeProductPaid = user.oneTime.some((payment) => block.oneTime?.includes((payment.product as PaymentPlanKey)) );

      if(block.oneTime.length !== 0 && hasOneTimeProductPaid)  {
        return {
          user: null,
          statusCode: 403,
          message: "Access Denied: Your current one-time plan does not allow access to this resource.",
        }
      }

    }

  }

 /* Here you can add custom code as constraints based on plans */
  return {
    user
  };
} 
