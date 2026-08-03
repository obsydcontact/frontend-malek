import { defineRouting } from 'next-intl/routing';

// See docs/11-i18n-plan.md — locale is always prefixed (never hidden for
// the default locale) to keep hreflang/canonical logic unambiguous.
export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  // Without this, next-intl redirects "/" based on the visitor's browser
  // Accept-Language header, which sends English-browser visitors to /en
  // even though the site's intended default (Swiss/Lausanne audience) is
  // always French. The language switcher still lets anyone pick English.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
