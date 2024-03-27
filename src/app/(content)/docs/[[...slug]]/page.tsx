/* NEXT */
import { Metadata } from "next";
import { notFound } from "next/navigation";

/* BOILERPLATE */
import { seo } from "@/lib/seo";
import { DocsPost } from "@/boilerplate/content";
import { allDocPosts } from "contentlayer/generated";

/* CONFIG */
import { config } from "@/config";

//PARAMS interface
interface IProps {
  params: {
    slug: string[] | null
  }
}

/* FUNCTION */
const getDocFromSlug = ( { params }: IProps ) => {

  const slug = params.slug?.join("/") || "";

  const doc = allDocPosts.find((doc) => doc.metadata.slugAsParams === slug);

  if (!doc) return null;

  return doc
}

/* DYNAMIC DATA */
export async function generateStaticParams() {

  return allDocPosts.map((doc) => {
    const slugSegments = doc.metadata.slugAsParams.split('/');
    return {
      slug: slugSegments
    }
  });
}

/* METADATA */
export async function generateMetadata( { params }: IProps ): Promise<Metadata | undefined> {

  const doc = getDocFromSlug({ params });

  if (!doc) return {};

  const { title, description } = doc;

  return seo({
    title: `${title} | ${config.app.domain}`,
    description,
    authors:{
      name: `${config.app.name}`,
    },
    robots: {
      index: true,
      follow: true,
    }
  })
}

/* COMPONENT */
export default function Page( { params }: IProps ) {

  const doc = getDocFromSlug({ params });
  
  if(!doc) notFound();

  return (
    <>
      <DocsPost doc={doc}/>
    </>
  )
}