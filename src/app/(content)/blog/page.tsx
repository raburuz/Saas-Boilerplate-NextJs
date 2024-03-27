/* BOILERPLATE */
import { BlogPage } from "@/boilerplate/content";
import { seo } from "@/lib/seo";

/* CONFIG */
import { config } from "@/config";

export const metadata = seo({
  title: `Blog | ${config.app.domain}`
});

export default function Page() {
  return (
    <>
      <BlogPage/>
    </>
  )
}