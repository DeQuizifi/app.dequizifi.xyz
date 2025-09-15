"use client";

import InviteFriendsBanner from "@/components/dashboard/InviteFriendsBanner";

interface InviteFriendsProviderProps {
  onInvite?: () => void;
  onDismiss?: () => void;
}

export default function InviteFriendsProvider({
  onInvite,
  onDismiss,
}: InviteFriendsProviderProps) {
  const handleInvite = () => {
    if (onInvite) {
      onInvite();
    } else {
      // Default analytics tracking for invite action
      console.log("User clicked invite friends");
    }
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      // Default analytics tracking for banner dismiss
      console.log("User dismissed invite banner");
    }
  };

  return (
    <InviteFriendsBanner onInvite={handleInvite} onDismiss={handleDismiss} />
  );
}
