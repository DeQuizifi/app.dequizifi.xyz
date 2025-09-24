"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function InviteCard() {
  const [open, setOpen] = React.useState(true);

  if (!open) return null;

  return (
    <div className="relative max-w-md mx-4 md:mx-auto mt-6 rounded-2xl bg-card/20 shadow-lg backdrop-blur-sm p-6">
      <button
        aria-label="Close invite card"
        onClick={() => setOpen(false)}
        className="absolute top-3 right-3 rounded-full p-1 text-primary-foreground"
      >
        <X className="w-6 h-6" />
      </button>

      <h3 className="text-sm font-mono font-semibold text-primary-foreground text-center tracking-widest">
        MORE FRIENDS, MORE REWARDS
      </h3>

      <p className="mt-4 text-center text-primary-foreground font-semibold text-base">
        Invite your friends to take part in challenges and earn rewards together
      </p>

      <div className="mt-6 flex justify-center">
        <Button variant="outline" className="rounded-full">
          Invite Friends
        </Button>
      </div>
    </div>
  );
}

