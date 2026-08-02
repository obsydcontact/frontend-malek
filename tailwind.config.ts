import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';

// Design tokens sourced from docs/04-design-system.md — do not hardcode
// hex values in components; always reference these theme tokens.
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        background: '#F7F7F4',
        primary: {
          DEFAULT: '#111111',
          foreground: '#FFFFFF',
        },
        gold: {
          DEFAULT: '#C9A76A',
          foreground: '#111111',
        },
        gray: {
          DEFAULT: '#4B5563',
        },
        white: '#FFFFFF',
        border: 'rgba(17, 17, 17, 0.06)',
        ring: '#C9A76A',
      },
      fontFamily: {
        heading: ['var(--font-clash-display)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        DEFAULT: '20px',
        sm: '12px',
        lg: '20px',
        xl: '28px',
      },
      boxShadow: {
        soft: '0 20px 60px -15px rgba(17, 17, 17, 0.12)',
        'soft-lg': '0 30px 80px -20px rgba(17, 17, 17, 0.18)',
        'gold-glow': '0 0 0 1px rgba(201, 167, 106, 0.35), 0 20px 60px -15px rgba(201, 167, 106, 0.25)',
      },
      maxWidth: {
        content: '1280px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'accordion-down': 'accordion-down 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'accordion-up': 'accordion-up 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionTimingFunction: {
        'ease-premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [typography, animate],
};

export default config;
