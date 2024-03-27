"use client"

/* LIBRARIES */
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

/* BOILERPLATE */
import { Form, FormField, FormLabel, FormMessage, Input } from '@/boilerplate/form';
import { useServer } from '@/boilerplate/shared/hooks';

/* SHADCN */
import { Button } from '@/shadcn/ui/button';

/* FOLDER */
import { IUpdateUsernameSchema, updateUsernameSchema } from '@/boilerplate/auth/schemas';
import { updateCustomerNameInDB } from '@/boilerplate/auth/actions/updateUsernameInDB';

/* COMPONENT */
export const UpdateUsernameForm = () => {
  
  //Hooks
  const { data, status, update } = useSession();
  const { isPending, executeAsync } = useServer();
  
  //Form
  const form = useForm<IUpdateUsernameSchema>({
    resolver: zodResolver(updateUsernameSchema),
    values:{
      name:  data?.user?.name ?? '',
    },
    mode: "onBlur",
  });

  //Action
  const onSubmit = ( formData: IUpdateUsernameSchema ) => {

    const name = formData.name;
    executeAsync(updateCustomerNameInDB( name ), {
      success: ( data ) => {
        toast.success(data.message);
        update();
      },
      error: ( error ) => {
        toast.error(error as string);
      }

    })
  };

  return (
    <>
      <Form onSubmit={form.handleSubmit(onSubmit)}  className='max-w-lg pb-4'>
        <FormField>
          <FormLabel>Name</FormLabel>
          <Input placeholder={ status === "loading" ? "Loading..." : "Enter your name"} {...form.register("name")}/>
          <FormMessage message={form.formState.errors["name"]?.message}/>
        </FormField>
        <div className='flex flex-col gap-1.5'>
          <label className='text-xs'>Email address</label>
          <div className='flex h-9 w-full rounded-md border border-input text-muted-foreground bg-muted px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 justify-start items-center cursor-default' >
            <span>{ status === "loading" ? <span className='text-muted-foreground'>Loading...</span> : data?.user?.email}</span>
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          Save change
        </Button>
      </Form>
    </>
  )
}
