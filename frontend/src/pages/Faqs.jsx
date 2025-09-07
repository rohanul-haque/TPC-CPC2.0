import { faqs } from "@/assets/assets";
import SectionTitle from "@/components/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = () => {
  return (
    <section className="mt-6">
      <SectionTitle
        title="❓ Our FAQs"
        paragraph="💡 Frequently Asked Questions — here we’ve answered the most common queries to help you quickly understand. ✨ If your question isn’t listed, feel free to reach out to us! 📬"
      />

      <div className="rounded-lg border border-gray-400/50 dark:border-gray-700 backdrop-blur-md p-8">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className={"text-lg"}>
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-base">
                <p>{faq.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faqs;
