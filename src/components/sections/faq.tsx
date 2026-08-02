import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/reveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
}

export function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as FaqItem[];

  return (
    <section className="section-padding bg-background">
      <div className="container-page max-w-3xl">
        <Reveal className="text-center">
          <span className="text-eyebrow">{t('sectionLabel')}</span>
          <h2 className="mt-4 font-heading text-3xl font-medium leading-tight text-primary md:text-4xl">{t('headline')}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-12">
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
