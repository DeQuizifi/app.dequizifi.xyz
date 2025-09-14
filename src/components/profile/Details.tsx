"use client";
import Spinner from "@/components/ui/Spinner";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";

interface DetailsProps {
  username: string;
  walletAddress?: string;
  joinedDate?: string;
  favQuizTopic?: string;
}

function Details(props: Partial<DetailsProps>) {
  const { address, isConnected } = useAccount();
  const {
    username: propUsername,
    walletAddress: propWalletAddress,
    joinedDate: propJoinedDate,
    favQuizTopic: propFavQuizTopic,
  } = props ?? {};
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

  const hasFallbackProps = Boolean(
    propUsername || propWalletAddress || propJoinedDate || propFavQuizTopic
  );

  if (!details && !hasFallbackProps) {
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <Spinner size={64} />
      </div>
    );
  }
  return (
    <div className="bg-card rounded-t-3xl min-h-[60vh] p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-card-foreground">
            Details
          </h2>
          <Button>
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
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Display Name
            </label>
            <div className="text-base font-medium text-foreground">
              {details?.username ?? propUsername ?? "-"}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Wallet Address
            </label>
            <div className="text-base font-medium text-foreground">
              {details?.walletAddress ?? propWalletAddress
                ? `${(details?.walletAddress ?? propWalletAddress)?.slice(
                    0,
                    6
                  )}...${(details?.walletAddress ?? propWalletAddress)?.slice(
                    -4
                  )}`
                : "-"}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Joined</label>
            <div className="text-base font-medium text-foreground">
              {details?.joinedDate ?? propJoinedDate ?? "-"}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Favorite Quiz Topic
            </label>
            <div className="text-base font-medium text-foreground">
              {details?.favQuizTopic ?? propFavQuizTopic ?? "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
