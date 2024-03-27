/* NEXT */
import Link from 'next/link'

/* Libraries */
import { ArrowRight, CircleDollarSign, Home } from 'lucide-react'

/* BOILERPLATE */
import { EmailCollector } from '@/boilerplate/marketing'

/* COMPONENT */
export const NotFoundPage = () => {

  return (
    <>
      <div className='py-32 max-w-6xl mx-auto flex flex-col justify-center items-center'>
        <span className="text-primary text-sm font-semibold">404 Error Page</span>
        <h2 className='max-w-xl text-center font-semibold text-4xl leading-relaxed md:text-6xl md:leading-[1.475]'>
          Sorry!
          <br />
          Page Not{" "}
          <span className="px-4 py-1 bg-gradient-to-b from-primary to-purple-400 text-primary-foreground rounded-full border border-secondary select-none">Found</span> 
        </h2>
        <div className='mt-6'>
          <p className='text-lg text-center leading-loose text-muted-foreground'>
            The page you are looking for doesn&apos;t exist or has been moved. 
            <br />
            Interesting links:
          </p>
        </div>
        <ul className='w-full max-w-xl mt-8 flex flex-col justify-center items-center gap-4'>
          <li className='w-full'>
            <Link 
              className='p-5 flex flex-row gap-4 justify-between items-center border border-border rounded-xl' 
              href="/"
            >
              <div className='flex flex-row items-center gap-4'>
                <div className="w-14 h-14 grid place-content-center border border-border rounded-full">
                  <Home className="w-5 text-primary"/>
                </div>
                <div>
                  <span className='font-semibold'>Home Page</span>
                </div>
              </div>
              <div className='w-10 h-10 grid place-content-center bg-muted rounded-full'>
                <ArrowRight className='w-5 text-muted-foreground'/>
              </div>
            </Link>
          </li>
          <li className='w-full'>
            <Link 
              className='p-5 flex flex-row gap-4 justify-between items-center border border-border rounded-xl' 
              href="/pricing"
            >
              <div className='flex flex-row items-center gap-4'>
                <div className="w-14 h-14 grid place-content-center border border-border rounded-full">
                  <CircleDollarSign className="w-5 text-primary"/>
                </div>
                <div>
                  <span className='font-semibold'>Pricing</span>
                </div>
              </div>
              <div className='w-10 h-10 grid place-content-center bg-muted rounded-full'>
                <ArrowRight className='w-5 text-muted-foreground'/>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <EmailCollector/>
    </>
  )

}
