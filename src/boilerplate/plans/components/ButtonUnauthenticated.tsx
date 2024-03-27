
/* NEXT */
import Link from "next/link";

/* SHADCN */
import { Button } from '@/shadcn/ui/button'

/* CONFIG */
import { config } from "@/config";

/* BOILERPLATE */
import { planConfig } from "@/lib/plans";

/* COMPONENT */
export const ButtonUnauthenticated = () => {

  const mode = planConfig.mode;

  const renderText = () => {
    return mode === "subscription" ? "Subscribe" : "Buy now";
  }

  return (
    <Button className="w-full font-bold" asChild>
      <Link href={config.next_auth.sign_in_url} >
        {renderText()}
      </Link>
    </Button>
  )
}
