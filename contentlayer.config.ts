/* LIBRARIES */
import { defineDocumentType, makeSource } from "contentlayer/source-files";

/* LIBRARIES */
import GithubSlugger from 'github-slugger'

/* LIBRARIES: MDX PLUGINS */
import remarkGfm from "remark-gfm"
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from "rehype-autolink-headings"


import { getNumberFromString, replaceNumberPattern } from "./src/lib/contentlayer";

/* You can see docs in https://contentlayer.dev/ */
export const BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `**/blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: true,
    },
    author: {
      type: "string",
      required: true,
    },
    authorImage: {
      type: "string",
      required: true,
    }
  },
  // @ts-ignore
  computedFields: computedFields(),
}));


const ChangelogPost = defineDocumentType(() => ({
  name: "ChangelogPost",
  filePathPattern: `**/changelog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: true,
    },
  },
  // @ts-ignore
  computedFields: computedFields(),
}));

const DocsPost = defineDocumentType(() => ({
  name: "DocPost",
  filePathPattern: `**/docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    tag: {
      type: "string",
      require: false,
    },
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    updatedAt: {
      type: "string",
      required: true,
    },
  },
  // @ts-ignore
  computedFields: computedFields(),
}));

const LegalPost = defineDocumentType(() => ({
  name: "LegalPost",
  filePathPattern: `**/legal/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    updatedAt: {
      type: "string",
      required: true,
    },
  },
  // @ts-ignore
  computedFields: computedFields(),
}));


const computedFields = () => ({
  metadata: {
    type: "{ slug:string, slugAsParams:string, order:string }",
    resolve: ( doc: any ) => {

      const path = replaceNumberPattern(doc._raw.flattenedPath);
      const order = getNumberFromString(doc._raw.flattenedPath);
      
      return {
        order,
        slug: '/' + path,
        slugAsParams: path.split("/").slice(1).join("/"),
      }
    }
  },
  headings: {
    type: "{ heading: number, text: string, slug: string }[]",
    resolve: async (doc: any) => {
      // use same package as rehypeSlug so toc and sluggified headings match
      // https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
      const slugger = new GithubSlugger()

      // https://stackoverflow.com/a/70802303
      const regXHeader = /(?<flag>#{1,6})\s+(?<content>.+)/g

      const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
        ({ groups }: any) => {

          const flag = groups?.flag
          const content = groups?.content
          return {
            heading: flag?.length,
            text: content,
            slug: content ? slugger.slug(content) : '',
          }
        },
      )

      return headings
    },
  },
});

export default makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost, ChangelogPost, DocsPost, LegalPost],
  //PLUGINS
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node:any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node:any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node:any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});