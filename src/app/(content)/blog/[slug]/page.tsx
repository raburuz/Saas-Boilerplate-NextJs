/* NEXT */
import { Metadata } from "next";
import { notFound } from "next/navigation";

/* LIBRARIES */
import type { BlogPosting, WithContext } from 'schema-dts';

/* BOILERPLATE */
import { seo } from "@/lib/seo";
import { BlogPostPage } from "@/boilerplate/content";
import { allBlogPosts } from "contentlayer/generated";
import { SchemaRichSnippet } from "@/boilerplate/shared/components";

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
  return allBlogPosts.map((post) => ({
    slug: post.metadata.slug,
  }));
}

export async function generateMetadata( { params }: IProps ): Promise<Metadata> {

  const article = allBlogPosts.find((article) => article.metadata.slugAsParams === params.slug);

  if (!article) return {};

  const { title, summary, author } = article;

  return seo({
    title: `${title} | ${config.app.domain}`,
    description: summary,
    authors:{
      name: author,
    },
    robots: {
      index:true,
      follow:true,
    }
  })
}


/* COMPONENT */
export default async function Page( { params }: IProps ) {

  const article = allBlogPosts.find((article) => article.metadata.slugAsParams === params.slug);
  
  if(!article) notFound();

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author: {
      "@type": "Person",
      name: article.author,
    },
    dateCreated: new Date(article.publishedAt).toISOString(),
    datePublished: new Date(article.publishedAt).toISOString(),
    headline: article.title,
    image: [ article.image ],
  }

  return (
    <>
      <BlogPostPage article={article}/>
      <SchemaRichSnippet jsonLd={jsonLd} />
    </>
  )
}