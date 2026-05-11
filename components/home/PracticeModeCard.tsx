"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function PracticeModeCard() {
  return (
    <Link href="/play/practice">
      <Card className="hover:shadow-md transition-shadow border border-border">
        <CardContent className="p-4 flex items-center gap-4">
          <span className="text-3xl">🎯</span>
          <div className="flex-1">
            <h3 className="font-heading text-base font-bold">Practice</h3>
            <p className="text-sm text-muted-foreground">
              Pick a pack and practice at your own pace
            </p>
          </div>
          <span className="text-muted-foreground">→</span>
        </CardContent>
      </Card>
    </Link>
  );
}
