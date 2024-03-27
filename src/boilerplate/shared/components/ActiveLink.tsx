"use client"

/* NEXT */
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

/* BOILERPLATE */
import { cn } from "@/lib/utils";

interface Props extends LinkProps {
  children:React.ReactNode
  className?: string,
  classNameActive?:string
}

export const ActiveLink = ({ children ,className, classNameActive, ...props}: Props) => {

  const path = usePathname();

  return (
    <Link  
      className = { cn("py-0.5 px-2 flex flex-nowrap items-center gap-2 rounded-md text-sm hover:bg-secondary hover:text-secondary-foreground [&_svg]:hover:text-secondary-foreground", path === props.href ? "bg-secondary text-secondary-foreground [&_svg]:text-secondary-foreground" : "" ,  className) }
      {...props}
    >
      {children}
    </Link>
  )
}
