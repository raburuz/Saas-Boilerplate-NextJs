"use client"

/* BOILERPLATE */
import { cn } from "@/lib/utils";

/* COMPONENT */
interface Props {
  children: React.ReactNode,
  className?: string,
}

export const FormField =( { children, className }: Props )=>{
  
  return(
    <>
      <div className={ cn('flex flex-col gap-2', className) }>
        {children}
      </div> 
    </>
  )

}