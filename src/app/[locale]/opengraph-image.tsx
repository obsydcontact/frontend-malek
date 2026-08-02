import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Dynamically generated OG image for the homepage per locale — falls back
 * to /images/og/og-default.jpg on other routes via generateMetadata.
 * See docs/10-seo-strategy.md § Open Graph.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#111111',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 28, color: '#C9A76A', letterSpacing: 4, textTransform: 'uppercase' }}>
          {locale === 'fr' ? 'Coaching Sportif — Lausanne' : 'Fitness Coaching — Lausanne'}
        </div>
        <div style={{ fontSize: 72, color: '#FFFFFF', fontWeight: 600, marginTop: 24 }}>COACH MALEK</div>
        <div style={{ fontSize: 32, color: '#F7F7F4', marginTop: 24, maxWidth: 900 }}>{t('tagline')}</div>
      </div>
    ),
    { ...size }
  );
}
