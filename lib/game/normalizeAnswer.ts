/**
 * Normalize an answer string for comparison.
 *
 * - Lowercase
 * - Trim whitespace
 * - Collapse multiple spaces into one
 * - Remove hyphens
 * - Strip leading articles ("the", "a", "an")
 */
export function normalizeAnswer(input: string): string {
  let normalized = input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/-/g, '');

  // Remove leading articles
  normalized = normalized.replace(/^(the|a|an)\s+/i, '');

  return normalized;
}
