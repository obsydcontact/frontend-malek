'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button, type ButtonProps } from '@/components/ui/button';
import { track } from '@/lib/analytics/track';
import { siteConfig } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface BookingCtaProps extends ButtonProps {
  children: React.ReactNode;
  /** Where this CTA lives, for debugging which section drives bookings. */
  location?: string;
}

/**
 * The single reusable "Book Free Consultation" component used across every
 * CTA instance on the site (10+ per docs/02-content-and-copy.md). Fires a
 * Lead-intent tracking event on click, then opens the Calendly booking
 * modal. See docs/03-architecture.md § Component architecture rules.
 */
export function BookingCta({ children, location = 'unknown', className, variant, size, ...props }: BookingCtaProps) {
  const t = useTranslations('booking');
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    track('Contact', { content_name: 'Booking CTA', location });
    setOpen(true);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={cn(className)} onClick={handleOpen} {...props}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle>{t('dialogTitle')}</DialogTitle>
          <DialogDescription>{t('dialogDescription')}</DialogDescription>
        </DialogHeader>
        <div className="h-[70vh] w-full px-2 pb-2">
          {open && (
            <iframe
              src={siteConfig.calendlyUrl}
              title={t('dialogTitle')}
              className="h-full w-full rounded-[16px] border-0"
              loading="lazy"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
