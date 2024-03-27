"use client"

/* NEXT */
import Link from "next/link"
import { redirect } from "next/navigation"

/* LIBRARIES */
import { useSession } from "next-auth/react" 
import { ChevronLeft } from "lucide-react"
import toast from "react-hot-toast"

/* SHADCN */
import { Button } from "@/shadcn/ui/button"

/* BOILERPLATE */
import { useServer } from "@/boilerplate/shared/hooks"

/* FOLDER */
import { completeOnboardingProcessInDB } from "../actions/completeOnboardingProcessInDB"

/* CONFIG */
import { config } from "@/config"

/* COMPONENT */
export const OnboardingPage = () => {

  //Hooks
  const { isPending, executeAsync } = useServer();
  const { data, update } = useSession();
  const user = data?.user;

  // If Onboarding is Complete redirect to dashboard page;
  if(user?.isOnboardingComplete) redirect("/dashboard");

  // action
  /* When the user finish the onboarding you can check as complete in the database with this server action */
  const action = () => {
   
    executeAsync( completeOnboardingProcessInDB(), {
      success: ( data ) => {
        toast.success(data.message);
        update();
      },
      error: ( error ) => {
        toast.error(error);
      }
    })

  }

  //jsx
  return (
    <>
      <main className="relative w-full">

        {/* Home */}
        <Button variant={"outline"} asChild>
          <Link href={"/"} className="fixed top-2 sm:top-6 left-2 sm:left-6 flex items-center gap-1">
            <ChevronLeft className="w-4"/>
            <span>Back</span>
          </Link>
        </Button>

        <form className="p-2 w-full h-screen max-w-6xl mx-auto flex flex-col justify-center items-center gap-6" action={action}>
          {/* ONBOARDING */}
          <h2 className="max-w-xl text-center font-semibold text-4xl leading-relaxed md:text-5xl md:leading-[1.475]">
            Welcome to{" "}
            <span className="px-4 py-1 bg-gradient-to-b from-primary to-purple-400 text-primary-foreground rounded-full border border-secondary select-none">
              {config.app.name}
            </span>
            </h2>
          <div className="sm:min-w-[22rem] max-w-xs flex flex-col items-center gap-6">
            {/* ADD CUSTOM CODE BELOW */}
            
            <p className="text-center">
              Hello to my application, to continue please click in the button Go to Dashboard
            </p>
            
            {/* Button Complete */}
            <Button 
              size={"lg"}
              type="submit"
              disabled={isPending}>
              Complete Onboarding
            </Button>
          </div>
        </form>
      </main>
    </>
  )
}
