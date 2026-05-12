"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { spring } from "@/lib/motion";

export function PracticeModeCard() {
  return (
    <Link href="/play/practice">
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98, x: 2, y: 2 }}
        transition={spring.bouncy}
      >
        <Card className="border-3 border-foreground shadow-brutal-green">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-light border-2 border-foreground flex items-center justify-center shrink-0">
              <span className="text-xl">🎯</span>
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-base font-extrabold">Practice</h3>
              <p className="text-sm text-muted-foreground">
                Pick a pack and go at your own pace
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-foreground" />
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
