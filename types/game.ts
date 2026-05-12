import { PuzzleForPlay } from './puzzle';

export type SessionType = 'daily' | 'general' | 'practice' | 'my_mix';

export interface PuzzleState {
  puzzle: PuzzleForPlay;
  attempts: number;
  maxAttempts: number;
  hintUsed: boolean;
  score: number;
  status: 'active' | 'solved' | 'failed';
  guesses: string[];
}

export interface GameState {
  sessionId: string;
  sessionType: SessionType;
  puzzles: PuzzleForPlay[];
  puzzleStates: PuzzleState[];
  currentPuzzleIndex: number;
  totalScore: number;
  status: 'playing' | 'completed';
  startedAt: string;
}

export type GameAction =
  | { type: 'SUBMIT_GUESS'; guess: string; correct: boolean; score: number }
  | { type: 'USE_HINT' }
  | { type: 'NEXT_PUZZLE' }
  | { type: 'SKIP_PUZZLE' }
  | { type: 'COMPLETE_SESSION' };

export interface SessionResult {
  sessionId: string;
  sessionType: SessionType;
  totalScore: number;
  maxScore: number;
  puzzleResults: PuzzleResult[];
  rankLabel: string;
  shareText: string;
}

export interface PuzzleResult {
  emoji_clue: string;
  status: 'solved' | 'failed';
  attempts: number;
  hintUsed: boolean;
  score: number;
}

export interface LeaderboardEntry {
  id: string;
  anonId: string;
  nickname: string;
  sessionType: SessionType;
  totalScore: number;
  maxScore: number;
  completedAt: string;
}
