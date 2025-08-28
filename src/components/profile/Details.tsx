"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface DetailsProps {
  username: string;
  walletAddress?: string;
  joinedDate?: string;
  favQuizTopic?: string;
}

function Details({
  username,
  walletAddress,
  joinedDate,
  favQuizTopic,
}: DetailsProps) {
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<DetailsProps | null>(null);

  useEffect(() => {
    if (!isConnected) {
      setError("Wallet is not connected");
      setDetails(null);
      return;
    }
    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch(`/api/profile/details`, {
          signal: controller.signal,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data?.error ?? "Failed to fetch details");
          setDetails(null);
          return;
        }
        setDetails(data.user || data);
        setError(null);
      } catch (err: unknown) {
        if ((err as Error & { name?: string })?.name === "AbortError") return;
        console.error(err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch details"
        );
        setDetails(null);
      }
    };
    run();
    return () => controller.abort();
  }, [address, isConnected]);

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  if (!details) {
    return null;
  }
  return (
    <div className="bg-white rounded-t-3xl min-h-[60vh] p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Details</h2>
          <button className="text-blue-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Display Name</label>
            <div className="text-base font-medium text-gray-900">
              {details.username}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Wallet Address</label>
            <div className="text-base font-medium text-gray-900">
              {details.walletAddress
                ? `${details.walletAddress.slice(
                    0,
                    6
                  )}...${details.walletAddress.slice(-4)}`
                : "-"}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Joined</label>
            <div className="text-base font-medium text-gray-900">
              {details.joinedDate}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Favorite Quiz Topic</label>
            <div className="text-base font-medium text-gray-900">
              {details.favQuizTopic}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
