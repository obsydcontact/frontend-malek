'use client';

import { createEventId } from './event-id';
import { fireBrowserPixelEvent } from './pixels';

export type TrackableEvent = 'Lead' | 'Contact' | 'CompleteRegistration';

/**
 * Fires a browser pixel event with a fresh event_id and returns that same
 * event_id so the caller can include it in the corresponding backend API
 * call (POST /api/leads), which uses it as the CAPI event_id for
 * deduplication. See docs/05-tracking-pixels-and-capi.md § Deduplication.
 *
 * IMPORTANT: call this exactly once per logical user action (e.g. once per
 * contact-form submit, once per WhatsApp click) — never regenerate a new
 * event_id server-side for the same action.
 */
export function track(event: TrackableEvent, payload: Record<string, unknown> = {}): string {
  const eventId = createEventId();
  fireBrowserPixelEvent(event, eventId, payload);
  return eventId;
}
