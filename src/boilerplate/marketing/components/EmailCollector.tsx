/* LIBRARIES */
import { CheckCircle } from "lucide-react"

/* BOILERPLATE */
import { ButtonLead } from "@/boilerplate/shared/components"

/* COMPONENT */
export const EmailCollector = () => {
  return (
    <>
      <section className="py-32 sm:px-2 flex flex-row md:flex-col justify-center items-center gap-4">
        <div className="w-full md:w-auto py-16 px-2 sm:px-4 lg:p-36 bg-muted sm:rounded-2xl">
          <span className="block mb-2 text-primary text-sm font-semibold">Start building today!</span>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 ">
            <div>
              <h2 className="max-w-xl font-semibold text-4xl md:text-5xl md:leading-snug">Start your 7-day free trial</h2>
              <p className="mt-2 max-w-md leading-loose text-muted-foreground">Experience the Stellar difference and unlock the true potential</p>
            </div>

            <div className="pt-4 md:w-[500px] flex flex-col justify-center">
              <div className="bg-background rounded-sm">
                <ButtonLead/>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <CheckCircle className="w-4 text-primary"/>
                <p className="max-w-md leading-loose text-muted-foreground">Experience the Stellar difference and unlock the true potential</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
