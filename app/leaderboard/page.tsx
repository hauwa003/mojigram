"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout";
import { createAnonymousId } from "@/lib/utils/createAnonymousId";
import { staggerContainer, staggerItem, spring } from "@/lib/motion";
import type { LeaderboardEntry } from "@/types/game";

const SESSION_EMOJIS: Record<string, string> = {
  daily: "📅",
  general: "🎲",
  practice: "🎯",
  my_mix: "🧩",
};

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted border-2 border-foreground/20 animate-pulse">
      <div className="w-8 h-5 bg-muted-foreground/20 rounded" />
      <div className="flex-1 space-y-1.5">
        <div className="h-4 bg-muted-foreground/20 rounded w-24" />
        <div className="h-3 bg-muted-foreground/20 rounded w-16" />
      </div>
      <div className="w-10 h-5 bg-muted-foreground/20 rounded" />
    </div>
  );
}

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
    <AppShell>
      <div className="space-y-4">
        <h1 className="font-heading text-2xl font-extrabold text-center">
          Leaderboard
        </h1>

        {/* Tab switcher */}
        <div className="flex bg-muted rounded-xl border-2 border-foreground p-1 relative">
          {(["daily", "alltime"] as const).map((t) => (
            <button
              key={t}
              className="flex-1 py-2 rounded-lg text-sm font-bold relative z-10 transition-colors"
              onClick={() => setTab(t)}
            >
              <span className={tab === t ? "text-foreground" : "text-muted-foreground"}>
                {t === "daily" ? "Today" : "All Time"}
              </span>
              {tab === t && (
                <motion.div
                  layoutId="leaderboardTab"
                  className="absolute inset-0 bg-background rounded-lg border-2 border-foreground shadow-brutal-sm"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={spring.gentle}
          >
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-3xl mb-2">🏆</p>
                <p className="text-muted-foreground">
                  No scores yet — be the first!
                </p>
              </div>
            ) : (
              <motion.div
                className="space-y-2"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {entries.map((entry, i) => {
                  const rank = i + 1;
                  const isMe = entry.anonId === anonId;
                  const isTop3 = rank <= 3;
                  const medal =
                    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

                  return (
                    <motion.div
                      key={entry.id}
                      variants={staggerItem}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-foreground ${
                        isMe
                          ? "bg-purple-light shadow-brutal-purple"
                          : isTop3
                          ? "bg-yellow-light shadow-brutal-sm"
                          : "bg-muted/50"
                      }`}
                    >
                      {/* Rank */}
                      <span className={`w-8 text-center font-extrabold ${isTop3 ? "text-lg" : "text-sm"}`}>
                        {medal ? (
                          <motion.span
                            className="inline-block"
                            animate={rank === 1 ? { y: [0, -3, 0] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            {medal}
                          </motion.span>
                        ) : (
                          `#${rank}`
                        )}
                      </span>

                      {/* Nickname + session type */}
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm truncate ${isTop3 ? "font-bold" : ""}`}>
                          {entry.nickname}
                          {isMe && (
                            <span className="text-primary ml-1 text-xs font-bold">(you)</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {SESSION_EMOJIS[entry.sessionType] || ""}{" "}
                          {entry.sessionType.replace("_", " ")}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <p className={`font-extrabold ${isTop3 ? "text-base text-primary" : "text-sm"}`}>
                          {entry.totalScore}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          /{entry.maxScore}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
