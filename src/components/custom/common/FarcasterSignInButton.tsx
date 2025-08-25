"use client";

import { SignInButton } from "@farcaster/auth-kit";
import React from "react";

type FarcasterSignInButtonProps = {
  // Server-generated, single-use nonce. Do NOT pass constants.
  nonce: string;
};

const FarcasterSignInButton: React.FC<FarcasterSignInButtonProps> = ({
  nonce,
}) => {
  if (!nonce || nonce === "sample-nonce-value") {
    console.warn(
      "[FarcasterSignInButton] Invalid nonce passed. Ensure server-generated, single-use nonce."
    );
  }

  return (
    <div className="px-4">
      <div className="w-full [&>button]:w-full [&>button]:bg-white [&>button]:text-muted-foreground [&>button]:rounded-full [&>button]:shadow-lg [&>button]:hover:bg-gray-100 [&>button]:py-4 [&>button]:text-lg [&>button]:transition [&>button]:border-0">
        <SignInButton nonce={nonce} />
      </div>
    </div>
  );
};

export default FarcasterSignInButton;
