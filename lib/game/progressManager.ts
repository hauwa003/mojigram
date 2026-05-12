import type {
  PlayerProgress,
  PackProgress,
  DifficultyProgress,
  LevelResult,
} from "@/types/progress";

const STORAGE_KEY = "mojigram_progress";

function defaultDifficultyProgress(): DifficultyProgress {
  return { highestUnlocked: 1, completedLevels: {} };
}

function defaultPackProgress(): PackProgress {
  return {
    easy: defaultDifficultyProgress(),
    medium: defaultDifficultyProgress(),
    hard: defaultDifficultyProgress(),
  };
}

function defaultProgress(): PlayerProgress {
  return { version: 1, packs: {} };
}

export function getProgress(): PlayerProgress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as PlayerProgress;
    if (parsed.version !== 1) return defaultProgress();
    return parsed;
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: PlayerProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function ensurePackProgress(
  progress: PlayerProgress,
  packSlug: string
): PackProgress {
  if (!progress.packs[packSlug]) {
    progress.packs[packSlug] = defaultPackProgress();
  }
  return progress.packs[packSlug];
}

export function isLevelUnlocked(
  packSlug: string,
  difficulty: "easy" | "medium" | "hard",
  levelOrder: number
): boolean {
  const progress = getProgress();
  const pack = progress.packs[packSlug];
  if (!pack) return levelOrder === 1;
  const diff = pack[difficulty];
  if (!diff) return levelOrder === 1;
  return levelOrder <= diff.highestUnlocked;
}

export function completeLevel(
  packSlug: string,
  difficulty: "easy" | "medium" | "hard",
  levelOrder: number,
  result: LevelResult
): void {
  const progress = getProgress();
  const pack = ensurePackProgress(progress, packSlug);
  const diff = pack[difficulty];

  diff.completedLevels[levelOrder] = result;

  // Unlock next level if this was the highest unlocked
  if (levelOrder >= diff.highestUnlocked) {
    diff.highestUnlocked = levelOrder + 1;
  }

  saveProgress(progress);
}

export function getPackStats(packSlug: string): {
  easy: { completed: number; total: number };
  medium: { completed: number; total: number };
  hard: { completed: number; total: number };
  totalCompleted: number;
} {
  const progress = getProgress();
  const pack = progress.packs[packSlug];

  const stats = (diff: DifficultyProgress | undefined, total: number) => ({
    completed: diff ? Object.keys(diff.completedLevels).length : 0,
    total,
  });

  const easy = stats(pack?.easy, 17);
  const medium = stats(pack?.medium, 17);
  const hard = stats(pack?.hard, 16);

  return {
    easy,
    medium,
    hard,
    totalCompleted: easy.completed + medium.completed + hard.completed,
  };
}
