import { AppShell } from "@/components/layout";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ shareSlug: string }>;
}) {
  const { shareSlug } = await params;

  return (
    <AppShell>
      <div className="text-center py-12 space-y-4">
        <span className="text-5xl">🏆</span>
        <h1 className="font-heading text-2xl font-bold">
          Shared Results
        </h1>
        <p className="text-muted-foreground">
          Results for: {shareSlug}
        </p>
        <p className="text-sm text-muted-foreground">
          Full results sharing coming soon!
        </p>
      </div>
    </AppShell>
  );
}
