"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAccount } from "wagmi";

type UserContextType = {
  username: string | null;
  balance: number | null;
};

const UserContext = createContext<UserContextType>({ username: null, balance: null });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();
  const [username, setUsername] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!isConnected || !address) return;

    // Fetch username
    const fetchHeader = async () => {
      try {
        const res = await fetch("/api/headerandbalance/header", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress: address }),
        });
        if (!res.ok) throw new Error("Failed to fetch username");
        const data = await res.json();
        setUsername(data.username ?? null);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch balance
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/headerandbalance/balance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ walletAddress: address }),
        });
        if (!res.ok) throw new Error("Failed to fetch balance");
        const data = await res.json();
        setBalance(data.balance ?? null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHeader();
    fetchBalance();
  }, [address, isConnected]);

  return (
    <UserContext.Provider value={{ username, balance }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for convenience
export const useUser = () => useContext(UserContext);
