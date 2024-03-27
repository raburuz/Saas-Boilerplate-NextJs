/* LIBRARIES */
import { paymentConfig } from "@/lib/plans"

/* FOLDER */
import { PaymentCard } from "./PaymentCard";

/* COMPONENT */
export const PaymentList = () => {
    
  const plans = paymentConfig?.plans;

  return (
    <section>

      <div className="pb-20 sm:px-0 flex flex-wrap flex-col lg:flex-row justify-center items-center lg:items-stretch gap-1.5">
        { 
          plans?.map( plan => 
            <PaymentCard 
              key={plan.key} 
              plan={plan}
            /> 
          ) 
        }
      </div>
      <div className="absolute top-0 right-0 left-0 bottom-0 -z-10 opacity-[0.35] bg-circle-gradient"></div>
      
    </section>
  )
}
