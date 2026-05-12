"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function MyMixCard() {
  return (
    <Link href="/play/my-mix">
      <Card className="hover:shadow-md transition-shadow border-2 border-border">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-pink-light flex items-center justify-center shrink-0">
            <span className="text-xl">🎨</span>
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-base font-bold">My Mix</h3>
            <p className="text-sm text-muted-foreground">
              Pick your favorite packs to play
            </p>
          </div>
          <span className="text-muted-foreground">→</span>
        </CardContent>
      </Card>
    </Link>
  );
}
