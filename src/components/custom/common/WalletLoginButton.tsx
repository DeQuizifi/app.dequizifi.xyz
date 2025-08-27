"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

function WalletLoginButton() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      fetch("/api/walletlogin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ walletAddress: address }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errText = await res.text().catch(() => "");
            throw new Error(`Wallet login failed: ${res.status} ${errText}`);
          }
          // Token is set via HttpOnly cookie by the server.
          console.log("Wallet synced.");
          return res.json().catch(() => ({}));
        })
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
