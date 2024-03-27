/* LIBRARIES */
import { Thing, WithContext } from "schema-dts"

/* COMPONENT */
interface IProps<T extends Thing>{
  jsonLd: WithContext<T>
}

export const SchemaRichSnippet = <T extends Thing>( { jsonLd }: IProps<T> ) => {
  return (
    <section>
      {/* Add JSON-LD to your page //https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
