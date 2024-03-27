
/* LIBRARIES */
import { DefaultUser } from 'next-auth/react';
/* BOILERPLATE */
import { IUserNextAuthSession } from '@/lib/auth/types';

declare module 'next-auth' {
  export interface Session {
    user?: IUserNextAuthSession
  }
}
