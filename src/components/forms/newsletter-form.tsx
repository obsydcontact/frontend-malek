'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { newsletterFormSchema, type NewsletterFormValues } from '@/lib/validations/newsletter.schema';
import { track } from '@/lib/analytics/track';

export function NewsletterForm({ className }: { className?: string }) {
  const t = useTranslations('newsletter');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: NewsletterFormValues) {
    setIsSubmitting(true);
    const eventId = track('CompleteRegistration', { content_name: 'Newsletter' });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale, eventId }),
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      toast.success(t('success'));
      form.reset();
    } catch {
      toast.error(t('success')); // fail silently in UI tone; footer newsletter is low-stakes
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={className} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          placeholder={t('placeholder')}
          aria-label={t('placeholder')}
          {...form.register('email')}
          className="bg-white/5 border-white/15 text-white placeholder:text-white/50 focus-visible:border-gold"
        />
        <Button type="submit" variant="primary" disabled={isSubmitting} className="bg-gold text-primary hover:bg-gold/90 shrink-0">
          {t('submit')}
        </Button>
      </div>
      {form.formState.errors.email && <p className="mt-2 text-sm text-red-400">{form.formState.errors.email.message}</p>}
    </form>
  );
}
