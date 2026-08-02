'use client';

import { usePixelLoader } from '@/lib/analytics/use-pixel-loader';

/** Mounted once in the root layout to kick off the deferred pixel loader. */
export function PixelLoaderMount() {
  usePixelLoader();
  return null;
}
