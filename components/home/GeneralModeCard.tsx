"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function GeneralModeCard() {
  return (
    <Link href="/play/general">
      <Card className="hover:shadow-md transition-shadow border-2 border-border">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-light flex items-center justify-center shrink-0">
            <span className="text-xl">🎲</span>
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-base font-bold">General Mode</h3>
            <p className="text-sm text-muted-foreground">
              Random puzzles from all packs
            </p>
          </div>
          <span className="text-muted-foreground">→</span>
        </CardContent>
      </Card>
    </Link>
  );
}
