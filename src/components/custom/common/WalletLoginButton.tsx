"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

function WalletLoginButton() {
  return (
    <div className="px-4 mt-40"> {/* or mt-40 for spacing */}
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, mounted }) => {
          return (
            <button
              onClick={openConnectModal}
              disabled={!mounted}
              className="w-full bg-white text-black rounded-full shadow-lg hover:bg-gray-100 py-4 text-lg font-semibold transition"
            >
              {account ? `Connected: ${account.displayName}` : "Login with Wallet"}
            </button>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}

export default WalletLoginButton;
