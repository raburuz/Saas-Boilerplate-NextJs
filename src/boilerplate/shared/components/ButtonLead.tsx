"use client"

/* LIBRARIES */
import toast from 'react-hot-toast';

/* BOILERPLATE */
import { Form, FormField, Input } from '@/boilerplate/form';


/* SHADCN */
import { Button } from '@/shadcn/ui/button';

/* FOLDER */
import { saveEmailLeadInDB } from '../actions/saveEmailLeadInDB';
import { useServer } from '../hooks';

/* COMPONENT */
export const ButtonLead = () => {

  //Hooks
  const { isPending, executeAsync } = useServer();

  //action
  const action = ( formData: FormData ) => {

    const email = formData.get('email') as string;

    executeAsync(saveEmailLeadInDB(email), {
      success: ( data ) => {
        toast.success(data.message);
      },
      error: ( error ) => {
        toast.error(error as string);
      }
    })

  };

  //jsx
  return (
    <>
      <Form className='w-full' action={action}>
        <div className='flex items-center justify-between flex-row gap-1 rounded-md p-1'>
          <FormField className='w-full'>
            <Input type='text' name='email' placeholder='Email address...' className='bg-transparent border-0 shadow-none focus-visible:border-0 focus-visible:ring-0' />
          </FormField>
          <Button type='submit' className='whitespace-nowrap' disabled={isPending}>Subscribe</Button>
        </div>
      </Form>
    </> 
  )
}
