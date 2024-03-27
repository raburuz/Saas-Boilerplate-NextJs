
/* BOILERPLATE */
import { planConfig } from "@/lib/plans"
import { FAQ } from "@/boilerplate/shared/components"
import { PaymentList, SubscriptionsList } from "@/boilerplate/plans"

/* CONFIG */
import { config } from "@/config"

/* FOLDER */
import { Testimonial } from "../components/Testimonial"
import { EmailCollector } from "../components/EmailCollector"

/* PRICING */
export const PricingPage = () => {

  const renderPlanList = () => {

    const mode = planConfig.mode;

    if( mode === "subscription" ) {
      return (
        <SubscriptionsList/>
      )
    } else {
      return (
        <PaymentList/>
      )
    }
  }

  const renderFAQs = () => {

    const faqs = planConfig.faqs;

    if(!faqs) return null;

    return (
      <section className="py-32 px-2 max-w-6xl mx-auto flex flex-col justify-center items-center gap-4">
            <span className="text-primary text-sm font-semibold">{config.app.name} FAQ&apos;s</span>
            <h2 className="max-w-2xl text-center font-semibold text-4xl leading-relaxed md:text-5xl md:leading-[1.475]">
              Frequently Asked Questions 
            </h2>
            <div className="mt-5 w-full max-w-xl mx-auto">
              <FAQ faqs={faqs}/>
            </div>
      </section>
    )

  }

  return (
    <>

      <section className="py-32 px-2 max-w-6xl mx-auto flex flex-col justify-center items-center gap-4">
        <span className="text-primary text-sm font-semibold">Our Pricing</span>
        <h1 className="max-w-2xl text-center font-semibold text-4xl leading-relaxed md:text-6xl md:leading-[1.475]">
          Pricing built to suit all
          types of{" "}
          <span className="px-4 py-1 bg-gradient-to-b from-primary to-purple-400 text-primary-foreground rounded-full border border-secondary select-none">business</span> 
        </h1>
        <p className="text-center max-w-md font-medium">Embrace the future of technology with Stellar. Our innovative SaaS template empowers businesses.</p>
      </section>
    
      { renderPlanList() }


      <Testimonial/>
      
      { renderFAQs() }

      <EmailCollector/>

    </>
  )
}
