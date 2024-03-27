/* NEXT */
import Link from 'next/link'

/* BOILERPLATE */
import { allDocPosts } from 'contentlayer/generated';

/* CONFIG */
import { config } from '@/config';
import { Badge } from '@/shadcn/ui/badge';

//interface 
interface NestedLink{
  text?: string,
  href?: string,
  tag?: string;
  order: string,
  folder: string,
  nested: number,
  children: NestedLink[],
}

//Functions
const orderedDocs: NestedLink[] = allDocPosts.sort((a, b) => {
  const orderA = a.metadata.order;
  const orderB = b.metadata.order;

  // Split order values into parts
  const partsA = orderA.split('-');
  const partsB = orderB.split('-');

  // Compare each part numerically
  for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
    const numA = parseInt(partsA[i]);
    const numB = parseInt(partsB[i]);

    if (numA !== numB) {
      return numA - numB;
    }
  }

  // If all parts are equal, shorter prefix comes first
  return partsA.length - partsB.length;
})
.map( doc => {
  return {
    text: doc.title,
    href: doc.metadata.slug,
    order: doc.metadata.order,
    tag: doc.tag,
    folder: doc.metadata.slug.split("/").at(-2) as string,
    nested: 0,
    children: [],
  }
});

const buildNestedStructure = (data: NestedLink[]): NestedLink[] => {

  const nestedMap: NestedLink[] = [];

  data.forEach((item) => {

    const orderParts = item.order.split('-'); // result [ "001", "001", "002"]

    let currentLevel = nestedMap;

    orderParts.forEach((part, index) => {

      //parse part to number
      const n = parseInt(part);
      
      if (!currentLevel[n]) {
        currentLevel[n] = { text: item.folder, nested: orderParts.length - 1, folder: item.folder, order: part, children: [] };
      }

      if (index === orderParts.length - 1) {
        // Last part of the order, add the item to children array
        currentLevel[n] = {...item, nested: orderParts.length  }
      }

      currentLevel = currentLevel[n].children;

    });

  });

  return nestedMap;
}


/* Component */
export const DocsAside = () => {

  const docs = buildNestedStructure(orderedDocs);

  return (
    <div className='sticky top-10 h-[calc(100vh_-_92px)]'>
      <aside className="h-full overflow-y-auto overflow-x-hidden p-4 lg:p-0 lg:w-1/5 min-w-[18rem] lg:max-w-[18rem] lg:flex flex-col border-r border-r-solid border-border lg:border-0">
        <Link href={"/"} className="px-2 lg:hidden text-base font-bold">{config.app.name}</Link>
        <nav className='mr-3'>
          <ul className="pt-6 lg:pt-0 flex flex-col gap-1">
            {
              docs.map((doc)=>(
                <li key={doc.order}>
                  {
                    doc.href ? (
                      <>
                        <Link href={doc.href} className="ml-0.5 my-1 px-2 py-1 flex items-center gap-2 text-sm w-full hover:bg-muted rounded-md font-bold">
                          <span>{doc.text}</span>
                          { doc.tag ? (<Badge variant={"secondary"}>{doc.tag}</Badge>) : null }
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="ml-0.5 my-1 px-2 py-1 block text-sm w-full first-letter:uppercase font-bold">
                          <span>{doc.text}</span>
                          { doc.tag ? (<Badge variant={"secondary"}>{doc.tag}</Badge>) : null }
                        </div>
                      </>
                    )
                  }
                  <Nested doc={doc}/>
                </li>
              ))
            }
          </ul>
        </nav>
      </aside>

    </div>
  )
}

const Nested = ( { doc } : { doc: NestedLink }) => { 
  
  if(doc.children.length === 0) return null;

  return (
    <ul className='ml-2.5 pl-3 border-l border-solid border-muted'>
      {
        doc.children.map((item)=>(
          <li key={item.order}>
            {
              item.href ? (
                <>
                  <Link href={item.href} className="ml-0.5 my-1 px-2 py-1 flex items-center gap-2 text-sm w-full text-muted-foreground hover:bg-muted rounded-md">
                    <span>{item.text}</span>
                    { item.tag ? (<Badge variant={"secondary"}>{item.tag}</Badge>) : null }
                  </Link>
                </>
              ) : (
                <>
                  <div className="ml-0.5 my-1 px-2 py-1 block text-muted-foreground text-sm w-full first-letter:uppercase">
                    <span>{item.text}</span>
                    { item.tag ? (<Badge variant={"secondary"}>{item.tag}</Badge>) : null }
                  </div>
                </>
              )
            }
            <Nested doc={item}/>
        </li>
        ))} 
    </ul>
  )
}

