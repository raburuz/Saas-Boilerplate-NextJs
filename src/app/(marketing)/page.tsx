
/* BOILERPLATE */
import { LandingPage } from '@/boilerplate/marketing'

import { seo } from "@/lib/seo";

export const metadata = seo();

export default function Home() {
  return (
    <LandingPage/>
  )
}
