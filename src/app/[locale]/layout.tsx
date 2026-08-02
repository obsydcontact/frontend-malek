import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { clashDisplay, inter } from '@/lib/fonts';
import { siteConfig } from '@/lib/constants';
import { SmoothScrollProvider } from '@/components/motion/smooth-scroll-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollProgressBar } from '@/components/layout/scroll-progress-bar';
import { WhatsappButton } from '@/components/layout/whatsapp-button';
import { PixelLoaderMount } from '@/components/analytics/pixel-loader-mount';
import { Toaster } from '@/components/ui/sonner';
import { JsonLd } from '@/components/seo/json-ld';
import { getLocalBusinessSchema } from '@/lib/seo';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('defaultTitle'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('defaultDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        fr: `${siteConfig.url}/fr`,
        en: `${siteConfig.url}/en`,
        'x-default': `${siteConfig.url}/fr`,
      },
    },
    openGraph: {
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      url: `${siteConfig.url}/${locale}`,
      siteName: t('siteName'),
      locale: locale === 'fr' ? 'fr_CH' : 'en_CH',
      images: [{ url: '/images/og/og-default.jpg', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: ['/images/og/og-default.jpg'],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${clashDisplay.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans text-primary">
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
            Skip to main content
          </a>
          <JsonLd data={getLocalBusinessSchema()} />
          <SmoothScrollProvider>
            <PixelLoaderMount />
            <ScrollProgressBar />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <WhatsappButton />
            <Toaster />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
