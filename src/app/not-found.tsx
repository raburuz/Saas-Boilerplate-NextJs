/* BOILERPLATE */
import { Footer } from "@/boilerplate/shared/components";
import { Header } from "@/boilerplate/shared/components";
import { NotFoundPage } from "@/boilerplate/shared/pages";

/* COMPONENT */
export default function NotFound() {
  
  return (
    <>
      <Header/>
        <main>
          <NotFoundPage/>
        </main>
      <Footer/>
    </>
  )
  
}