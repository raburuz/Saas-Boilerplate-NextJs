
/* BOILERPLATE */
import { Footer } from "@/boilerplate/shared/components";
import { Header } from "@/boilerplate/shared/components";

interface IProps { children: React.ReactNode }

export default async function Layout( { children }: IProps ) {


  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}
