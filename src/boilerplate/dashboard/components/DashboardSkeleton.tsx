/* SHADCN */
import { Skeleton } from '@/shadcn/ui/skeleton'

/* COMPONENT */
export const DashboardSkeleton = () => {
  return (
    <div className='flex flex-row'>
      <aside className='hidden pl-2 pr-4 py-6 min-w-[15rem] w-60 h-screen lg:flex flex-col items-center justify-between gap-4 border-r border-solid border-border'>
        <div className='w-full flex flex-col gap-4'>
          <Skeleton className='w-2/3 h-8 '/>
          <Skeleton className='w-full h-8 '/>
          <Skeleton className='w-full h-8 '/>
          <Skeleton className='w-full h-8 '/>
          <Skeleton className='w-full h-8 '/>
          <Skeleton className='w-full h-8 '/>
        </div>
        <div className='w-full'>
          <Skeleton className='w-full h-8 '/>
        </div>
      </aside>
      <div className='w-full flex flex-col gap-4'>
        <nav className='px-2 py-6 w-full h-20 flex justify-end gap-4 border-b border-solid border-border'>
          <Skeleton className='w-40 h-8 '/>
          <Skeleton className='w-10 h-8 '/>
        </nav>
        <div className='px-2 pt-16 max-w-6xl mx-auto w-full flex flex-col gap-2'>
          <Skeleton className='w-full h-20'/>
          <div className='w-full pt-20 flex flex-col gap-2'>
            <Skeleton className='w-full h-10'/>
            <Skeleton className='w-full h-10'/>
            <Skeleton className='w-full h-10'/>
            <Skeleton className='w-full h-10'/>
            <Skeleton className='w-full h-10'/>
            <Skeleton className='w-full h-10'/>
            <Skeleton className='w-full h-10'/>
          </div>

        </div>
      </div>
    </div>
  )
}
