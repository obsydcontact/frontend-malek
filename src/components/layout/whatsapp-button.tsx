'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/constants';
import { track } from '@/lib/analytics/track';

/**
 * Floating WhatsApp button, present on every page. Fires a Contact
 * tracking event (browser pixel + will be mirrored server-side once the
 * backend also receives a corresponding /api/leads call, if the coach
 * wants full CAPI parity for this channel later — see docs/12).
 */
export function WhatsappButton() {
  const t = useTranslations('whatsapp');
  const message = encodeURIComponent(t('defaultMessage'));
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('ariaLabel')}
      onClick={() => track('Contact', { content_name: 'WhatsApp Floating Button' })}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg transition-transform duration-200 ease-premium hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={1.75} fill="currentColor" />
    </a>
  );
}
