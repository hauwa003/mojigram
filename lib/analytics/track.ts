/**
 * Simple analytics wrapper.
 *
 * If PostHog is available on the window object, forward the event.
 * Otherwise this is a no-op, so analytics never blocks the app.
 */
export function track(
  event: string,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posthog = (window as any).posthog;

  if (posthog && typeof posthog.capture === 'function') {
    posthog.capture(event, properties);
  }
}
