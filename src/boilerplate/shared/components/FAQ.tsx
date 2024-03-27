
/* SHADCN */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion"

/* COMPONENT */
interface IProps {
  faqs: {
    question: string, 
    answer: string,
  }[]
}

export const FAQ = ( { faqs }: IProps ) => {
  return (
    <>
      <Accordion className="w-full flex flex-col gap-4" type="single" collapsible>
        {
          faqs.map((faq)=>(
          <AccordionItem key={faq.question} className="p-4 border border-border rounded-lg" value={faq.question}>
            <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
          ))
        }
      </Accordion>
    
    </>
  )
}
