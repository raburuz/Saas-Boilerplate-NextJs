/* NEXT */
import Link from "next/link"

/* FOLDER */
import { AuthForm } from "@/boilerplate/auth/forms/AuthForm"

/* SHADCN */
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card"
import { Button } from "@/shadcn/ui/button"

/* COMPONENT */
export const LogInPage = () => {
  return (
    <>
      <Card className="w-full flex flex-col rounded-2xl shadow-xl">
        <CardHeader>
          <div className="flex flex-col items-center gap-4 mb-2">
            <h1 className='text-center text-3xl font-semibold leading-[1.475]'>Login</h1>
            <p className="leading-loose text-sm text-muted-foreground">Welcome back! 👋 Login to get started!</p>
          </div>
        </CardHeader>
        <CardContent>
          <AuthForm/>
          <div className="mt-2 flex justify-center">
            <p
                className='mt-3 text-xs'
                >
                  Not register yet?
                  <Button variant={"link"} asChild>
                    <Link href={"/auth/signup"} className="px-1 font-semibold">Create an account</Link>
                  </Button>
              </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
