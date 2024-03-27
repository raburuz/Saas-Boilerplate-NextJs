/* NEXT */
import Link from "next/link"

/* SHADCN */
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card"
import { Separator } from "@/shadcn/ui/separator"

/* BOILERPLATE */
import { MagicBorder } from "@/boilerplate/shared/components";

/* CONFIG */
import { config } from "@/config"

/* Content Link */

const links = [
  {
    href: "/blog",
    title: "Blog",
    text: `Latest news, articles and updates from ${config.app.name }`, 
  },
  {
    href: "/docs",
    title: "Docs",
    text: `Getting started you next project with ${config.app.name }`, 
  },
  {
    href: "/changelog",
    title: "Changelog",
    text: `All the latest news and updates from ${config.app.name }`, 
  },
] as const;

export const ContentPage = () => {
  return (
    <>
      <div className="max-w-6xl flex flex-col gap-2">
        <div className="my-20 flex flex-col">
          <h1 className="font-semibold text-5xl leading-[1.475]">Content</h1>
          <p className="pt-5 max-w-md leading-loose">Discover our blog, changelog and docs from {config.app.name }</p>
        </div>

        <Separator className="w-full bg-secondary"/>

        <div className="my-10 flex flex-row flex-wrap gap-10">

          {
            links.map((data)=>(
              <Link key={data.href} href={data.href} className="w-full sm:max-w-xs p-1 border border-input dark:border-card rounded-lg shadow-lg hover:shadow-md overflow-hidden duration-200 hover:scale-[1.01]">
                <MagicBorder>
                  <Card className="border-0 rounded-md">
                    <CardHeader>
                      <h2 className="font-semibold text-xl leading-[1.475]">{data.title}</h2>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-loose">{data.text}</p>
                    </CardContent>
                  </Card>
                </MagicBorder>
              </Link>

            ))
          }

        </div>

      </div>
    </>
  )
}
