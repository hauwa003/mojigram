"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { spring } from "@/lib/motion";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-transparent bg-gradient-to-r from-purple/5 via-transparent to-pink/5">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.span
            className="text-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={spring.bouncy}
          >
            🎯
          </motion.span>
          <span className="font-heading text-xl font-bold bg-gradient-to-r from-purple to-pink bg-clip-text text-transparent">
            Mojigram
          </span>
        </Link>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-xl hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </motion.button>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
    </header>
  );
}
