"use client"
/* REACT */
import { useState } from "react";

/* NEXT */
import { useSearchParams } from "next/navigation";

/* LIBRARIES */
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { MailCheck } from "lucide-react";

/* SHADCN */
import { Button } from "@/shadcn/ui/button";
import { Alert } from "@/shadcn/ui/alert";

/* BOILERPLATE */
import { Form, FormField, FormLabel, FormMessage, Input } from "@/boilerplate/form";

/* FOLDER */
import { useAuth } from "@/boilerplate/auth/hooks/useAuth";
import { Google } from "@/boilerplate/auth/components/Google";
import { IEmailSchema, emailSchema } from "@/boilerplate/auth/schemas";

/* COMPONENT */
export const AuthForm = () => {

  // Hooks
  const { isBlockActions, loginWithMagicLink } = useAuth();
  const [ isShowEmailForm, setIsShowEmailForm ] = useState(false);
  const params = useSearchParams();
  const value = params.get("action");

  const form = useForm<IEmailSchema>({
    resolver: zodResolver(emailSchema),
    mode:'onBlur',
  });

  const onSubmit = ( formData: IEmailSchema ) => loginWithMagicLink(formData.email);

  return (
    <>
      <div className="w-full flex flex-col gap-4">

        <Google/>

        {
          value === "magic_link_send" && isBlockActions ? (
              <Alert variant={"success"} className="mb-1">
                <div className="text-center flex items-center gap-2">
                  <MailCheck className="w-4"/>
                  <span>Email sent - check your inbox!</span>
                </div>
              </Alert>
            ) : null
        }

        {/* Magic Link Form */}
        {
          isShowEmailForm  ? (
            <>
              <Form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField>
                  <FormLabel>Email</FormLabel>
                  <Input className="my-1" type="email" placeholder='hello@example.com' disabled={isBlockActions} {...form.register("email")}/>
                  <FormMessage message={form.formState.errors["email"]?.message} /> 
                </FormField>
                <div className="mt-2 flex justify-between items-center">
                  <Button type="submit" disabled={isBlockActions} size={"lg"} variant={"outline"} className="w-full flex gap-2 items-center bg-background">
                    <span>Continue with Magic Link</span>
                  </Button>
                </div>
              </Form>
            </>
          ) : (
            <>
              <Button onClick={()=>setIsShowEmailForm(true)} disabled={isBlockActions} size={"lg"} variant={"outline"} className="w-full flex gap-2 items-center bg-background">
                <span>Continue with Magic Link</span>
              </Button>
            </>
          ) 
        }

      </div>
    </>
  )
}
  