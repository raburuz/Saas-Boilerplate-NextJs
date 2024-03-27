/* BOILERPLATE */
import { SignUpPage } from "@/boilerplate/auth";
import { seo } from "@/lib/seo";

/* CONFIG */
import { config } from "@/config";

export const metadata = seo({
  title: `Sign Up | ${config.app.domain}`,
  robots: {
    index: false,
    follow: false
  }
});


export default function Page() {
  return (
    <>
      <SignUpPage/>
    </>
  )
}
