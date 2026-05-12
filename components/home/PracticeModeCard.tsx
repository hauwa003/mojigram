"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function PracticeModeCard() {
  return (
    <Link href="/play/practice">
      <Card className="hover:shadow-md transition-shadow border-2 border-border">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center shrink-0">
            <span className="text-xl">🎯</span>
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-base font-bold">Practice</h3>
            <p className="text-sm text-muted-foreground">
              Pick a pack and go at your own pace
            </p>
          </div>
          <span className="text-muted-foreground">→</span>
        </CardContent>
      </Card>
    </Link>
  );
}
