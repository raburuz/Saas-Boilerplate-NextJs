"use client"

/* NEXT */
import Link from 'next/link';

/* LIBRARIES */
import { MenuIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

/* SHADCN */
import { Button } from '@/shadcn/ui/button';
import { Dialog, DialogContentNoAnimate, DialogTrigger } from '@/shadcn/ui/dialog';

/* BOILERPLATE */
import { ThemeToggle } from '@/boilerplate/shared/components';

/* Navbar links */
const links = [
  { link: "/content", text: "Content" },
  { link: "/pricing", text: "Pricing" },
];

export const DesktopNavbarLinks = ( ) => {
  const { data } = useSession();

  const user = data?.user;

  return (
    <>
      <nav className='w-full mx-auto hidden lg:flex justify-between'>
        <ul className='flex items-center gap-8'>
          {
            links.map((data)=>(
                <li key={data.link}>
                  <Link href={data.link} className='text-sm hover:text-primary'>
                    {data.text}
                  </Link>
                </li>
            ))
          }
        </ul>
        <ul className='flex items-center gap-4'>
          <li>
            <ThemeToggle/>
          </li>
          {
            user ? (
              <>
                <li>
                  <Button variant={"outline"} className='text-sm' asChild>
                    <Link href={"/dashboard"}>
                      Dashboard
                    </Link>
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span className='text-muted-foreground font-extralight opacity-25'>|</span>
                </li>
                <li>
                    <Button variant={'ghost'} className='text-sm' asChild>
                      <Link href={"/auth/login"}>
                        Login
                      </Link>
                    </Button>
                </li>
                <li>
                  <Button variant={"outline"} className='text-sm' asChild>
                    <Link href={"/auth/signup"}>
                      Sign up
                    </Link>
                  </Button>
                </li>
              </>
            )
          }
        </ul>
      </nav>
    </>
  )
}


export const MobileNavbarLinks = ( ) => {
  
  const { data } = useSession();

  const user = data?.user;

  return (
    <div className='flex items-center gap-4 lg:hidden'>
      <ThemeToggle/>
      <Dialog>
        <DialogTrigger asChild>
          <button className='p-2 hover:bg-gray-500/10 rounded-sm cursor-pointer'>
            <MenuIcon className="w-5 text-foreground/70"/>
            <span className="sr-only">Menu</span>
          </button>
        </DialogTrigger>
        <DialogContentNoAnimate className='p-0 w-auto h-screen max-w-[15rem] min-w-[15rem] md:w-56 border-none left-[none] right-0 top-0 translate-x-0 translate-y-0 data-[state=open]:slide-in-from-right'>    
          <div className='border-l border-l-solid border-border'>
            <ul className='px-4 pt-6 lg:pt-0 flex flex-col gap-2'>
              {
                links.map((data)=>(
                    <li key={data.link}>
                      <Link href={data.link} className='p-3 block text-sm w-full hover:text-primary'>
                        {data.text}
                      </Link>
                    </li>
                ))
              }
              {
                user ? ( 
                  <>
                    <li>
                      <Button variant={'ghost'} className='py-6 text-sm w-full justify-start' asChild>
                        <Link href={"/dashboard"}>
                          Dashboard
                        </Link>
                      </Button>
                    </li>
                    
                  </>
                ) : ( 
                  <>
                    <li>
                        <Button variant={'ghost'} className='py-6 text-sm w-full justify-start' asChild>
                          <Link href={"/auth/login"}>
                            Login
                          </Link>
                        </Button>
                    </li>
                    <li>
                      <Button variant={"ghost"} className='py-6 text-sm w-full justify-start' asChild>
                        <Link href={"/auth/signup"}>
                          Sign up
                        </Link>
                      </Button>
                    </li>
                  </>
                )
              }
            </ul>
          </div>
        </DialogContentNoAnimate>
      </Dialog>
    </div>
  )
}
