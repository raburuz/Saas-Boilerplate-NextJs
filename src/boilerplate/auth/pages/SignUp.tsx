/* NEXT */
import Link from "next/link"

/* FOLDER */
import { AuthForm } from "@/boilerplate/auth/forms/AuthForm"

/* SHADCN */
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card"
import { Button } from "@/shadcn/ui/button"

/* COMPONENT */
export const SignUpPage = () => {
  return (
    <>
      <Card className="w-full flex flex-col rounded-2xl shadow-xl">
        <CardHeader>
          <div className="flex flex-col items-center gap-4 mb-2">
            <h1 className='text-center text-3xl font-semibold leading-[1.475]'>Create an account</h1>
            <p className="leading-loose text-sm text-muted-foreground">Get started for free. No credit card required.</p>
          </div>
        </CardHeader>
        <CardContent>
          <AuthForm/>
          <div className="mt-2 flex justify-center">
            <p
                className='mt-3 text-xs'
                >
                   Already have an account? 
                   <Button variant={"link"} asChild>
                    <Link href={"/auth/login"} className="px-1 font-semibold">Sign in</Link>
                  </Button>
              </p>
          </div>
        </CardContent>
      </Card>
    </>
    
  )
}
