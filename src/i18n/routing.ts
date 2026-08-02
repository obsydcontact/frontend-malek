import { defineRouting } from 'next-intl/routing';

// See docs/11-i18n-plan.md — locale is always prefixed (never hidden for
// the default locale) to keep hreflang/canonical logic unambiguous.
export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
});

export type AppLocale = (typeof routing.locales)[number];
