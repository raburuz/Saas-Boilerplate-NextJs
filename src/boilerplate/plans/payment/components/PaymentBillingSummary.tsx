"use client"

/* LIBRARIES */
import { useSession } from "next-auth/react";

/* FOLDER */
import { StripePortal } from "../../components/StripePortal";

/* COMPONENT */
export const PaymentBillingSummary = () => {

  //Hooks
  const { data } = useSession();

  return (
    <>
      <h2 className="text-lg">
        Manage and update your payment details.
      </h2>
      <div className="mt-6 flex flex-row justify-between gap-4 lg:gap-8">

        {
          data?.user?.oneTime?.length === 0 ? (
            <p className="text-xs">
              You&apos;re currently plan-free. Unlock a World of Possibilities now!
            </p>
          ) : null 
        }

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <StripePortal/>
        </div>
        
      </div>
    </>
  )
}
