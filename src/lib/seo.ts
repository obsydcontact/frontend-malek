import { siteConfig } from './constants';

/** LocalBusiness schema shared by the homepage and contact page. See docs/10-seo-strategy.md. */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    image: `${siteConfig.url}/images/og/og-default.jpg`,
    url: siteConfig.url,
    telephone: `+${siteConfig.whatsappNumber}`,
    priceRange: '150+ CHF',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue Example 1', // [[TODO: confirm real street address]]
      addressLocality: 'Lausanne',
      postalCode: '1000', // [[TODO: confirm real postal code]]
      addressCountry: 'CH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.5197,
      longitude: 6.6323,
    },
    areaServed: ['Lausanne', 'Switzerland'],
    sameAs: [siteConfig.instagramUrl],
  };
}

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Coach Malek',
    jobTitle: 'Fitness & Nutrition Coach',
    image: `${siteConfig.url}/images/about/coach-portrait.jpg`,
    worksFor: { '@type': 'LocalBusiness', name: siteConfig.name },
  };
}

export function getFaqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getServiceSchema(service: { title: string; hook: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    description: service.hook,
    provider: { '@type': 'LocalBusiness', name: siteConfig.name },
    areaServed: ['Lausanne', 'Switzerland'],
    url: `${siteConfig.url}/services/${service.slug}`,
  };
}
