/* NEXT */
import Link from 'next/link';

/* CONFIG */
import { config } from '@/config';

/* FOLDER */
import { DesktopNavbarLinks, MobileNavbarLinks } from './NavbarLinks';

/* COMPONENT */
export const Header = ( ) => {

  return (
    <>
      <header className='px-4 py-2 sticky top-0 z-10 w-full backdrop-blur-lg bg-[radial-gradient(transparent_1px,hsl(var(--background))_1px)] [background-size:5px_5px]'>
        <div className='max-w-6xl mx-auto flex items-center justify-between lg:justify-start flex-row'>
          {/* BRAND */}
          <Link href={"/"} className='mr-12 inline-block text-lg font-bold first-letter:uppercase text-primary'>
            {config.app.name}
          </Link>
          {/* NAVBAR LINKS */}
          <DesktopNavbarLinks/>
          <MobileNavbarLinks/>
        </div>
      </header>
    </>
  )
}