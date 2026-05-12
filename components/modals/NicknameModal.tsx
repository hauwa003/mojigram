"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NicknameModalProps {
  open: boolean;
  onSave: (nickname: string) => void;
}

export function NicknameModal({ open, onSave }: NicknameModalProps) {
  const [name, setName] = useState("");

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-sm mx-auto" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Pick a nickname
          </DialogTitle>
          <DialogDescription>
            Enter a name to appear on the leaderboard.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Your nickname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim()) {
                onSave(name.trim());
              }
            }}
          />
          <Button
            className="w-full"
            disabled={!name.trim()}
            onClick={() => onSave(name.trim())}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
