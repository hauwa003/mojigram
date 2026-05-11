import seedPuzzles from "@/data/seed-puzzles.json";
import seedPacks from "@/data/seed-packs.json";
import type { Puzzle, PuzzlePack, PuzzleForPlay } from "@/types/puzzle";

// In-memory store from seed data — used when Supabase is not configured
const puzzles: Puzzle[] = seedPuzzles as Puzzle[];
const packs: PuzzlePack[] = (seedPacks as (PuzzlePack & { is_published?: boolean })[]).map((p) => ({
  ...p,
  puzzle_count: puzzles.filter((pz) => pz.pack_id === p.id).length,
  is_published: p.is_published ?? true,
  created_at: p.created_at ?? new Date().toISOString(),
}));

export function getAllPacks(): PuzzlePack[] {
  return packs.filter((p) => p.is_published);
}

export function getPuzzlesByPack(packSlug: string): Puzzle[] {
  const pack = packs.find((p) => p.slug === packSlug);
  if (!pack) return [];
  return puzzles.filter((p) => p.pack_id === pack.id);
}

export function getPuzzlesByPackIds(packIds: string[]): Puzzle[] {
  if (packIds.length === 0) return puzzles;
  return puzzles.filter((p) => packIds.includes(p.pack_id));
}

export function getAllPuzzles(): Puzzle[] {
  return puzzles;
}

export function getPuzzleById(id: string): Puzzle | undefined {
  return puzzles.find((p) => p.id === id);
}

export function stripAnswers(puzzle: Puzzle): PuzzleForPlay {
  return {
    id: puzzle.id,
    pack_id: puzzle.pack_id,
    emoji_clue: puzzle.emoji_clue,
    hint: puzzle.hint,
    difficulty: puzzle.difficulty,
    category: puzzle.category,
    accessibility_label: puzzle.accessibility_label,
  };
}

export function getRandomPuzzles(
  count: number,
  packIds?: string[]
): PuzzleForPlay[] {
  const pool = packIds && packIds.length > 0
    ? getPuzzlesByPackIds(packIds)
    : puzzles;

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(stripAnswers);
}

export function getDailyPuzzles(): PuzzleForPlay[] {
  // Use date as seed for deterministic daily selection
  const today = new Date().toISOString().split("T")[0];
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash << 5) - hash + today.charCodeAt(i);
    hash |= 0;
  }

  const shuffled = [...puzzles].sort((a, b) => {
    const ha = hashStr(a.id + today);
    const hb = hashStr(b.id + today);
    return ha - hb;
  });

  return shuffled.slice(0, 5).map(stripAnswers);
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return h;
}
