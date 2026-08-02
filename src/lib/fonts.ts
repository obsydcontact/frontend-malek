import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

/**
 * Clash Display is self-hosted from /public/fonts (downloaded from
 * Fontshare, free for commercial use — see public/fonts/clash-display/LICENSE.txt).
 * Only Regular/Medium/Semibold are shipped per docs/04-design-system.md
 * (Medium for most headings, Semibold for rare emphasis).
 */
export const clashDisplay = localFont({
  src: [
    { path: '../../public/fonts/clash-display/ClashDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/clash-display/ClashDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/clash-display/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-clash-display',
  display: 'swap',
});

/**
 * Inter via next/font/google — Next.js downloads and self-hosts this at
 * build time (no runtime request to Google Fonts), satisfying the same
 * "self-hosted" performance requirement without a manual download step.
 */
export const inter = Inter({
  subsets: ['latin', 'latin-ext'], // latin-ext covers French accented characters
  variable: '--font-inter',
  display: 'swap',
});
