"use client"
/* REACT */
import React, { InputHTMLAttributes } from "react"

/* BOILERPLATE */
import { cn } from "@/lib/utils";

/* COMPONENT */
interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Component = ( { className, ...props }: IProps, ref: any ) => {
  return (
    <>
      <input
        ref={ref}
        className = { cn("flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className)} 
        {...props} 
      />
    </>
  )
}

const Input = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>( Component )

Input.displayName = "Input";

export { Input };