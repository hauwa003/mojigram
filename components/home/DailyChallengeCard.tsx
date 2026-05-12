"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { spring } from "@/lib/motion";

export function DailyChallengeCard() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="border-3 border-foreground bg-purple-light shadow-brutal-purple overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{today}</p>
            <h3 className="font-heading text-lg font-extrabold text-foreground">
              Daily Mojigram
            </h3>
          </div>
          <motion.span
            className="text-3xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            📅
          </motion.span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          5 puzzles. One shot. How will you score?
        </p>
        <Link href="/play/daily">
          <motion.div whileTap={{ scale: 0.97 }} transition={spring.bouncy}>
            <Button className="w-full bg-primary hover:bg-primary/90 border-2 border-foreground shadow-brutal-sm brutal-press font-bold">
              Play Today&apos;s Challenge
            </Button>
          </motion.div>
        </Link>
      </CardContent>
    </Card>
  );
}
