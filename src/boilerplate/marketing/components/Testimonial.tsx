/* NEXT */
import Image from "next/image"

/* COMPONENT */
export const Testimonial = () => {
  return (
    <>
      <section className="py-32 px-2 lg:mx-2 flex flex-col justify-center items-center gap-4 bg-muted lg:rounded-2xl">
        <span className="text-primary text-sm font-semibold">Our customers</span>
        <h2 className="max-w-xl text-center font-semibold text-4xl md:text-6xl md:leading-snug">
          See what our customers are saying
        </h2>
        {/* List */}
        <ul className="max-w-6xl pt-10 flex flex-row flex-wrap items-center justify-center gap-6">
          <li className="p-1 bg-background rounded-2xl">
            <div className="p-6 max-w-xs bg-background rounded-xl border border-border">
              <p className="max-w-md leading-loose text-sm text-muted-foreground">
                Gain a competitive edge with our SEO optimization tools, ensuring your website ranks
              </p>
              <div className="mt-5 flex flex-row items-center gap-4">
                <div>
                  <Image
                    alt="User image"
                    src={"http://localhost:3000/image.jpg"}
                    width={100}
                    height={100}
                    className="w-12 h-12 border-2 border-solid border-background rounded-full object-cover select-none pointer-events-none"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm">Jean Pablo</span>
                  <span className="text-primary text-xs">@arkift</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    
    </>
  )
}
