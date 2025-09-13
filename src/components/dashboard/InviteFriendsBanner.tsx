"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InviteFriendsBannerProps {
  onInvite?: () => void;
  onDismiss?: () => void;
}

export default function InviteFriendsBanner({
  onInvite,
  onDismiss,
}: InviteFriendsBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleInvite = async () => {
    // Try to use native share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join DeQuizifi",
          text: "Join me on DeQuizifi and earn rewards together!",
          url: window.location.origin,
        });
      } catch {
        // User cancelled or share failed, fallback to copy
        await copyInviteLink();
      }
    } else {
      // Fallback to copying link
      await copyInviteLink();
    }

    onInvite?.();
  };

  const copyInviteLink = async () => {
    try {
      const inviteLink = `${window.location.origin}?ref=invite`;
      await navigator.clipboard.writeText(inviteLink);

      // Optional: Show toast notification
      // Could be implemented with a toast library later
      console.log("Invite link copied to clipboard");
    } catch (error) {
      console.error("Failed to copy invite link:", error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="mx-6 my-2 backdrop-blur-sm p-4 shadow-lg rounded-3xl"
      role="banner"
      aria-label="Invite friends promotion"
    >
      <div className="relative rounded-2xl overflow-hidden">
        {/* Close Button - Top Right Corner with transparent background */}
        <button
          onClick={handleDismiss}
          className="absolute top-1 right-1 z-20 p-2 rounded-full transition-colors duration-200 min-w-[44px] min-h-[44px]"
          aria-label="Close invite banner"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="mt-2 relative p-6 text-center">
          {/* Title */}
          <h2 className="font-semibold text-lg mb-2 ">
            MORE FRIENDS, MORE REWARDS
          </h2>

          {/* Description */}
          <p className="text-lg mb-6 leading-relaxed max-w-xs mx-auto font-semibold">
            Invite your friends to take part in challenges and earn rewards
            together
          </p>

          {/* Invite Button */}
          <Button
            onClick={handleInvite}
            className="font-semibold px-8 py-3 rounded-full transition-colors duration-200 min-h-[44px] shadow-lg"
            aria-label="Invite friends to DeQuizifi"
          >
            Invite Friends
          </Button>
        </div>
      </div>
    </div>
  );
}
