"use client";

import React from "react";

interface WelcomeHeaderProps {
  name?: string;
  address?: string;
}

export default function WelcomeHeader({
  name = "User",
  address,
}: WelcomeHeaderProps) {
  // Helper to slice address (e.g., 0x123...abcd)
  const formatAddress = (addr?: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "000000...0000";

  // Track if component is mounted (client-side)
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex-1">
      <div className="space-y-1">
        <p className="text-welcome-foreground-90 font-bold font-mono">
          Welcome
        </p>
        <h1
          className="text-welcome-foreground text-2xl font-mono font-bold"
          aria-label={`Welcome ${name}`}
        >
          {name}
        </h1>
        <p className="text-white font-bold text-s">
          {mounted && address ? (
            formatAddress(address)
          ) : (
            <span className="opacity-0">000000...0000</span>
          )}
        </p>
      </div>
    </div>
  );
}
