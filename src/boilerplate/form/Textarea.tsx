"use client"
/* REACT */
import React, { TextareaHTMLAttributes }from "react"

/* BOILERPLATE */
import { cn } from "@/lib/utils";

/* COMPONENT */
interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Component = ( { className, ...props }: IProps, ref: any ) => {
  return (
    <>
      <textarea
        ref={ref}
        className={cn(
          `
            flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm 
            placeholder:text-muted-foreground placeholder:font-semibold focus-visible:outline-none focus-visible:ring-1 
            focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 
          `,
          className
        )}
        {...props} 
      />
    </>
  )
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>> ( Component )

Textarea.displayName = "Textarea";

export { Textarea };