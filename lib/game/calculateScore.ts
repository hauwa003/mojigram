/**
 * Calculate the score for a solved puzzle.
 *
 * Scoring:
 * - 1st attempt: 10 points
 * - 2nd attempt:  7 points
 * - 3rd attempt:  5 points
 * - Hint penalty: -2 points (minimum 0)
 */
export function calculateScore(attempts: number, hintUsed: boolean): number {
  let score: number;

  switch (attempts) {
    case 1:
      score = 10;
      break;
    case 2:
      score = 7;
      break;
    case 3:
      score = 5;
      break;
    default:
      score = 0;
  }

  if (hintUsed) {
    score = Math.max(0, score - 2);
  }

  return score;
}
