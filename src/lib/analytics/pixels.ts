'use client';

/**
 * Deferred loader for the Meta, TikTok, and Snapchat browser pixels.
 * These scripts must NEVER be part of the critical rendering path — see
 * docs/05-tracking-pixels-and-capi.md § Performance: deferred pixel loading.
 *
 * Strategy: load on the first of (a) requestIdleCallback / 2s timeout
 * fallback, or (b) the visitor's first genuine interaction (scroll,
 * pointer move, touchstart) — whichever comes first. Conversion events
 * (Lead, Contact, Schedule) always happen on user interaction, by which
 * point the SDKs are already attached, so there is no race condition for
 * anything that actually matters for attribution — only the automatic
 * PageView is delayed by a few hundred ms, which is an acceptable trade-off.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    ttq?: {
      track: (event: string, payload?: Record<string, unknown>, options?: { event_id?: string }) => void;
      load: (pixelId: string) => void;
      page: () => void;
    };
    snaptr?: (...args: unknown[]) => void;
  }
}

let pixelsLoaded = false;

function injectMetaPixel(pixelId: string) {
  if (window.fbq) return;

  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any) {
    let n: any, t: any, s: any;
    if (f.fbq) return;
    n = f.fbq = function (...args: unknown[]) {
      // @ts-expect-error - dynamic pixel bootstrap follows Meta's official snippet shape
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq?.('init', pixelId);
  window.fbq?.('track', 'PageView');
}

function injectTikTokPixel(pixelId: string) {
  if (window.ttq) return;

  /* eslint-disable */
  (function (w: any, d: any, t: string) {
    w.TiktokAnalyticsObject = t;
    const ttq = (w[t] = w[t] || []);
    ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
    ttq.setAndDefer = function (target: any, method: string) {
      target[method] = function (...args: unknown[]) {
        target.push([method, ...args]);
      };
    };
    for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.load = function (pixelCode: string) {
      const script = d.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${pixelCode}&lib=${t}`;
      const firstScript = d.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    };
    ttq.load(pixelId);
    ttq.page();
  })(window, document, 'ttq');
  /* eslint-enable */
}

function injectSnapPixel(pixelId: string) {
  if (window.snaptr) return;

  /* eslint-disable */
  (function (e: any, t: any, n: any) {
    if (e.snaptr) return;
    let a = (e.snaptr = function (...args: unknown[]) {
      // @ts-expect-error - dynamic pixel bootstrap follows Snapchat's official snippet shape
      a.handleRequest ? a.handleRequest.apply(a, args) : a.queue.push(args);
    });
    a.queue = [];
    const s = 'script';
    const r = t.createElement(s);
    r.async = true;
    r.src = n;
    const u = t.getElementsByTagName(s)[0];
    u.parentNode.insertBefore(r, u);
  })(window, document, 'https://sc-static.net/scevent.min.js');
  /* eslint-enable */

  window.snaptr?.('init', pixelId);
  window.snaptr?.('track', 'PAGE_VIEW');
}

function loadAllPixels() {
  if (pixelsLoaded) return;
  pixelsLoaded = true;

  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const tiktokId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const snapId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

  if (metaId) injectMetaPixel(metaId);
  if (tiktokId) injectTikTokPixel(tiktokId);
  if (snapId) injectSnapPixel(snapId);
}

export function loadPixelsDeferred() {
  if (typeof window === 'undefined') return;

  const load = () => loadAllPixels();

  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(load, {
      timeout: 3000,
    });
  } else {
    setTimeout(load, 2000);
  }

  const onFirstInteraction = () => {
    load();
    cleanup();
  };
  const cleanup = () => {
    window.removeEventListener('scroll', onFirstInteraction);
    window.removeEventListener('pointermove', onFirstInteraction);
    window.removeEventListener('touchstart', onFirstInteraction);
  };

  window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });
  window.addEventListener('pointermove', onFirstInteraction, { once: true, passive: true });
  window.addEventListener('touchstart', onFirstInteraction, { once: true, passive: true });
}

/** Fires a conversion event on each already-loaded (or loading) pixel SDK. */
export function fireBrowserPixelEvent(
  eventName: 'Lead' | 'Contact' | 'CompleteRegistration',
  eventId: string,
  payload: Record<string, unknown> = {}
) {
  // Ensure pixels are at least requested to load before firing a real
  // conversion event (user interaction already triggered loadPixelsDeferred
  // via the layout-level listener, but this is a safety net for programmatic
  // calls, e.g. a CTA click that fires before any scroll/pointer event).
  loadAllPixels();

  window.fbq?.('track', metaEventNameFor(eventName), payload, { eventID: eventId });
  window.ttq?.track(tiktokEventNameFor(eventName), payload, { event_id: eventId });
  window.snaptr?.('track', snapEventNameFor(eventName), { client_dedup_id: eventId });
}

function metaEventNameFor(eventName: string): string {
  return eventName; // Lead/Contact/CompleteRegistration map 1:1 to Meta's standard events.
}

function tiktokEventNameFor(eventName: string): string {
  if (eventName === 'Lead') return 'SubmitForm';
  return eventName;
}

function snapEventNameFor(eventName: string): string {
  if (eventName === 'Lead' || eventName === 'CompleteRegistration') return 'SIGN_UP';
  return 'SAVE';
}
