'use client';

import { useEffect } from 'react';
import { loadPixelsDeferred } from './pixels';

/** Mounted once at the root layout — see docs/05-tracking-pixels-and-capi.md. */
export function usePixelLoader() {
  useEffect(() => {
    loadPixelsDeferred();
  }, []);
}
