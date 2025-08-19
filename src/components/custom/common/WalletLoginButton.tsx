"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

function WalletLoginButton() {
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
