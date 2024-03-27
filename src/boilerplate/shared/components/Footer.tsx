/* NEXT */
import Link from "next/link"

/* CONFIG */
import { config } from "@/config"

/* COMPONENT */
export const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto border-t border-input">
      <div className="px-4 md:px-8 py-28 flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-4">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-bold">{config.app.name}</span>
          <p className="max-w-xs text-sm text-muted-foreground">Experience the Stellar difference and unlock the true potential</p>
        </div>
        <div className="flex flex-wrap gap-28">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold">Product</span>
            <Link className="text-xs text-muted-foreground" href={'/pricing'} >Pricing</Link>
            <Link className="text-xs text-muted-foreground" href={'/blog'} >Blog</Link>
            <Link className="text-xs text-muted-foreground" href={'/changelog'} >Changelog</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold">Legal</span>
            <Link className="text-xs text-muted-foreground" href={'/legal/terms-of-service'} >Terms of service</Link>
            <Link className="text-xs text-muted-foreground" href={'/legal/privacy-policy'} >Privacy Policy</Link>
          </div>
        </div>
      </div>

      <div className="py-4">
        <p className="px-2 md:px-8 text-[10px] sm:text-xs text-muted-foreground">
          Copyright  © { new Date().getFullYear() } <span className="first-letter:uppercase inline-block">{config.app.name}</span> - Made with 🤍 by {config.app.owner}
        </p>
      </div>

    </footer>
  )
}
