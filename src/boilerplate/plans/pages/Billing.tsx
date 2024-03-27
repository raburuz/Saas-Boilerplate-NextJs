/* BOILERPLATE */
import { planConfig } from "@/lib/plans";

/* FOLDER */
import { SubscriptionsList } from "../subscription/components/SubscriptionList";
import { SubscriptionBillingSummary } from "../subscription/components/SubscriptionBillingSummary";
import { PaymentList } from "../payment/components/PaymentList";
import { PaymentBillingSummary } from "../payment/components/PaymentBillingSummary";

const mode = planConfig.mode;

/* COMPONENT */
export const Billing = () => {

  const renderPricingList = () => {
    return mode === "subscription" ? (<SubscriptionsList/>) : (<PaymentList/>)
  } 

  const renderBillingSummary = () => {
    return mode === "subscription" ? (<SubscriptionBillingSummary/>) : (<PaymentBillingSummary/>)
  }


  return (
    <>
      { renderBillingSummary ()}
      
      {/* Plans list */}
      <div className="my-10 flex flex-col gap-10">
        <h3 className="text-lg">Available Plans</h3>

        { renderPricingList() }
      </div>
    </>
  )
}