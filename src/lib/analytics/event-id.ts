/**
 * Generates one event_id per logical user action, shared between the
 * browser pixel call and the server CAPI call for deduplication.
 * See docs/05-tracking-pixels-and-capi.md § Deduplication strategy.
 */
export function createEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers without crypto.randomUUID (rare, but
  // this must never throw and block a conversion event from firing).
  return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
