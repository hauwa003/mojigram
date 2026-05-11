-- ============================================================
-- Mojigram: Initial Schema
-- ============================================================

-- Puzzle Packs
CREATE TABLE puzzle_packs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  emoji_icon TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL DEFAULT '#7C3AED',
  puzzle_count INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Puzzles
CREATE TABLE puzzles (
  id TEXT PRIMARY KEY,
  pack_id TEXT NOT NULL REFERENCES puzzle_packs(id),
  emoji_clue TEXT NOT NULL,
  canonical_answer TEXT NOT NULL,
  accepted_answers TEXT[] NOT NULL DEFAULT '{}',
  hint TEXT,
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  category TEXT,
  accessibility_label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Daily Challenges
CREATE TABLE daily_challenges (
  id TEXT PRIMARY KEY,
  challenge_date DATE UNIQUE NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE daily_challenge_puzzles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  challenge_id TEXT NOT NULL REFERENCES daily_challenges(id),
  puzzle_id TEXT NOT NULL REFERENCES puzzles(id),
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Game Sessions
CREATE TABLE game_sessions (
  id TEXT PRIMARY KEY,
  anon_id TEXT NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('daily', 'general', 'practice', 'my_mix')),
  pack_id TEXT REFERENCES puzzle_packs(id),
  total_score INTEGER NOT NULL DEFAULT 0,
  max_score INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Puzzle Progress within sessions
CREATE TABLE puzzle_progress (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_id TEXT NOT NULL REFERENCES game_sessions(id),
  puzzle_id TEXT NOT NULL REFERENCES puzzles(id),
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  hint_used BOOLEAN NOT NULL DEFAULT false,
  score INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'solved', 'failed')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Individual guesses
CREATE TABLE guesses (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  progress_id TEXT NOT NULL REFERENCES puzzle_progress(id),
  guess_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Custom puzzles (user created)
CREATE TABLE custom_puzzles (
  id TEXT PRIMARY KEY,
  creator_anon_id TEXT NOT NULL,
  emoji_clue TEXT NOT NULL,
  canonical_answer TEXT NOT NULL,
  accepted_answers TEXT[] NOT NULL DEFAULT '{}',
  hint TEXT,
  share_slug TEXT UNIQUE,
  play_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Share results
CREATE TABLE share_results (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES game_sessions(id),
  share_slug TEXT UNIQUE NOT NULL,
  share_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX idx_puzzles_pack_id ON puzzles(pack_id);
CREATE INDEX idx_puzzles_difficulty ON puzzles(difficulty);
CREATE INDEX idx_daily_challenges_date ON daily_challenges(challenge_date);
CREATE INDEX idx_daily_challenge_puzzles_challenge ON daily_challenge_puzzles(challenge_id);
CREATE INDEX idx_game_sessions_anon_id ON game_sessions(anon_id);
CREATE INDEX idx_game_sessions_type ON game_sessions(session_type);
CREATE INDEX idx_puzzle_progress_session ON puzzle_progress(session_id);
CREATE INDEX idx_guesses_progress ON guesses(progress_id);
CREATE INDEX idx_custom_puzzles_slug ON custom_puzzles(share_slug);
CREATE INDEX idx_share_results_slug ON share_results(share_slug);
