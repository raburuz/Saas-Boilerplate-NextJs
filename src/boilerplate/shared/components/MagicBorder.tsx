"use client"

/* REACT */
import { MouseEvent, useEffect, useRef, useState } from "react"

/* BOILERPLATE */
import { cn } from "@/lib/utils";

/* COMPONENT */
interface IProps {
  children: React.ReactNode,
  className?: string,
}

export const MagicBorder = ( { children, className }: IProps ) => {

  //hooks
  const [xAxis, setXAxis] = useState(1);
  const [yAxis, setYAxis] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const card = ref.current;

    if (card){
      const rect = card.getBoundingClientRect(),
      x = xAxis - rect.left,
      y = yAxis - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }

  }, [xAxis, yAxis]);

  const handleMouseOver = ( event: MouseEvent<HTMLDivElement> ) => {
    setXAxis(event.clientX);
    setYAxis(event.clientY);
  }

  return (
    <>
      <div 
        ref={ref} 
        onMouseMove={handleMouseOver} 
        className={cn("h-full p-[1px] rounded-lg", className)}
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary)), transparent 30% )",   
        }}
      >
        <div className={cn("h-full bg-card rounded-lg", className)}>
          {children}
        </div>
      </div>
    </>
  )
}