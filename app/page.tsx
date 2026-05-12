"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/layout";
import { DailyChallengeCard } from "@/components/home/DailyChallengeCard";
import { GeneralModeCard } from "@/components/home/GeneralModeCard";
import { MyMixCard } from "@/components/home/MyMixCard";
import { PracticeModeCard } from "@/components/home/PracticeModeCard";
import { LevelsModeCard } from "@/components/home/LevelsModeCard";
import { staggerContainer, staggerItem } from "@/lib/motion";

export default function HomePage() {
  return (
    <AppShell>
      <motion.div
        className="flex flex-col gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.div className="pt-2" variants={staggerItem}>
          <h1 className="font-heading text-2xl font-bold">
            Hey, emoji genius{" "}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            >
              👋
            </motion.span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Ready to decode some emojis?
          </p>
        </motion.div>

        {/* Daily Challenge — featured */}
        <motion.div variants={staggerItem}>
          <DailyChallengeCard />
        </motion.div>

        {/* Other modes */}
        <motion.div className="flex flex-col gap-4" variants={staggerItem}>
          <h2 className="font-heading text-lg font-semibold">Play Modes</h2>
          <div className="flex flex-col gap-3">
            <LevelsModeCard />
            <GeneralModeCard />
            <MyMixCard />
            <PracticeModeCard />
          </div>
        </motion.div>
      </motion.div>
    </AppShell>
  );
}
