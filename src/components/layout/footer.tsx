import { useTranslations } from 'next-intl';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { navItems, siteConfig } from '@/lib/constants';
import { NewsletterForm } from '@/components/forms/newsletter-form';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-page section-padding">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-heading text-2xl font-semibold">COACH MALEK</p>
            <p className="mt-3 max-w-sm text-white/60">{t('tagline')}</p>
            <p className="mt-8 max-w-sm text-sm text-white/70">{t('newsletterHeadline')}</p>
            <NewsletterForm className="mt-4 max-w-sm" />
          </div>

          <div>
            <p className="text-eyebrow text-gold">{t('quickLinks')}</p>
            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="text-white/70 transition-colors hover:text-white">
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow text-gold">{t('legal')}</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-white/70 transition-colors hover:text-white">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 transition-colors hover:text-white">
                  {t('terms')}
                </Link>
              </li>
            </ul>

            <div className="mt-8 flex gap-4">
              <a
                href={`tel:+${siteConfig.whatsappNumber}`}
                aria-label="Phone"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-white/50">
          © {year} Coach Malek. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
