/* BOILERPLATE */
import { LogInPage } from "@/boilerplate/auth"
import { seo } from "@/lib/seo";

/* CONFIG */
import { config } from "@/config";

export const metadata = seo({
  title: `Log in | ${config.app.domain}`,
  robots: {
    index: false,
    follow: false
  }
});

export default function Page() {
  return (
    <>
      <LogInPage/>
    </>
  )
}
