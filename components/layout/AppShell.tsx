"use client";

import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 w-full max-w-lg mx-auto px-4 pb-20 pt-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
