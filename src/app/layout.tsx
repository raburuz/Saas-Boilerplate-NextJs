/* LIBRARIES */
import { GeistSans, GeistMono } from 'geist/font'

/* BOILERPLATE */
import { Debug, Providers, Branding } from '@/boilerplate/shared/components'
import { viewportMetadata } from '@/lib/viewport';
import { getNextAuthSession } from '@/lib/auth/session';
import { seo } from "@/lib/seo";

/* CSS */
import './globals.css'

/**
 *  HACK -> CHECK ENV
 *  This layout only render in server!
 **/
import { env_server } from '@/env/server.mjs';
import { env_client } from '@/env/client.mjs';

interface Props {
  children: React.ReactNode
}

export const metadata = seo();
export function generateViewport () {
  return viewportMetadata();
} 

export default async function RootLayout({ children }: Props) {

  //Pass the current session to auth provider, more performance!
  const session = await getNextAuthSession();
  
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <Providers session={session}>
          {children}
          <Debug/>
        </Providers>
        {/* SHOW DOMAIN BRANDING*/}
        <Branding/>
      </body>
    </html>
  )
}
