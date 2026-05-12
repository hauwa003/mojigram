"use client";

import { useEffect, useState } from "react";
import { createAnonymousId } from "@/lib/utils/createAnonymousId";
import type { LeaderboardEntry } from "@/types/game";

const SESSION_EMOJIS: Record<string, string> = {
  daily: "📅",
  general: "🎲",
  practice: "🎯",
  my_mix: "🧩",
};

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"daily" | "alltime">("daily");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [anonId, setAnonId] = useState("");

  useEffect(() => {
    setAnonId(createAnonymousId());
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?type=${tab}`)
      .then((r) => r.json())
      .then((data) => setEntries(data.entries || []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, [tab]);

  return (
    <div className="px-4 pb-20 pt-4 max-w-lg mx-auto">
      <h1 className="font-heading text-2xl font-bold text-center mb-4">
        Leaderboard
      </h1>

      {/* Tab switcher */}
      <div className="flex bg-muted rounded-xl p-1 mb-6">
        <button
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "daily"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
          onClick={() => setTab("daily")}
        >
          Today
        </button>
        <button
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "alltime"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
          onClick={() => setTab("alltime")}
        >
          All Time
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          Loading...
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-3xl mb-2">🏆</p>
          <p className="text-muted-foreground">
            No scores yet — be the first!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, i) => {
            const rank = i + 1;
            const isMe = entry.anonId === anonId;
            const medal =
              rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

            return (
              <div
                key={entry.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                  isMe
                    ? "bg-purple-light border border-primary/30"
                    : "bg-muted/50"
                }`}
              >
                {/* Rank */}
                <span className="w-8 text-center font-bold text-sm">
                  {medal || `#${rank}`}
                </span>

                {/* Nickname + session type */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {entry.nickname}
                    {isMe && (
                      <span className="text-primary ml-1 text-xs">(you)</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {SESSION_EMOJIS[entry.sessionType] || ""}{" "}
                    {entry.sessionType.replace("_", " ")}
                  </p>
                </div>

                {/* Score */}
                <div className="text-right">
                  <p className="font-bold text-sm">{entry.totalScore}</p>
                  <p className="text-xs text-muted-foreground">
                    /{entry.maxScore}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
