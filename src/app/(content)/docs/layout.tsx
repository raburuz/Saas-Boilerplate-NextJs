
/* BOILERPLATE */
import { seo } from "@/lib/seo";
import { DocsLayout } from "@/boilerplate/content";
import { Footer } from "@/boilerplate/shared/components";

/* CONFIG */
import { config } from "@/config";

export const metadata = seo({
  title: `Docs | ${config.app.domain}`
});

interface IProps { children: React.ReactNode }

export default async function Layout( { children }: IProps ) {


  return (
    <>
      <DocsLayout>
        {children}
      </DocsLayout>
      <Footer/>
    </>
  )
}
