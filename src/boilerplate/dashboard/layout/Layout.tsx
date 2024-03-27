/* LIBRARIES */
import { MenuIcon } from "lucide-react"

/* BOILERPLATE */
import { ThemeToggle } from "@/boilerplate/shared/components";
import { Feedback } from '@/boilerplate/customer';

/* SHADCN */
import { Dialog, DialogContentNoAnimate, DialogTrigger } from '@/shadcn/ui/dialog';

/* FOLDER */
import { Alerts } from '@/boilerplate/dashboard/components/Alerts'
import { Aside } from '@/boilerplate/dashboard/components/Aside';

/* CONFIG */
import { config } from '@/config';
import { CTAButton } from '../components/CTAButton';

/* COMPONENT */
interface IProps{
  children: React.ReactNode,
}
export const DashboardLayout = ({ children }: IProps) => {

  return (
    <>
      <div className="relative lg:flex flex-row">
        {/* SIDEBAR- Desktop */}
        <Aside className='hidden lg:flex'/>

        <div className='w-full'>
          <nav className="p-4 sticky top-0 z-10 w-full bg-background h-[50px] flex items-center border-b border-solid border-border">
            <div className="lg:hidden w-full flex flex-row justify-between gap-4">
              <div className="flex flex-row items-center gap-2">
                <span className="font-bold text-lg text-foreground first-letter:uppercase ">{config.app.name}</span>
              </div>
              {/* NAV - Mobile */}
              <div className="flex flex-row items-center gap-3.5 lg:hidden">
                <Feedback/>
                <ThemeToggle/>
                {/* ASIDE - Mobile */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className='p-2 hover:bg-gray-500/10 rounded-sm cursor-pointer'>
                      <MenuIcon className="w-4 text-foreground/70"/>
                    </button>
                  </DialogTrigger>
                  <DialogContentNoAnimate className='p-0 w-auto lg:h-screen max-w-[15rem] min-w-[15rem] lg:w-56 border-none left-0 top-0 translate-x-0 translate-y-0 data-[state=open]:slide-in-from-left'>
                    <Aside/>
                  </DialogContentNoAnimate>
                </Dialog>
              </div>
            </div>
            {/* NAV - Desktop */}
            <div className="hidden lg:w-full lg:flex flex-row items-center justify-end gap-2">
              <Feedback/>
              <CTAButton/>
              <ThemeToggle/>
            </div>

          </nav>
          {/* CONTENT */}
          <main className='px-4 py-6 sm:px-6 lg:px-10 lg:py-10 overflow-auto'>
            <div className='relative px-0.5 mx-auto max-w-5xl overflow-auto [&>h1]:text-2xl [&>h1]:font-black [&>h1]:pb-8 [&>h2]:text-lg'>
              {/* ACTIONS */}
              <Alerts/>
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
