/* NEXT */
import type { Metadata } from 'next';

/* CONFIG */
import { config } from '@/config';

/* NODE_ENV */
const nodeEnvironment = process.env.NODE_ENV;

/* domain */
const domain = config.url.frontend[nodeEnvironment];

const { seo: seoAttributes , social_media } = config.marketing;

const default_title = seoAttributes.title;
const default_description = seoAttributes.description;

interface IDefaultMetadataProps{
  title?: string, 
  description?: string,
}

const defaultMetadata= ( data?: IDefaultMetadataProps ): Metadata => {

  const title = data?.title ?? default_title; 
  const description = data?.description ?? default_description; 

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: domain,
      title,
      description,
      siteName: title,
    },
    twitter: {
      card: "summary_large_image",
      site: domain,
      creator: `${social_media.x.username}`,
      title,
      description,
    },
    metadataBase: new URL(domain),
    alternates:{
      canonical: '/',
    },
    category: seoAttributes.category,
    keywords: seoAttributes.keywords,
  }
}

/**
 * Generate SEO metadata for a web page.
 *
 * @param metadata - Metadata object containing SEO information.
 * @returns Merged metadata with default values.
 */
export const seo = ( metadata?: Metadata ): Metadata => {

  // If no metadata is provided, return default values
  if(!metadata) return defaultMetadata();

  const { title, description, ...props } = metadata;

  // Merge the provided metadata with default values
  return {
    ...defaultMetadata({
      title: title as string | undefined, 
      description: description as string | undefined,
    }),
    ...props,
  }

} 