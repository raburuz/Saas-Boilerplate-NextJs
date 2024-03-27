"use client"
/* NEXT */
import Link from 'next/link';
import Image from 'next/image';

/* LIBRARIES */
import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { MoreHorizontal } from "lucide-react"

/* BOILERPLATE */
import { cn } from '@/lib/utils';
import { planConfig } from '@/lib/plans';
import { Logout } from '@/boilerplate/auth';
import { SummarySubscription } from '@/boilerplate/plans';
import { ActiveLink } from "@/boilerplate/shared/components";

/* SHADCN */
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shadcn/ui/dropdown-menu';

/* CONFIG */
import { config, dashboardConfig } from '@/config';

const mode = planConfig.mode;

/* COMPONENT */
interface IProps{
  className?: string,
}
export const Aside = ({ className }: IProps) => {

  const { data } = useSession();
  const user = data?.user;

  const renderDropdownTrigger = () => {

    return (
      <DropdownMenuTrigger asChild>
        <div className='mx-4 px-2 py-1 flex flex-row items-center gap-2 rounded-lg hover:bg-secondary cursor-pointer [&_span]:hover:text-secondary-foreground [&_svg]:hover:text-secondary-foreground'>
          {
            user?.image ? (
              <Image
                className='w-5 h-5 object-cover rounded-full'
                src={user.image}
                alt='User Photo'
                width={50}
                height={50}
              />
            ) : (
              <div className='w-5 h-5 p-2 flex justify-center items-center bg-primary border border-border rounded-full '>
                { user?.email ? (<i className='text-xs not-italic font-semibold text-primary-foreground'>{user?.email[0].toUpperCase()}</i>) : null }
              </div>
            )
          }
          <span className='text-xs font-medium truncate'>{user?.email}</span>
          <MoreHorizontal className='w-4 text-foreground/70'/>
        </div>
      </DropdownMenuTrigger>
    )
  }

  const renderSubscriptionComponents = () => {

    if(mode !== "subscription") return null;

    if(user?.role === UserRole.customer) return (
      <>
        <DropdownMenuSeparator/>
        <DropdownMenuLabel>
          <SummarySubscription/>
        </DropdownMenuLabel>
      </>
    );

    if(user?.role === UserRole.admin) return (
      <>
        <DropdownMenuSeparator/>
        <DropdownMenuLabel>
          <p className='text-[10px] font-medium'>Connect as <strong>{ user.role }</strong> with: </p>
          <p className='text-[10px] font-medium text-green-500'>Unlimited access</p>
        </DropdownMenuLabel>
      </>
    );
    
    return null
  }

  const renderDropdownContent = () => {
    return (
      <DropdownMenuContent className='min-w-[12.5rem]' >
        <DropdownMenuLabel>
          <div className='flex flex-col'>
            <span className='text-[10px] font-medium'>Sign in as</span>
            <span className='text-[10px] font-light'>{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        
        {/* SUBSCRIPTION MODE */}
        { renderSubscriptionComponents() }

        <DropdownMenuSeparator/>
        {
          user?.role ? (
            dashboardConfig.links[user.role].submenu.map((data)=>(
              <DropdownMenuItem key={data.href}>
                <Link href={data.href} className='flex items-center gap-2'>
                  { data.icon }
                  <span>{data.text}</span>
                </Link>
              </DropdownMenuItem>
            ))
          ) : null
        }
        {/* LOGOUT */}
        <DropdownMenuItem>
          <Logout/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    )
  }

  return (
    <>
      <aside className={cn(`
        lg:sticky top-0 pb-16 pt-5 lg:pb-5 w-60 
        max-w-[15rem] min-w-[15rem] lg:w-56 h-screen
        flex flex-col justify-between
        border-r border-solid border-border
        select-none bg-background lg:bg-transparent
      `, className)}>

        <div>
          <span className='px-6 pb-4 text-lg text-foreground font-bold first-letter:uppercase'>{config.app.name}</span>
          {/* MENU */}
          <ul className='px-4 mt-8 flex flex-col gap-2'>
            {
              user?.role ? (
                dashboardConfig.links[user.role].menu.map((data)=>(
                  <li key={data.href}>
                    <ActiveLink href={data.href} >
                      { data.icon }
                      <span>{data.text}</span>
                    </ActiveLink>
                  </li>
                ))
              ) : null
            }
          </ul>
        </div>

        {/* SUBMENU */}
        <DropdownMenu>

          {/* Trigger */}
          { renderDropdownTrigger() }

          {/* Content */}
          { renderDropdownContent() }
          
        </DropdownMenu>
      </aside>
    </>
  )
}
