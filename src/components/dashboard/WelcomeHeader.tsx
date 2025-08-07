"use client";

import React from "react";

interface WelcomeHeaderProps {
  name?: string;
}

export default function WelcomeHeader({ name = "User" }: WelcomeHeaderProps) {
  return (
    <div className="flex-1">
      <div className="space-y-1">
        <p className="text-white/90 text-base font-mono font-bold ">Welcome</p>
        <h1
          className="text-white font-mono text-3xl font-bold tracking-tight"
          aria-label={`Welcome ${name}`}
        >
          {name}
        </h1>
      </div>
    </div>
  );
}
