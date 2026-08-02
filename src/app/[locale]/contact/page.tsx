import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Mail, MessageCircle, Phone, Instagram, MapPin, Clock } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { ContactForm } from '@/components/forms/contact-form';
import { JsonLd } from '@/components/seo/json-ld';
import { getBreadcrumbSchema, getLocalBusinessSchema } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { formatPhoneDisplay } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'fr' ? 'Contact | Coach Malek Coach Sportif Lausanne' : 'Contact | Coach Malek Fitness Coach Lausanne';
  const description =
    locale === 'fr'
      ? 'Contactez Coach Malek pour une consultation gratuite : WhatsApp, email, ou formulaire de contact.'
      : 'Get in touch with Coach Malek for a free consultation: WhatsApp, email, or contact form.';
  return { title, description, alternates: { canonical: `${siteConfig.url}/${locale}/contact` } };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  const tWhatsapp = await getTranslations({ locale, namespace: 'whatsapp' });

  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(tWhatsapp('defaultMessage'))}`;

  return (
    <div className="pt-20">
      <JsonLd data={getLocalBusinessSchema()} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/${locale}` },
          { name: 'Contact', url: `${siteConfig.url}/${locale}/contact` },
        ])}
      />

      <section className="section-padding">
        <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h1 className="font-heading text-4xl font-medium leading-tight text-primary md:text-5xl">{t('headline')}</h1>
            <p className="mt-4 text-gray">{t('subhead')}</p>

            <dl className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 text-gold" strokeWidth={1.5} />
                <div>
                  <dt className="text-sm font-medium text-primary">{t('emailLabel')}</dt>
                  <dd>
                    <a href={`mailto:${siteConfig.email}`} className="text-gray hover:text-gold">
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 text-gold" strokeWidth={1.5} />
                <div>
                  <dt className="text-sm font-medium text-primary">{t('phoneLabel')}</dt>
                  <dd>
                    <a href={`tel:+${siteConfig.whatsappNumber}`} className="text-gray hover:text-gold">
                      {formatPhoneDisplay(siteConfig.whatsappNumber)}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle className="mt-1 h-5 w-5 text-gold" strokeWidth={1.5} />
                <div>
                  <dt className="text-sm font-medium text-primary">{t('whatsappLabel')}</dt>
                  <dd>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-gray hover:text-gold">
                      {formatPhoneDisplay(siteConfig.whatsappNumber)}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="mt-1 h-5 w-5 text-gold" strokeWidth={1.5} />
                <div>
                  <dt className="text-sm font-medium text-primary">{t('instagramLabel')}</dt>
                  <dd>
                    <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray hover:text-gold">
                      @awmalek.coaching
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-gold" strokeWidth={1.5} />
                <div>
                  <dt className="text-sm font-medium text-primary">{t('addressLabel')}</dt>
                  <dd className="text-gray">{siteConfig.studioAddress}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 text-gold" strokeWidth={1.5} />
                <div>
                  <dt className="text-sm font-medium text-primary">{t('hoursLabel')}</dt>
                  <dd className="text-gray">{t('hours')}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-[20px] border border-border">
              <iframe
                title="Coach Malek studio location on Google Maps"
                src={siteConfig.googleMapsEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-[20px] border border-border bg-white p-8 shadow-soft md:p-10">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
