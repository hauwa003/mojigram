import { PuzzleResult } from '@/types/game';

/**
 * Generate an emoji result grid for sharing.
 *
 * - Green square: solved on 1st attempt
 * - Yellow square: solved in 2-3 attempts
 * - Red/black square: failed
 */
function puzzleToEmoji(result: PuzzleResult): string {
  if (result.status === 'failed') return '\u{1F7E5}'; // red square
  if (result.attempts === 1) return '\u{1F7E9}'; // green square
  return '\u{1F7E8}'; // yellow square
}

/**
 * Build a shareable result text for a completed session.
 *
 * Example output:
 * Mojigram Daily #1
 * Score: 37/50
 */
export function generateResultGrid(
  puzzleResults: PuzzleResult[],
  sessionLabel: string,
  totalScore: number,
  maxScore: number,
): string {
  const grid = puzzleResults.map(puzzleToEmoji).join('');

  return `${sessionLabel}\n${grid}\nScore: ${totalScore}/${maxScore}`;
}
