"use client";

import React from "react";

interface WelcomeHeaderProps {
  name?: string;
}

export default function WelcomeHeader({ name = "User" }: WelcomeHeaderProps) {
  return (
    <div className="flex-1">
      <div className="space-y-1">
        <p className="text-white/90 font-bold">Welcome</p>
        <h1
          className="text-white text-2xl font-bold"
          aria-label={`Welcome ${name}`}
        >
          {name}
        </h1>
      </div>
    </div>
  );
}
