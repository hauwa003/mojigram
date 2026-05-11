"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createAnonymousId } from "@/lib/utils/createAnonymousId";
import { toast } from "sonner";

export default function CreatePage() {
  const [emojiClue, setEmojiClue] = useState("");
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!emojiClue.trim() || !answer.trim()) {
      toast.error("Please add emojis and an answer");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/custom-puzzles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorAnonId: createAnonymousId(),
          emojiClue: emojiClue.trim(),
          canonicalAnswer: answer.trim(),
          hint: hint.trim(),
        }),
      });

      const data = await res.json();
      setShareUrl(`${window.location.origin}${data.shareUrl}`);
      toast.success("Puzzle created!");
    } catch {
      toast.error("Failed to create puzzle");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Create a Puzzle</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Make your own emoji puzzle and share it with friends
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Emoji Clue
            </label>
            <Input
              value={emojiClue}
              onChange={(e) => setEmojiClue(e.target.value)}
              placeholder="🦁👑 (e.g., The Lion King)"
              className="text-2xl h-14 text-center"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Answer
            </label>
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="The Lion King"
              className="h-12"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Hint (optional)
            </label>
            <Input
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="A Disney animated classic..."
              className="h-12"
            />
          </div>

          <Button
            onClick={handleCreate}
            disabled={loading || !emojiClue.trim() || !answer.trim()}
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
          >
            {loading ? "Creating..." : "Create Puzzle"}
          </Button>
        </div>

        {shareUrl && (
          <Card className="border-2 border-green">
            <CardContent className="p-4 text-center space-y-3">
              <p className="font-heading font-bold">Puzzle Created! 🎉</p>
              <p className="text-sm text-muted-foreground break-all">
                {shareUrl}
              </p>
              <Button
                variant="outline"
                onClick={async () => {
                  await navigator.clipboard.writeText(shareUrl);
                  toast.success("Link copied!");
                }}
              >
                Copy Link
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
