"use client";

import React, { useCallback } from "react";
import InviteFriendsBanner from "@/components/dashboard/InviteFriendsBanner";

interface InviteFriendsProviderProps {
  /** Called when user clicks the invite action */
  onInvite?: () => void;
  /** Called when user dismisses the banner */
  onDismiss?: () => void;
}

/**
 * Lightweight provider that wires optional callbacks to the InviteFriendsBanner.
 * Handlers are memoized to avoid unnecessary re-renders of the banner.
 */
export default function InviteFriendsProvider({
  onInvite,
  onDismiss,
}: InviteFriendsProviderProps) {
  // Stable invite handler — calls provided callback or fallback analytics
  const handleInvite = useCallback(() => {
    if (typeof onInvite === "function") {
      onInvite();
      return;
    }
    // Fallback instrumentation (keep side-effect minimal here)
    // Replace with real analytics call when available
    console.log("InviteFriends: default invite action triggered");
  }, [onInvite]);

  // Stable dismiss handler — calls provided callback or fallback analytics
  const handleDismiss = useCallback(() => {
    if (typeof onDismiss === "function") {
      onDismiss();
      return;
    }
    console.log("InviteFriends: banner dismissed (default)");
  }, [onDismiss]);

  return (
    <InviteFriendsBanner onInvite={handleInvite} onDismiss={handleDismiss} />
  );
}
