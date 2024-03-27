/* BOILERPLATE */
import { DashboardLayout } from "@/boilerplate/dashboard";
import { seo } from "@/lib/seo";

/* CONFIG */
import { config } from "@/config";

export const metadata = seo({
  title: `Dashboard | ${config.app.domain}`,
});

interface IProps { children: React.ReactNode }

export default async function Layout( { children }: IProps ) {

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}
