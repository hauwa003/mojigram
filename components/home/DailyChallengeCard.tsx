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
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-purple-light via-background to-pink-light shadow-purple overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">{today}</p>
            <h3 className="font-heading text-lg font-bold text-foreground">
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
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={spring.bouncy}>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Play Today&apos;s Challenge
            </Button>
          </motion.div>
        </Link>
      </CardContent>
    </Card>
  );
}
