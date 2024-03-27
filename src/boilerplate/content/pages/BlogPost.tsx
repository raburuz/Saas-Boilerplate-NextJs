/* NEXT */
import Image from "next/image"

/* BOILERPLATE */
import { BlogPost } from "contentlayer/generated"
import { EmailCollector } from "@/boilerplate/marketing"

/* LIBRARIES */
import { formatDateFromTimestamp } from "@/lib/date"

/* SHADCN */
import { Separator } from "@/shadcn/ui/separator"

/* FOLDER */
import { MDX } from "@/boilerplate/content/components/MDX"

/* COMPONENT */
interface IProps {
  article: BlogPost
}

export const BlogPostPage = ( { article }: IProps ) => {

  const publishedDay = formatDateFromTimestamp(new Date(article.publishedAt).getTime());

  return (
    <>
      <article>

        <section className="py-20 px-2 max-w-6xl mx-auto flex flex-col justify-center items-center ">
          <span className="text-primary text-sm font-semibold">Blog Article</span>
          <h1 className="max-w-2xl text-center font-semibold text-4xl leading-relaxed md:text-6xl md:leading-[1.475]">
            {article.title}
          </h1>
          <p className="mt-5 text-center max-w-md font-medium text-muted-foreground">{article.summary}</p>
        </section>

        {
          article.image ? (
            <div className="px-1 max-w-2xl mx-auto">
              <Image
                className="object-cover select-none border border-border rounded-md"
                src={article.image}
                alt={`Image from blog article ${article.title}`}
                width={1080}
                height={1080}
              />
            </div>
          ) : null
        }

        <section className="py-10 px-2 max-w-6xl mx-auto flex flex-row justify-around items-center ">

          <div className="flex flex-row items-center justify-center gap-4">
            {
              article.authorImage ? (
                <Image
                  className="w-10 h-10 lg:w-16 lg:h-16 object-cover select-none border border-border rounded-full"
                  src={article.authorImage}
                  alt={`Image from ${article.author}`}
                  width={1080}
                  height={1080}
                />
              ) : null
            }
            <span className="text-lg lg:text-2xl font-semibold first-letter:uppercase">{article.author}</span>
          </div>
          <span className="text-lg lg:text-xl font-medium first-letter:uppercase whitespace-nowrap">{publishedDay.day} {publishedDay.month}</span>

        </section>

        <Separator className="w-full bg-secondary"/>

        {/* Content blog */}
        <div className="px-2 max-w-xl mx-auto mb-10 gap-8 pt-10">
          <MDX code={article.body.code}/>
        </div>
      </article>

      <EmailCollector/>

    </>
  )
}
