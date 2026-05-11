import { AppShell } from "@/components/layout";
import { DailyChallengeCard } from "@/components/home/DailyChallengeCard";
import { GeneralModeCard } from "@/components/home/GeneralModeCard";
import { MyMixCard } from "@/components/home/MyMixCard";
import { PracticeModeCard } from "@/components/home/PracticeModeCard";

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-4">
        {/* Greeting */}
        <div className="pt-2">
          <h1 className="font-heading text-2xl font-bold">
            Hey, emoji genius 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Ready to decode some emojis?
          </p>
        </div>

        {/* Daily Challenge — featured */}
        <DailyChallengeCard />

        {/* Other modes */}
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-semibold">Play Modes</h2>
          <GeneralModeCard />
          <MyMixCard />
          <PracticeModeCard />
        </div>
      </div>
    </AppShell>
  );
}
