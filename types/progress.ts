export interface LevelResult {
  score: number;
  attempts: number;
  hintUsed: boolean;
  completedAt: string;
}

export interface DifficultyProgress {
  highestUnlocked: number;
  completedLevels: Record<number, LevelResult>;
}

export interface PackProgress {
  easy: DifficultyProgress;
  medium: DifficultyProgress;
  hard: DifficultyProgress;
}

export interface PlayerProgress {
  version: 1;
  packs: Record<string, PackProgress>;
}
