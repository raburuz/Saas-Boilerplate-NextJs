/* NEXT */
import Link from "next/link"

/* LIBRARIES */
import { ArrowRight, CheckCircle } from "lucide-react"

/* BOILERPLATE */
import { ButtonLead } from "@/boilerplate/shared/components"

/* SHADCN */
import { Button } from "@/shadcn/ui/button"

/* CONFIG */
import { config } from "@/config"

/* FOLDER */
import { Testimonial } from "../components/Testimonial"
import { EmailCollector } from "../components/EmailCollector"

/* LANDING */
export const LandingPage = () => {
  return (
    <>

      {/* Section 1 */}
      <section className="py-32 px-2 max-w-6xl mx-auto flex flex-col justify-center items-center gap-4">
        <span className="text-primary text-sm font-semibold">Our Landing Template</span>
        <h1 className="max-w-xl text-center font-semibold text-4xl leading-relaxed md:text-6xl md:leading-[1.475]">
          Save time and build
          better with{" "}
          <span className="px-4 py-1 bg-gradient-to-b from-primary to-purple-400 text-primary-foreground rounded-full border border-secondary select-none">{config.app.name}</span> 
        </h1>
        <p className="text-center max-w-md font-medium">Gain unparalleled insights into your data with our robust analytics suite and Stellar</p>
        <Button size={"lg"} className="mt-6 py-6 rounded-full" asChild>
          <Link href={"/auth/login"}>Ship Fast Now!</Link>
        </Button>
        {/* Cards */}
        <div className="hidden 2xl:block z-50 relative w-full">
          {/* Top - left */}
          <div className="p-10 select-none -left-40 -top-80 bg-background absolute border border-border rounded-xl -rotate-12 transition-all delay-150 duration-150 hover:border-primary shadow-xl hover:shadow-primary cursor-pointer">
            <p className="text-3xl font-bold">12K</p>
            <p className="text-muted-foreground leading-loose">customers</p>
          </div>
          {/* Top - right */}
          <div className="p-10 select-none -right-40 -top-80 bg-background absolute border border-border rounded-xl rotate-12 transition-all delay-150 duration-150 hover:border-primary shadow-xl hover:shadow-primary cursor-pointer">
            <p className="text-3xl font-bold">12K</p>
            <p className="text-muted-foreground leading-loose">customers</p>
          </div>
          {/* Top - left */}
          <div className="p-10 select-none left-10 -top-96 bg-background absolute border border-border rounded-xl rotate-12 transition-all delay-150 duration-150 hover:border-primary shadow-xl hover:shadow-primary cursor-pointer">
            <p className="text-3xl font-bold">12K</p>
            <p className="text-muted-foreground leading-loose">customers</p>
          </div>
          {/* Top - right */}
          <div className="p-10 select-none right-10 -top-96 bg-background absolute border border-border rounded-xl -rotate-12 transition-all delay-150 duration-150 hover:border-primary shadow-xl hover:shadow-primary cursor-pointer">
            <p className="text-3xl font-bold">12K</p>
            <p className="text-muted-foreground leading-loose">customers</p>
          </div>
          {/* Middle - left */}
          <div className="p-10 select-none left-0 -top-40 bg-background absolute border border-border rounded-xl -rotate-12 transition-all delay-150 duration-150 hover:border-primary shadow-xl hover:shadow-primary cursor-pointer">
            <p className="text-3xl font-bold">12K</p>
            <p className="text-muted-foreground leading-loose">customers</p>
          </div>
          {/* Middle - right */}
          <div className="p-10 select-none right-0 -top-40 bg-background absolute border border-border rounded-xl rotate-12 transition-all delay-150 duration-150 hover:border-primary shadow-xl hover:shadow-primary cursor-pointer">
            <p className="text-3xl font-bold">12K</p>
            <p className="text-muted-foreground leading-loose">customers</p>
          </div>
          {/* Bottom - left */}
          <div className="p-10 select-none left-40 -top-0 bg-background absolute border border-border rounded-xl rotate-12 transition-all delay-150 duration-150 hover:border-primary shadow-xl hover:shadow-primary cursor-pointer">
            <p className="text-3xl font-bold">12K</p>
            <p className="text-muted-foreground leading-loose">customers</p>
          </div>
          {/* Bottom - right */}
          <div className="p-10 select-none right-40 -top-0 bg-background absolute border border-border rounded-xl -rotate-12 transition-all delay-150 duration-150 hover:border-primary shadow-xl hover:shadow-primary cursor-pointer">
            <p className="text-3xl font-bold">12K</p>
            <p className="text-muted-foreground leading-loose">customers</p>
          </div>
          {/* Bottom - left */}
          <div className="p-10 select-none -left-44 -top-0 bg-background absolute border border-border rounded-xl -rotate-12 transition-all delay-150 duration-150 hover:border-primary shadow-xl hover:shadow-primary cursor-pointer">
            <p className="text-3xl font-bold">12K</p>
            <p className="text-muted-foreground leading-loose">customers</p>
          </div>
          {/* Bottom - right */}
          <div className="p-10 select-none -right-44 -top-0 bg-background absolute border border-border rounded-xl rotate-12 transition-all delay-150 duration-150 hover:border-primary shadow-xl hover:shadow-primary cursor-pointer">
            <p className="text-3xl font-bold">12K</p>
            <p className="text-muted-foreground leading-loose">customers</p>
          </div>
        </div>

        <div className="relative mt-12 2xl:mt-36 p-1 w-full lg:w-[900px] h-[500px] bg-background border border-border rounded-2xl">
          Insert image here
        </div>
        <div className="absolute top-[500px] right-0 left-0 bottom-0 -z-10 opacity-[0.35] bg-circle-gradient"></div>
      </section>

      {/* Section 2 */}
      <section className="py-32 px-2 max-w-6xl mx-auto flex flex-col justify-center items-center gap-4">
        <h3 className="max-w-xl text-center font-semibold text-3xl md:leading-[1.475]">The world&apos;s best companies trust {config.app.name}</h3>
        <div className="py-10 w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
            <span className="font-black text-lg">Company 1</span>
            <span className="font-black text-lg">Company 2</span>
            <span className="font-black text-lg">Company 3</span>
            <span className="font-black text-lg">Company 4</span>
            <span className="font-black text-lg">Company 5</span>
        </div>
        <p className="text-center text-lg">Stellar is used by over 55,000+ companies across the globe</p>
        <Button variant={"outline"} size={"lg"} className="mt-6 py-6 rounded-full text-center" asChild>
          <Link href={"/auth/login"}>Start your {config.app.name} journey</Link>
        </Button>
      </section>

      {/* Section 3 */}
      <section className="py-32 px-2 max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-20 md:gap-10">
        <div>
          <span className="text-primary text-sm font-semibold">Meet {config.app.name}</span>
          <h2 className="mt-2 max-w-lg font-semibold text-4xl leading-snug md:text-5xl md:leading-tight">
            Provide powerful solutions at all times
          </h2>
          <p className="pt-5 max-w-md leading-loose">
            Stellar is more than just a SaaS and technology template it&apos;s a complete digital transformation solution.
          </p>
          <ul className="py-8 flex flex-col gap-4">
            <li className="flex flex-row items-center gap-2">
              <CheckCircle className="w-4 text-primary"/>
              <span>Share the extra text you want to add as a feature.</span>
            </li>
            <li className="flex flex-row items-center gap-2">
              <CheckCircle className="w-4 text-primary"/>
              <span>Add your feature text here.</span>
            </li>
            <li className="flex flex-row items-center gap-2">
              <CheckCircle className="w-4 text-primary"/>
              <span>Add the text you&apos;d like to include as a feature.</span>
            </li>
          </ul>
          <Button size={"lg"} className="py-6 rounded-full" asChild>
            <Link href={"/auth/login"}>Ship Fast Now!</Link>
          </Button>
        </div>
        <div className="grid place-content-center">
          <div className="w-40 h-40 md:w-96 md:h-96 bg-muted rounded-full"></div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="py-32 px-2 max-w-6xl mx-auto flex flex-col-reverse md:flex-row justify-center items-center gap-20 md:gap-10">
        <div className="grid place-content-center">
          <div className="w-40 h-40 md:w-96 md:h-96 bg-muted rounded-full"></div>
        </div>
        <div>
          <span className="text-primary text-sm font-semibold">Meet {config.app.name}</span>
          <h2 className="mt-2 max-w-lg font-semibold text-4xl leading-snug md:text-5xl md:leading-tight">
            Start your Stellar journey here
          </h2>
          <p className="pt-5 max-w-md leading-loose">
            Unlock the power of data analytics and gain actionable insights to make informed business decisions.
          </p>
          <div className="max-w-md mt-6">
            <ButtonLead/>
          </div>
          <span className="block pt-4 text-sm text-muted-foreground">14 day trial – No credit card required</span>
        </div>
      </section>

      {/* Section 5 */}
      <section className="py-32 px-2 lg:mx-2 flex flex-col justify-center items-center gap-4 bg-muted lg:rounded-2xl">
        <span className="text-primary text-sm font-semibold">Powerful Features</span>
        <h2 className="max-w-xl text-center font-semibold text-4xl leading-relaxed md:text-6xl md:leading-[1.475]">
          Our product has these big{" "}
          <span className="px-4 py-1 bg-gradient-to-b from-primary to-purple-400 text-primary-foreground rounded-full border border-secondary select-none">features</span> 
        </h2>
        <div className="max-w-6xl pt-10 flex flex-row flex-wrap items-center justify-center gap-6">
            <div className="max-w-xs">
              <h3 className="font-semibold text-xl md:text-2xl leading-[1.475]">Beautiful Design</h3>
              <p className="pt-5 max-w-md leading-loose text-sm text-muted-foreground">
                Gain a competitive edge with our SEO optimization tools, ensuring your website ranks
              </p>
            </div>
            <div className="max-w-xs">
              <h3 className="font-semibold text-xl md:text-2xl leading-[1.475]">Clean Development</h3>
              <p className="pt-5 max-w-md leading-loose text-sm text-muted-foreground">
                Unlock the power of data analytics and gain actionable insights to make informed decisions.
              </p>
            </div>
            <div className="max-w-xs">
              <h3 className="font-semibold text-xl md:text-2xl leading-[1.475]">Easily Customised</h3>
              <p className="pt-5 max-w-md leading-loose text-sm text-muted-foreground">
                From content creation and deployment to performance monitoring and optimization
              </p>
            </div>
        </div>
      </section>

      {/* Section 6 */}
      <section className="py-32 px-2 max-w-6xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-10">
        <div>
          <span className="block w-full text-center md:text-start text-primary text-sm font-semibold">Our Key Features</span>
          <h2 className="mt-2 max-w-xl font-semibold text-center md:text-start text-4xl md:text-5xl md:leading-tight">
            Build a solution that wins you more customers
          </h2>
          <ul className="mt-8 py-8 flex flex-col md:flex-row md:flex-wrap items-center gap-8">
            <li className="flex flex-col gap-2 max-w-xs">
              <div className="w-10 h-10 grid place-content-center border border-border rounded-full">
                <CheckCircle className="w-4 text-primary"/>
              </div>
              <h3 className="text-lg font-semibold">Deploy faster together</h3>
              <p className="text-muted-foreground">Gain a competitive edge with our SEO optimization tools</p>
            </li>
            <li className="flex flex-col gap-2 max-w-xs">
              <div className="w-10 h-10 grid place-content-center border border-border rounded-full">
                <CheckCircle className="w-4 text-primary"/>
              </div>
              <h3 className="text-lg font-semibold">Beautiful No-Code</h3>
              <p className="text-muted-foreground">Enhance your website&apos;s visibility and drive targeted traffic</p>
            </li>
            <li className="flex flex-col gap-2 max-w-xs">
              <div className="w-10 h-10 grid place-content-center border border-border rounded-full">
                <CheckCircle className="w-4 text-primary"/>
              </div>
              <h3 className="text-lg font-semibold">Good Communication</h3>
              <p className="text-muted-foreground">Experience the Stellar difference and unlock the true potential</p>
            </li>
            <li className="flex flex-col gap-2 max-w-xs">
              <div className="w-10 h-10 grid place-content-center border border-border rounded-full">
                <CheckCircle className="w-4 text-primary"/>
              </div>
              <h3 className="text-lg font-semibold">Easily Customised</h3>
              <p className="text-muted-foreground">From content creation and deployment to performance</p>
            </li>
          </ul>
        </div>
        <div className="grid place-content-center">
          <div className="w-40 h-40 md:w-96 md:h-96 bg-muted rounded-full"></div>
        </div>
      </section>

      {/* Section 7 */}
      <section className="py-32 px-2 max-w-6xl mx-auto flex flex-col justify-center items-center gap-4">
        <span className="text-primary text-sm font-semibold">Our Primary Integrations</span>
        <h2 className="max-w-xl text-center font-semibold text-4xl md:text-5xl md:leading-[1.475]">
          Make productivity easier with{" "}
          <span className="text-primary">50+ Integrations</span>
        </h2>
        <div className="px-4 lg:px-6 w-full max-w-6xl py-10 flex flex-row flex-wrap justify-between gap-6">
          <div>Image 1</div>
          <div>Image 1</div>
          <div>Image 1</div>
          <div>Image 1</div>
        </div>
        <p className="text-center max-w-2xl font-medium text-muted-foreground">
          Gain a competitive edge with our SEO optimization tools, ensuring your website ranks higher, attracts more visitors, and generates leads like never before.
        </p>
        <Button variant={"outline"} size={"lg"} className="mt-6 py-6 rounded-full" asChild>
          <div className="flex items-center gap-2">
            <Link href={"/auth/login"}>See Integrations</Link>
            <ArrowRight className="w-4"/>
          </div>
        </Button>
      </section>
      
      {/* Section 8 */}
      <Testimonial/>

      {/* Section 9 */}
      <EmailCollector/>

    </>
  )
}
