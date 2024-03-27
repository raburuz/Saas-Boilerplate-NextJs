
/* BOILERPLATE */
import { Footer } from "@/boilerplate/shared/components";
import { Header } from "@/boilerplate/shared/components";
import { seo } from "@/lib/seo";

/* CONFIG */
import { config } from "@/config";

export const metadata = seo({
  title: `Content | ${config.app.domain}`
});

interface IProps { children: React.ReactNode }

export default async function Layout( { children }: IProps ) {


  return (
    <>
      <Header/>
      <main className="px-4 max-w-6xl mx-auto">
        {children}
      </main>
      <Footer/>
    </>
  )
}
