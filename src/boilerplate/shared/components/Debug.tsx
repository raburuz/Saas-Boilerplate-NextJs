
"use client"

/* LIBRARIES */
import { useSession } from "next-auth/react";

/* BOILERPLATE */
import { planConfig } from "@/lib/plans";

/* SHADCN */
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu";
import { Button } from "@/shadcn/ui/button";

const environment = process.env.NODE_ENV;

/* COMPONENT */
export const Debug = () => {

  const { data, status } = useSession();

  if(environment === "production") return null;

  const mode = planConfig.mode;

  const renderAppData = () => {
    return (
      <>
        <span>APP:</span>
        <div className="pl-1 flex flex-col gap-0.5">
            <span>Environment: {environment}</span>
            <span>Application mode: {mode}</span>
        </div>
      </>
    )
  }
  const renderUserData = () => {
    if(!data?.user) return null;

    return (
      <>
        <span>USER:</span>
        <div className="pl-1 flex flex-col gap-0.5">
          <span>status: {status}</span>
          <span>id: {data?.user?.id}</span>
          <span>name: {data?.user?.name}</span>
          <span>email: {data?.user?.email}</span>
          <span>role: {data?.user?.role}</span>
          <span>isOnboardingComplete: {JSON.stringify(data?.user?.isOnboardingComplete)}</span>
          <span>stripeCustomerId: {data?.user?.stripeCustomerId ?? "null"}</span>
          <span>subscription.plan: {data?.user?.subscription?.plan ?? "undefined"}</span>
          <span>payments: {JSON.stringify(data?.user?.oneTime) ?? "undefined"}</span>
        </div>
      </>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"destructive"} className="h-4 fixed bottom-0 left-0 text-xs font-mono">Debug</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5 text-xs font-light text-foreground font-mono">
            { renderAppData() }
            { renderUserData() }
          </div>
        </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
