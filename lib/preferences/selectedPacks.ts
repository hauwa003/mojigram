const STORAGE_KEY = 'mojigram_selected_packs';

/**
 * Retrieve the list of selected pack IDs from localStorage.
 * Returns an empty array if nothing is stored or if localStorage is unavailable.
 */
export function getSelectedPacks(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

/**
 * Save the list of selected pack IDs to localStorage.
 */
export function saveSelectedPacks(ids: string[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Silently fail if localStorage is full or unavailable
  }
}

/**
 * Toggle a pack ID in the selected packs list.
 * If the pack is already selected, remove it. Otherwise, add it.
 * Returns the updated list.
 */
export function togglePack(id: string): string[] {
  const current = getSelectedPacks();
  const index = current.indexOf(id);

  if (index >= 0) {
    current.splice(index, 1);
  } else {
    current.push(id);
  }

  saveSelectedPacks(current);
  return current;
}
