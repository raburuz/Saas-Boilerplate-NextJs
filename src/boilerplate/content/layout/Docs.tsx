/* NEXT */
import Link from "next/link";

/* LIBRARIES */
import { Menu } from "lucide-react";

/* SHADCN */
import { Dialog, DialogContentNoAnimate, DialogTrigger } from '@/shadcn/ui/dialog';

/* CONFIG */
import { config } from "@/config";
import { Header } from "@/boilerplate/shared/components";

/* Folder */
import { DocsAside } from "../components/DocsAside";

/* COMPONENT */
interface IProps{
  children: React.ReactNode
}

export const DocsLayout = ( { children }: IProps ) => {

  return (
    <>
      <div className="hidden lg:flex">
        <Header/>
      </div>
      <div className="px-4 lg:px-0 mt-6 lg:mt-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* NAVBAR */}
        <div className="flex lg:hidden flex-row justify-between">
          <Link href={"/"} className="text-base font-bold">{config.app.name}</Link>
          <Dialog>
            <DialogTrigger asChild>
              <button className='p-2 hover:bg-gray-500/10 rounded-sm cursor-pointer'>
                <Menu className="w-4 text-foreground/70"/>
              </button>
            </DialogTrigger>
            <DialogContentNoAnimate className='p-0 w-auto lg:h-screen max-w-[15rem] min-w-[15rem] lg:w-56 border-none left-0 top-0 translate-x-0 translate-y-0 data-[state=open]:slide-in-from-left'>
              <DocsAside/>
            </DialogContentNoAnimate>
          </Dialog>
        </div>
        {/* DESKTOP */}
        <div className="hidden lg:flex" >
          <DocsAside/>
        </div>
        <div className="w-full lg:w-4/5">
          {children}
        </div>
      </div>
    </>
  )
}
