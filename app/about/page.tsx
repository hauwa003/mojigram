import { AppShell } from "@/components/layout";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="space-y-6 py-4">
        <div className="text-center space-y-3">
          <span className="text-6xl">🎯</span>
          <h1 className="font-heading text-3xl font-bold">Mojigram</h1>
          <p className="text-muted-foreground">
            The emoji word game
          </p>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Mojigram is a fun, mobile-first emoji guessing game. Decode emoji
            clues, guess the word or phrase, and challenge your friends!
          </p>

          <div className="space-y-2">
            <h2 className="font-heading text-base font-semibold text-foreground">
              How to Play
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Each puzzle shows you a set of emojis</li>
              <li>Type your answer — you get 3 attempts</li>
              <li>Use a hint if you&apos;re stuck (-2 points)</li>
              <li>Share your results with friends!</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-base font-semibold text-foreground">
              Scoring
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>1st attempt: 10 points</li>
              <li>2nd attempt: 7 points</li>
              <li>3rd attempt: 5 points</li>
              <li>Hint penalty: -2 points</li>
            </ul>
          </div>

          <p className="pt-4 text-center text-xs">
            v0.1.0 — Made with 💜
          </p>
        </div>
      </div>
    </AppShell>
  );
}
