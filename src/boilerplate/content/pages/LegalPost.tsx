/* LIBRARIES */
import { LegalPost } from "contentlayer/generated"

/* FOLDER */
import { MDX } from "@/boilerplate/content/components/MDX"

/* COMPONENT */
interface IProps {
  doc: LegalPost 
}

export const LegalPostPage = ( { doc }: IProps ) => {
  return (
    <div className="py-20 flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{doc.title}</h1>
      <MDX code={doc.body.code}/>
      <span>Last updated at: {doc.updatedAt}</span>
    </div>
  )
}
