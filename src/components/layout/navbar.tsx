'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { navItems } from '@/lib/constants';
import { LocaleSwitcher } from './locale-switcher';
import { BookingCta } from './booking-dialog';
import { cn } from '@/lib/utils';

/**
 * Sticky nav: transparent over the hero, transitions to a translucent
 * glass surface after ~80px scroll. See docs/04-design-system.md.
 */
export function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-premium',
        scrolled ? 'bg-white/70 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="font-heading text-xl font-semibold tracking-tight text-primary">
          COACH-MALEK
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group relative text-sm font-medium text-primary/80 transition-colors hover:text-primary"
            >
              {t(item.key)}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 ease-premium group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <BookingCta location="navbar" size="sm">
            {t('bookConsultation')}
          </BookingCta>
        </div>

        <button
          className="p-2 text-primary lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-white px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className="text-base font-medium text-primary" onClick={() => setMobileOpen(false)}>
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between">
            <LocaleSwitcher />
            <BookingCta location="navbar-mobile" size="sm">
              {t('bookConsultation')}
            </BookingCta>
          </div>
        </div>
      )}
    </header>
  );
}
