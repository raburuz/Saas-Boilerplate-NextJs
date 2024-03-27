"use client"
/* REACT */
import { FormHTMLAttributes } from 'react'
/* BOILERPLATE */
import { cn } from '@/lib/utils';

/* COMPONENT */
interface IProps extends FormHTMLAttributes<HTMLFormElement> {}

export const Form = ( { children, className, ...props }: IProps ) => {
  return (
    <form 
      className={cn( "w-full flex flex-col gap-2", className )}
      {...props}
    >
        { children }    
    </form>
  )
}