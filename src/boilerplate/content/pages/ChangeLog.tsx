/* NEXT */
import Link from "next/link";
import Image from "next/image";

/* CONFIG */
import { config } from "@/config";

/* LIBRARIES */
import { ChevronLeft } from "lucide-react";

/* BOILERPLATE */
import { allChangelogPosts } from "contentlayer/generated";
import { formatDateFromTimestamp } from "@/lib/date";
import { ButtonLead, ThemeToggle } from "@/boilerplate/shared/components";

/* FOLDER */
import { MDX } from "@/boilerplate/content/components/MDX";

/* SHADCN */
import { Button } from "@/shadcn/ui/button";

/* COMPONENT */
export const ChangeLogPage = async ( ) => {

  const articles = allChangelogPosts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <main className="w-full flex flex-col lg:flex-row ">

      {/* Hero */}
      <div className="p-4 lg:p-0 w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex justify-center items-center lg:border-r-2 lg:border-solid lg:border-card">
        <Button variant={"outline"} size={"default"} className="absolute top-8 lg:top-16 left-8 lg:left-16" asChild>
          <Link href={'/'} className="flex items-center gap-2">
            <ChevronLeft className="w-4"/>
            <span>Back</span>
          </Link>
        </Button>
        <div className="z-10 my-20 flex flex-col gap-4">
          <span className="text-base font-medium">- Changelog</span>
          <h1 className="text-3xl max-w-md font-semibold leading-snug">
            <span>All the latest updates, improvements, and fixes to{' '}</span>
            <span className=" relative whitespace-nowrap">
              <span className="absolute bg-primary -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
              <span className="relative text-primary-foreground">{config.app.name}</span>
            </span>
          </h1>
          <ButtonLead/>
        </div>
        <SVGTimeLine/>
      </div>

      {/* Changelog */}
      <div className="z-10 relative py-20 lg:py-32 w-full lg:w-1/2 max-w-lg mx-auto lg:max-w-none flex flex-col gap-20 bg-background">

        <div className="hidden lg:flex absolute top-8 lg:top-16 right-8 lg:right-16">
          <ThemeToggle/>
        </div>

          { 
            articles.map( article => {
              const publishedDay = formatDateFromTimestamp(new Date(article.publishedAt).getTime());
              return (
                <div key={article.metadata.slug} className="flex flex-col lg:flex-row">
                  <div className="px-4 lg:p-0 lg:relative -left-[90px]">
                    <div className="sticky top-3 flex items-center flex-row gap-2 select-none">
                      <time dateTime={article.publishedAt} className="text-xs text-gray-500 font-semibold whitespace-nowrap">
                        {publishedDay.month}{' '}{new Date(article.publishedAt).getDate()}, {new Date(article.publishedAt).getFullYear()}
                      </time>
                      <div className="h-[0.0625rem] w-3.5 bg-gray-400 lg:-mr-3.5 xl:mr-0"></div>
                    </div>
                  </div>
                  <article className="p-4 lg:p-0 lg:pr-10 xl:pr-20 max-w-none lg:max-w-md xl:max-w-xl flex flex-col gap-6 ">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={500}
                      height={500}
                      priority={false}
                      className="w-full h-64 object-cover rounded-xl select-none shadow-md"
                    />
                    <h2 className="mb-4 text-3xl font-semibold">{article.title}</h2>
                    <MDX code={article.body.code}/>
                  </article>
                </div>
              )
            })
          }

        </div>
    </main>
  )
}


const SVGTimeLine = () => {
  return (
    <>
      <svg className="hidden lg:flex absolute left-[max(0px,calc(50%-18.125rem))] top-0 h-full w-1.5 lg:left-full lg:ml-1 xl:left-auto xl:right-1 xl:ml-0" aria-hidden="true">
        <defs><pattern id=":R1t6:" width="6" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0H6M0 8H6" className="stroke-black/40 dark:stroke-white/10 " fill="none"></path>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#:R1t6:)"></rect>
      </svg>
    </>
  )
}
