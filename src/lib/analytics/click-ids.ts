'use client';

/**
 * Reads the raw (unhashed — these are opaque click identifiers, not PII)
 * click/browser IDs used for CAPI matching: Meta's fbp/fbc cookies, and
 * the ttclid/scclid URL params from TikTok/Snapchat ad clicks (which the
 * platforms' own pixel scripts persist to cookies on first load, but we
 * also capture from the URL directly as a fallback on the landing pageview).
 * See docs/05-tracking-pixels-and-capi.md.
 */

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

function getQueryParam(name: string): string | undefined {
  if (typeof window === 'undefined') return undefined;
  return new URLSearchParams(window.location.search).get(name) ?? undefined;
}

export function getClickIds() {
  return {
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc') ?? buildFbcFromFbclid(),
    ttclid: getQueryParam('ttclid') ?? getCookie('ttclid'),
    scclid: getQueryParam('ScCid') ?? getQueryParam('sccid') ?? getCookie('_scid'),
  };
}

/**
 * If the visitor landed with a fbclid URL param but the pixel hasn't yet
 * written the _fbc cookie, build the fbc value ourselves in Meta's
 * documented format: fb.{subdomainIndex}.{creationTime}.{fbclid}
 */
function buildFbcFromFbclid(): string | undefined {
  const fbclid = getQueryParam('fbclid');
  if (!fbclid) return undefined;
  return `fb.1.${Date.now()}.${fbclid}`;
}

export function getUtmParams() {
  return {
    utmSource: getQueryParam('utm_source'),
    utmMedium: getQueryParam('utm_medium'),
    utmCampaign: getQueryParam('utm_campaign'),
  };
}
