"use client"

/* LIBRARIES */
import { ChevronRight } from 'lucide-react';

/* FOLDER */
import { useAuth } from '@/boilerplate/auth/hooks/useAuth';

export const Logout = () => {

  const { logout } = useAuth()

  return (
    <>
      <button onClick={logout} className='flex items-center gap-1'>
        <span>Sign out</span>
        <ChevronRight className='w-3 h-3'/>
      </button>
    </>
  )
}
