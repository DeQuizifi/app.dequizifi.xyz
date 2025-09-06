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

  return <SignInButton nonce={nonce} />;
};

export default FarcasterSignInButton;
