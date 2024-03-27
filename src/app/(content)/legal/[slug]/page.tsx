/* NEXT */
import { Metadata } from "next";
import { notFound } from "next/navigation";

/* BOILERPLATE */
import { seo } from "@/lib/seo";
import { LegalPostPage } from "@/boilerplate/content";
import { allLegalPosts } from "contentlayer/generated";

/* CONFIG */
import { config } from "@/config";

//Params interface
interface IProps {
  params: {
    slug: string | null
  }
}

/* DYNAMIC DATA */
export async function generateStaticParams() {
  return allLegalPosts.map((post) => ({
    slug: post.metadata.slug,
  }));
}

export async function generateMetadata( { params }: IProps ): Promise<Metadata> {
  
  const doc = allLegalPosts.find((doc) => doc.metadata.slugAsParams === params.slug);
  
  if (!doc) return {};
  
  const { title } = doc;

  return seo({
    title: `${title} | ${config.app.domain}`,
    robots: {
      index:false,
      follow:false,
    }
  })
}

/* COMPONENT */
export default async function Page( { params }: IProps ) {

  const doc = allLegalPosts.find((doc) => doc.metadata.slugAsParams === params.slug);
  
  if(!doc) notFound();

  return (
    <>
      <LegalPostPage doc={doc}/>
    </>
  )
}