'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-sm font-medium" role="group" aria-label="Language switcher">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? 'true' : undefined}
          className={
            loc === locale
              ? 'rounded-full bg-primary px-3 py-1.5 text-white'
              : 'rounded-full px-3 py-1.5 text-gray transition-colors hover:text-primary'
          }
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
