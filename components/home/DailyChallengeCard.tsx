"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DailyChallengeCard() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-purple-light to-pink-light">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-muted-foreground">{today}</p>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Daily Mojigram
            </h3>
          </div>
          <span className="text-3xl">📅</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          5 puzzles. One shot. How will you score?
        </p>
        <Link href="/play/daily">
          <Button className="w-full bg-primary hover:bg-primary/90">
            Play Today&apos;s Challenge
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
