"use client"
/* REACT */
import React, { InputHTMLAttributes } from "react"
/* BOILERPLATE */
import { cn } from "@/lib/utils";

/* COMPONENT SELECT */
interface ISelectProps extends InputHTMLAttributes<HTMLSelectElement> {}

const SelectComponent = ( { className, children, ...props }: ISelectProps, ref: any) => {

  return (
    <>
      <select 
        ref={ref}
        className={cn("flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)} 
        {...props} 
      >
        <option className="text-muted-foreground" hidden value="">{props.placeholder}</option>
        {children}
      </select>
    </>
  )
}

const Select = React.forwardRef<HTMLSelectElement, InputHTMLAttributes<HTMLSelectElement>>( SelectComponent )

Select.displayName = "Select";

/* COMPONENT OPTION */
interface ISelectItemProps extends InputHTMLAttributes<HTMLOptionElement> {}

const OptionComponent = ( { className, children, ...props }: ISelectItemProps, ref: any ) => {
  
  return (
    <>
      <option 
        ref={ref}
        className={cn("bg-secondary text-secondary-foreground", className)} 
        {...props} 
      >
        {children}
      </option>
    </>
  )
}

const Option = React.forwardRef<HTMLOptionElement, InputHTMLAttributes<HTMLOptionElement>>( OptionComponent )

Option.displayName = "Option";

export { Select, Option };