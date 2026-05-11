import { nanoid } from 'nanoid';

const STORAGE_KEY = 'mojigram_anon_id';

/**
 * Get or create an anonymous user ID.
 *
 * Checks localStorage for an existing ID. If none is found,
 * generates a new one in the format "anon_<nanoid(12)>" and persists it.
 */
export function createAnonymousId(): string {
  if (typeof window === 'undefined') {
    // Server-side: generate a transient ID (won't be persisted)
    return `anon_${nanoid(12)}`;
  }

  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    const id = `anon_${nanoid(12)}`;
    localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // localStorage unavailable — return a transient ID
    return `anon_${nanoid(12)}`;
  }
}
