
/* BOILERPLATE */
import { OnboardingPage } from "@/boilerplate/onboarding";
import { seo } from "@/lib/seo";

/* CONFIG */
import { config } from "@/config";

/* COMPONENT */
export const metadata = seo({
  title: `Welcome to ${config.app.name}`
})

export default function Page() {
  return (
    <>
      <OnboardingPage/>
    </>
  )
}
