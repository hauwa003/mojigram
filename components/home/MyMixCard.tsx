"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { spring } from "@/lib/motion";

export function MyMixCard() {
  return (
    <Link href="/play/my-mix">
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={spring.bouncy}
      >
        <Card className="border-2 border-border shadow-pink hover:shadow-md transition-shadow">
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
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
