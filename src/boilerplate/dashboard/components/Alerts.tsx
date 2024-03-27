"use client"

/* NEXT */
import { useSearchParams } from 'next/navigation'

/* LIBRARIES */
import { RocketIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

/* CONFIG */
import { dashboardConfig } from '@/config';

/* BOILERPLATE */
import { Alert, AlertDescription, AlertTitle } from '@/shadcn/ui/alert';

/* COMPONENT */
export const Alerts = () => {

  const { data } = useSession();
  const searchParams = useSearchParams();

  const user = data?.user;
  const value = searchParams?.get(dashboardConfig.alerts.queryKey) ?? null;

  if(!value || !user) return null;

  const action = dashboardConfig.alerts.actions[user.role].find((action)=>action.queryValue === value);

  if(!action) return null;

  return (
    <>
      <Alert variant={action.variant} className='mb-5'>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>{action.title}</AlertTitle>
        <AlertDescription>
          {action.description}
        </AlertDescription>
      </Alert>
    </>
  )
}
