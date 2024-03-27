/* BOILERPLATE */
import { AuthLayout } from "@/boilerplate/auth";

/* COMPONENT */
interface IProps { children: React.ReactNode }

export default async function Layout( { children }: IProps ) {

  return (
    <>
      <AuthLayout>
        {children}
      </AuthLayout>
    </>
  )
}
