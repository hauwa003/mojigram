import { PuzzleForPlay } from '@/types/puzzle';

/**
 * Fisher-Yates shuffle (in-place on a copy).
 */
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Select a random subset of puzzles, optionally filtered by pack IDs.
 *
 * @param puzzles - Full list of available puzzles
 * @param count - Number of puzzles to select
 * @param packIds - Optional array of pack IDs to filter by
 * @returns Shuffled subset of puzzles
 */
export function selectPuzzles(
  puzzles: PuzzleForPlay[],
  count: number,
  packIds?: string[],
): PuzzleForPlay[] {
  let pool = puzzles;

  if (packIds && packIds.length > 0) {
    pool = puzzles.filter((p) => packIds.includes(p.pack_id));
  }

  const shuffled = shuffle(pool);
  return shuffled.slice(0, count);
}
