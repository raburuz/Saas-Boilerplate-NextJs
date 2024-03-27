/* NEXT */
import Link from "next/link"
import Image from "next/image"

/* LIBRARIES */
import { ArrowUpRightSquare } from "lucide-react";

/* SHADCN */
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card"

/* BOILERPLATE */
import { BlogPost } from "contentlayer/generated";

/* COMPONENT */
interface IProps {
  article: BlogPost
}

export const BlogCard = ( { article }: IProps ) => {
  return (
    <Link href={article.metadata.slug}>
      <Card className="p-0 w-full h-96 flex flex-col justify-between max-w-[18rem] overflow-hidden duration-200 hover:scale-[1.01] shadow-lg hover:shadow-md hover:border-secondary ">
        {/* HEADER */}
        <CardHeader className="p-0 rounded-t-xl">
          <Image
            src={article.image}
            alt={article.title}
            width={500}
            height={500}
            className="rounded-t-xl select-none object-cover w-full h-48"
            />
        </CardHeader>
        {/* CONTENT */}
        <CardContent className="p-4 flex flex-col gap-6 antialiased">
          <h2 className="font-semibold">{article.title}</h2>
          <p className="text-sm text-muted-foreground">{article.summary}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">by {article.author}</span>
            <ArrowUpRightSquare className="w-4 text-primary"/>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
