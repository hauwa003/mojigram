export interface Puzzle {
  id: string;
  pack_id: string;
  emoji_clue: string;
  canonical_answer: string;
  accepted_answers: string[];
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  accessibility_label: string;
  created_at: string;
}

// What the client sees (no answers!)
export interface PuzzleForPlay {
  id: string;
  pack_id: string;
  emoji_clue: string;
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  accessibility_label: string;
}

export interface PuzzlePack {
  id: string;
  name: string;
  slug: string;
  emoji_icon: string;
  description: string;
  color: string;
  puzzle_count: number;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}
