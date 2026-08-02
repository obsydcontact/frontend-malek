'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations/contact.schema';
import { track } from '@/lib/analytics/track';
import { getClickIds, getUtmParams } from '@/lib/analytics/click-ids';

const GOAL_KEYS = [
  'weight_loss',
  'muscle_building',
  'body_recomposition',
  'online_coaching',
  'personal_training',
  'nutrition_coaching',
  'other',
] as const;

export function ContactForm() {
  const t = useTranslations('contactForm');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      goal: 'other',
      message: '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);

    // Fire the browser pixel Lead event first and reuse its event_id for
    // the server CAPI mirror call — see docs/05-tracking-pixels-and-capi.md.
    const eventId = track('Lead', { content_name: 'Contact Form' });

    const clickIds = getClickIds();
    const utm = getUtmParams();

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          phone: values.phone || undefined,
          message: values.message || undefined,
          source: 'contact_form',
          locale,
          eventId,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
          ...utm,
          ...clickIds,
        }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.error ?? 'Unknown error');

      setIsSubmitted(true);
      toast.success(t('successTitle'), { description: t('successBody') });
      form.reset();
    } catch {
      toast.error(t('errorTitle'), { description: t('errorBody') });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-[20px] border border-gold/30 bg-gold/5 p-8 text-center" role="status">
        <p className="font-heading text-xl font-medium text-primary">{t('successTitle')}</p>
        <p className="mt-2 text-gray">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('firstName')}</FormLabel>
                <FormControl>
                  <Input autoComplete="given-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('lastName')}</FormLabel>
                <FormControl>
                  <Input autoComplete="family-name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phone')}</FormLabel>
                <FormControl>
                  <Input type="tel" autoComplete="tel" placeholder="+41 79 123 45 67" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('goalLabel')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('goalPlaceholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GOAL_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {t(`goals.${key}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('message')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('messagePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </form>
    </Form>
  );
}
