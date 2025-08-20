"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

function WalletLoginButton() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      //fetching to walletlogin route
      fetch("/api/walletlogin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ walletAddress: address }),
      })
        .then(async (res) => {
          const text = await res.text();
          if (!text) return {};
          return JSON.parse(text);
        })
        .then((data) => console.log("User synced:", data))
        .catch((err) => console.error(err));
    }
  }, [isConnected, address]);

  return (
    <div className="px-4 mt-40">
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, mounted }) => {
          return (
            <button
              onClick={openConnectModal}
              disabled={!mounted}
              className="w-full bg-white text-muted-foreground rounded-full shadow-lg hover:bg-gray-100 py-4 text-lg  transition"
            >
              {account
                ? `Connected: ${account.displayName}`
                : "LOGIN WITH WALLET"}
            </button>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}

export default WalletLoginButton;
