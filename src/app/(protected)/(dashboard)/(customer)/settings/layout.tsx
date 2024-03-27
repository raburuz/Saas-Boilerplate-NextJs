/* BOILERPLATE */
import { ActiveLink } from "@/boilerplate/shared/components/ActiveLink";

interface IProps { children: React.ReactNode }

export default function Layout( { children }: IProps ) {

  return (
    <>
      <h1>Settings</h1>
      <div className="mb-8 flex flex-row gap-3">
        <ActiveLink href={"/settings/billing"} classNameActive="p-1.5 w-fit">
          Billing
        </ActiveLink>
        <ActiveLink href={"/settings/profile"} classNameActive="p-1.5 w-fit">
          Profile
        </ActiveLink>
      </div>
      {children}
    </>
  )
}
