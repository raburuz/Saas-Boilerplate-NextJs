
/* CONFIG */
import { config } from '@/config'

/* COMPONENT */
export const Branding = () => {
  return (
    <>
      <span className='fixed z-50 bottom-0 right-2 text-[8px] font-semibold select-none text-muted-foreground font-mono'>{config.app.domain}</span>
    </>
  )
}
