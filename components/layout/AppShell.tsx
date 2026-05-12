"use client";

import { motion } from "framer-motion";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { fadeInUp } from "@/lib/motion";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <motion.main
        className="flex-1 w-full max-w-lg mx-auto px-4 pb-20 pt-4"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {children}
      </motion.main>
      <BottomNav />
    </div>
  );
}
