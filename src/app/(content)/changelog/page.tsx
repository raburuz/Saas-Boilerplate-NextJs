/* BOILERPLATE */
import { ChangeLogPage } from "@/boilerplate/content";
import { seo } from "@/lib/seo";

/* CONFIG */
import { config } from "@/config";

export const metadata = seo({
  title: `Changelog | ${config.app.domain}`,
  description: `All the latest updates, improvements, and fixes to ${config.app.name}`,
  robots: {
    index: false,
    follow: false,
  }
});

export default function Page() {
  return (
    <>
      <ChangeLogPage/>
    </>
  )
}