"use client"
/* REACT */
import { LabelHTMLAttributes } from "react"

/* BOILERPLATE */
import { cn } from "@/lib/utils";

/* COMPONENT */
interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const FormLabel = ({children, className, ...props}: IProps) => {
  return (
    <label className={cn("text-xs", className)} {...props}>
      { children }
    </label>
  )
}


