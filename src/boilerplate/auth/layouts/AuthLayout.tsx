"use client"

/* NEXT */
import Link from "next/link";

/* LIBRARIES */
import { ChevronLeft } from "lucide-react";

/* SHADCN */
import { Button } from "@/shadcn/ui/button";

/* COMPONENT */
interface IProps { children: React.ReactNode }

export const AuthLayout = ({ children }: IProps ) => {

  return (
    <>
      <Button variant={"outline"} size={"default"} className="absolute top-8 lg:top-16 left-8 lg:left-16" asChild>
          <Link href={"/"} className="flex items-center gap-2">
          <ChevronLeft className="w-4"/>
          <span>Back</span>
        </Link>
      </Button>
      <main className="p-2 bg-background h-screen">
        <div className="bg-background rounded-3xl lg:border lg:border-secondary h-full flex items-center justify-center lg:shadow-sm lg:shadow-secondary">
          <div className="sm:w-[350px] lg:w-[400px] px-2">
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
