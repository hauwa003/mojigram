"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <motion.span
            className="text-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={spring.bouncy}
          >
            🎯
          </motion.span>
          <span className="font-heading text-xl font-extrabold text-foreground">
            Mojigram
          </span>
        </Link>
      </div>
    </header>
  );
}
