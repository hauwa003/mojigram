-- Add level_order to puzzles table
ALTER TABLE puzzles ADD COLUMN IF NOT EXISTS level_order integer NOT NULL DEFAULT 0;

-- Create index for level lookups
CREATE INDEX IF NOT EXISTS idx_puzzles_pack_difficulty_level
  ON puzzles (pack_id, difficulty, level_order);

-- Level progress table (for future Supabase-backed progress)
CREATE TABLE IF NOT EXISTS level_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  anon_id text NOT NULL,
  pack_slug text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  level_order integer NOT NULL,
  score integer NOT NULL DEFAULT 0,
  attempts integer NOT NULL DEFAULT 0,
  hint_used boolean NOT NULL DEFAULT false,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (anon_id, pack_slug, difficulty, level_order)
);

CREATE INDEX IF NOT EXISTS idx_level_progress_user
  ON level_progress (anon_id, pack_slug);
