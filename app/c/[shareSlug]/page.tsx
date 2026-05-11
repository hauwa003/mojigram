import { AppShell } from "@/components/layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CustomPuzzlePage({
  params,
}: {
  params: Promise<{ shareSlug: string }>;
}) {
  const { shareSlug } = await params;

  return (
    <AppShell>
      <div className="text-center py-12 space-y-4">
        <span className="text-5xl">🧩</span>
        <h1 className="font-heading text-2xl font-bold">
          Custom Puzzle
        </h1>
        <p className="text-muted-foreground">
          Puzzle: {shareSlug}
        </p>
        <p className="text-sm text-muted-foreground">
          Custom puzzle play coming soon!
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </AppShell>
  );
}
