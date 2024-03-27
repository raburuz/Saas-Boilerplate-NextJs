
/* BOILERPLATE */
import { Footer, Header } from "@/boilerplate/shared/components";

interface IProps { children: React.ReactNode }

export default async function Layout( { children }: IProps ) {

  return (
    <>
      <Header/>
      <main className="px-4 max-w-xl mx-auto">
        {children}
      </main>
      <Footer/>
    </>
  )
}
