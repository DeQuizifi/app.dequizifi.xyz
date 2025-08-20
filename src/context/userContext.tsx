"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAccount } from "wagmi";

type UserContextType = {
  username: string | null;
  balance: number | null;
};

const UserContext = createContext<UserContextType>({
  username: null,
  balance: null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();
  const [username, setUsername] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!isConnected || !address) {
      // Reset on disconnect to avoid showing stale data
      setUsername(null);
      setBalance(null);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const run = async () => {
      try {
        const [headerRes, balanceRes] = await Promise.all([
          fetch("/api/headerandbalance/header", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ walletAddress: address }),
            signal,
          }),
          fetch("/api/headerandbalance/balance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ walletAddress: address }),
            signal,
          }),
        ]);
        if (!headerRes.ok) throw new Error("Failed to fetch username");
        if (!balanceRes.ok) throw new Error("Failed to fetch balance");

        const headerData = await headerRes.json();
        const balanceData = await balanceRes.json();

        setUsername(
          typeof headerData?.username === "string" ? headerData.username : null
        );
        setBalance(
          typeof balanceData?.balance === "number" ? balanceData.balance : null
        );
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.error(err);
        // On failure, clear values to avoid showing stale info
        setUsername(null);
        setBalance(null);
      }
    };

    run();
    return () => controller.abort();
  }, [address, isConnected]);

  return (
    <UserContext.Provider value={{ username, balance }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for convenience
export const useUser = () => useContext(UserContext);
