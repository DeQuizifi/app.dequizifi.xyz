"use client";

import React from "react";

interface WelcomeHeaderProps {
  name?: string;
}

export default function WelcomeHeader({ name = "User" }: WelcomeHeaderProps) {
  return (
    <div className="flex-1">
      <div className="space-y-1">
          <p className="text-welcome-foreground-90 font-bold font-mono">Welcome</p>
          <h1
            className="text-welcome-foreground text-2xl font-mono font-bold"
          aria-label={`Welcome ${name}`}
        >
          {name}
        </h1>
      </div>
    </div>
  );
}
