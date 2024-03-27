/* React */
import { Fragment } from "react"

/* NEXT */
import Link from "next/link"

/* LIBRARIES */
import { AlignLeft, ChevronRight } from "lucide-react"

/* BOILERPLATE */
import { DocPost } from "contentlayer/generated"
import { MDX } from "@/boilerplate/content/components/MDX"
import { cn } from "@/lib/utils"

/* COMPONENT */
interface IProps {
  doc: DocPost 
}

export const DocsPost = ( { doc }: IProps ) => {

  const breadcrumb = doc.metadata.slug.split('/').filter(value => value);

  return (
    <main className="flex flex-row justify-center gap-6">

      {/* Content */}
      <div className="w-full lg:w-3/4 mb-10">
        <div className="mb-8 flex flex-col gap-1">
          {/* breadcrumb */}
          <div className="flex flex-row items-center gap-1 text-sm">
            {
              breadcrumb.map((value, index) => {
                const isLastPosition = index === breadcrumb.length - 1;
                 return (
                  <Fragment key={value}>
                    <span data-active={isLastPosition} className="first-letter:uppercase text-muted-foreground data-[active=true]:font-bold">{value}</span>
                    { isLastPosition ? null : <ChevronRight className="w-3 text-primary"/> }
                  </Fragment>
                )
              })
            }
          </div>
          <h1 className="text-4xl font-bold">{doc.title}</h1>
          <p className="mt-2 text-lg text-primary font-semibold">{doc.description}</p>
        </div>
        <MDX code={doc.body.code}/>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:flex flex-col gap-4 w-1/4">
        {
          doc.headings ? (
            <div className="w-full space-y-2 text-sm">
              <div className="flex flex-row items-center gap-2">
                <AlignLeft className="w-4 text-primary"/>
                <div className="text-sm font-medium">On this page</div>
              </div>
              <ul className="flex flex-col gap-2">
                {
                  doc.headings.map( heading => 
                    <li key={heading.slug}>
                      <Link
                        href={`#${heading.slug}`}
                        className={cn(
                          "block text-muted-foreground underline-offset-2 transition-all hover:underline",
                          {
                            "pl-0.5": heading.heading === 2,
                            "pl-2": heading.heading === 3,
                            "pl-3": heading.heading === 4,
                          },
                        )}
                      >
                        {heading.text}
                      </Link>
                    </li>
                  )
                }
              </ul>
            </div>
          ) : null}
      </div>
    </main>
  )
}
