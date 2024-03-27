"use client"

/* LIBRARIES */
import { useSession } from "next-auth/react"
import { BadgeCheck, BadgeMinus, BadgeX } from "lucide-react"

/* SHADCN */
import { Badge } from "@/shadcn/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/ui/card"

/* BOILERPLATE */
import { cn } from "@/lib/utils"
import { IPaymentPlan, PaymentPlanKey } from "@/lib/plans"
import { MagicBorder } from "@/boilerplate/shared/components"

/* FOLDER */
import { ButtonUnauthenticated } from "../../components/ButtonUnauthenticated"
import { ButtonCreateCheckoutSession } from "../../components/ButtonCreateCheckoutSession"
import { Button } from "@/shadcn/ui/button"

/* COMPONENT */
interface IProps {
  plan: IPaymentPlan | null
}

const environment = process.env.NODE_ENV;

/* COMPONENT */
export const PaymentCard = ( { plan } : IProps ) => {

  const { data, status } = useSession();
  const isOneTimePaymentPaid = data?.user?.oneTime?.some((payment)=> payment.product === plan?.key ); 

  if(!plan) return null;

  const renderBadge = () => {

    if ( isOneTimePaymentPaid ) return <Badge variant={"secondary"} className="h-5">Purchased</Badge>;

    if (plan.isPopular) return <Badge className="h-5">Popular</Badge>;
    
    return null;
  }
  
  const renderDescription = () => {

    if(!plan.description) return null;

    return (
      <>
        <CardDescription className="text-foreground">{plan.description}</CardDescription>
      </>
    )
  }

  const renderHeader = () => {

    const amount =  plan.amount.split("/");

    return (
      <>
        <CardHeader className="flex flex-col justify-between gap-2 p-0">
          <div className="flex flex-row items-center gap-2">
            <CardTitle className="w-full text-3xl font-semibold">{plan.name}</CardTitle>
            {renderBadge()}
          </div>
          
          {/* Description */}
          { renderDescription() }

          <div className="flex flex-row gap-0.5">
            <span className="slashed-zero text-2xl font-bold lg:text-3xl xl:text-4xl">{ amount[0] }</span>
            { amount[1] ? (<span className="ml-0.5 self-end text-lg text-muted-foreground "> /{ amount[1] }</span>) : null }
          </div>
        </CardHeader>
      </>
    )
  }

  const renderFeatures = () => {

    if( !plan.features || plan.features.length === 0  ) return null

    return (
      <CardContent className="p-0">
        <ul className="flex flex-col gap-2.5">
          <>  
            {
              plan.features?.map((feature)=>(
                <li key={feature.text}>
                  <div className="flex items-center gap-3">
                    { feature.state === "available" ? (<BadgeCheck className="w-4"/>) : null }
                    { feature.state === "limit" ? (<BadgeMinus className="w-4"/>) : null }
                    { feature.state === "unavailable" ? (<BadgeX className="w-4"/>) : null }
                    <span className="text-sm opacity-80">{feature.text}</span>
                  </div>
                </li>
              ))
            }
          </>
        </ul>
      </CardContent>
    )
  }

  
  const renderButtons = () => {

    if (status === "unauthenticated") return <ButtonUnauthenticated/>

    if (status === "authenticated") {

      if(plan.key === "free") return null

      if(isOneTimePaymentPaid) return <Button className="w-full" disabled>Purchased</Button>
    
      if(!isOneTimePaymentPaid) return <ButtonCreateCheckoutSession stripePriceId={plan.priceIds[environment]} />
      
    }

    return null
  }

  return (
    <>
      <div className={cn("p-1 w-full max-w-[18rem] rounded-xl border border-input dark:border-card bg-transparent shadow-lg", plan.isPopular ? "border-secondary dark:border-secondary" : "")}>
          <MagicBorder>
            <Card className="relative w-full h-full border-input dark:border-0 rounded-lg shadow-xl px-8 py-8 flex flex-col gap-6" >

            {/* Header */}
            { renderHeader() }
            
            {/* Features */}
            { renderFeatures() }

              {/*ACTION BUTTONS */}
              <CardFooter className="p-0">

                { renderButtons() }

              </CardFooter>
            </Card>
          </MagicBorder>
      </div>
    </>
  )
}
