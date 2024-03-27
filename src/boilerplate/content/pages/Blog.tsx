
/* NEXT */
import Link from "next/link";

/* CONFIG */
import { config } from "@/config";

/* SHADCN */
import { Separator } from "@/shadcn/ui/separator";

/* BOILERPLATE */
import { allBlogPosts } from "contentlayer/generated";

/* FOLDER */
import { BlogCard } from "@/boilerplate/content/components/BlogCard";

/* COMPONENT */

export const BlogPage = async ( ) => {

  const articles = allBlogPosts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="px-4 max-w-6xl mx-auto flex flex-col gap-2">

      <div className="my-20 flex flex-col">
        <h1 className="font-semibold text-5xl leading-[1.475]">Blog</h1>
        <p className="pt-5 max-w-md leading-loose">Latest news, articles and updates from {config.app.name }</p>
      </div>

      <Separator className="w-full bg-secondary"/>

      <div className="my-10 flex flex-row flex-wrap gap-10">

        <div className="w-1/5 hidden lg:flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-primary">Articles: </h3>
          <ul className="flex flex-col gap-2">
            { 
              articles.map( article =>
                <li key={article.metadata.slug}>
                  <Link href={article.metadata.slug} className="text-sm hover:underline hover:text-primary">{article.title}</Link>
                </li>
              )
            }
          </ul>
        </div>

        <div className="flex flex-row flex-wrap gap-4">
          { articles.map((article)=>(<BlogCard key={article.metadata.slug} article={article}/>)) }
        </div>
      </div>

    </div>
  )
}
