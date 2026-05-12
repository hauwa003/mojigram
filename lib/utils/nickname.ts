const STORAGE_KEY = 'mojigram_nickname';

export function getNickname(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveNickname(name: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, name.trim());
  } catch {
    // localStorage unavailable
  }
}
