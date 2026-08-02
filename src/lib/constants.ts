export const siteConfig = {
  name: 'Coach Malek',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://awmalek.ch',
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/aouissaouimalek98/30min',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '41766879555',
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/awmalek.coaching',
  studioAddress: process.env.NEXT_PUBLIC_STUDIO_ADDRESS ?? 'Rue Example 1, 1000 Lausanne, Switzerland',
  googleMapsEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL && process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL !== 'REPLACE_ME'
      ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL
      : 'https://www.google.com/maps?q=Lausanne,Switzerland&output=embed',
  email: 'contact@awmalek.ch',
};

export const navItems = [
  { key: 'services', href: '/services' },
  { key: 'about', href: '/about' },
  { key: 'transformations', href: '/transformations' },
  { key: 'pricing', href: '/pricing' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

export const serviceSlugs = [
  'personal-training',
  'online-coaching',
  'nutrition-coaching',
  'body-recomposition',
  'weight-loss',
  'muscle-building',
] as const;

export const blogPillars = ['weight-loss', 'nutrition', 'healthy-lifestyle', 'muscle-building', 'swiss-fitness-tips', 'meal-prep'] as const;
