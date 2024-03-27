/* NEXT */
import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  const host = headersList.get('host') as string;

  /* Production environment must be https:// */
  const domain = "https://" + host;

  return {
    rules: {
      userAgent: "*",
      disallow: ["/legal/", "/api/", "/_next/"],
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}