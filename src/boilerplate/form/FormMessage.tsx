"use client"
/* REACT */
import { HTMLAttributes } from "react";
/* BOILERPLATE */
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

/* COMPONENT */
interface IProps extends HTMLAttributes<HTMLParagraphElement> { message: string | null | undefined }

export const FormMessage = ({className, message = '', ...props}: IProps ) => {

  return (
    <>
      {
        message ? (
          <div className="flex flex-row items-center gap-2">
            <AlertCircle className="w-4 text-red-500"/>
            <span 
              className={cn("text-xs text-red-500 selection:text-red-900 selection:bg-red-500", className)}
              {...props}
            >
              {message}
            </span>
          </div>

        ) :  null
      }
    </>
  )
}

