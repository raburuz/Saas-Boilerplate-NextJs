"use client"
/* REACT */
import { useState } from "react"

/* LIBRARIES */
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

/* BOILERPLATE */
import { Form, FormField, FormMessage, Textarea } from "@/boilerplate/form"

/* SHADCN */
import { Button } from "@/shadcn/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu"

/* FOLDER */
import { sendFeedback } from "@/boilerplate/customer/actions"
import { IFeedbackFormData, feedbackSchemaValidation } from "@/boilerplate/customer/schemas"
import { useServer } from "@/boilerplate/shared/hooks"

/* COMPONENT */
export const Feedback = () => {

  //Hooks
  const { isPending, executeAsync } = useServer();
  const [ isSent, setIsSent ] = useState(false);
  const session = useSession();

  //form
  const form = useForm<IFeedbackFormData>({
    resolver: zodResolver(feedbackSchemaValidation),
    mode: 'onSubmit',
  });

  if( session.data?.user?.role !== "customer" ) return null;

  /* TODO BLOCK FEEDBACK TO ONE PER DAY */
  const onSubmit = ( formData: IFeedbackFormData ) => {
    setIsSent(true)

    executeAsync(sendFeedback( formData ), {
      success: ( data ) => {
        toast.success(data.message);
        form.reset();
      },
      error: ( error ) => {
        toast.error(error as string);
        setIsSent(false);
      }
    })

  }


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            Feedback
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-4 p-2 min-w-[20.5rem] bg-background">
          <>
            <Form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <FormField>
                <Textarea className="bg-popover h-32" placeholder='Ideas to improve this page' {...form.register("feedback")} />
                <FormMessage message={form.formState.errors["feedback"]?.message}/>
              </FormField>
              <Button className="self-end" size={"sm"} disabled={isPending || isSent}>
                Send
              </Button>
            </Form>
          </>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
