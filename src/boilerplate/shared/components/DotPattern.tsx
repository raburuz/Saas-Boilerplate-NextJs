import { cn } from "@/lib/utils"

interface IProps {
  className? : string
}

export const DotPattern = ( { className }: IProps ) => {


  /* 
  body {
  --dot-bg: black;
  --dot-color: white;
  --dot-size: 1px;
  --dot-space: 22px;
	background:
		linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		var(--dot-color);
}
  
  */
  return (
    <>
      <svg 
        aria-hidden="true" 
        className={cn("pointer-events-none absolute inset-0 h-full w-full fill-white/20 [mask-image:linear-gradient(to_top_left,white,transparent,transparent)] rotate-180",className)}>
          <defs>
            <pattern id=":rv:" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x="-10" y="-10">
              <circle id="pattern-circle" cx="0.5" cy="0.5" r="0.5"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#:rv:)">
          </rect>
      </svg>
    </>
  )
}
