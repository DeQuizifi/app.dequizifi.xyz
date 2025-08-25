"use client";
import "@farcaster/auth-kit/styles.css";
import { AuthKitProvider } from "@farcaster/auth-kit";
import RainbowKitProviderWrapper from "@/providers/RainbowKitProviderWrapper";
import { UserProvider } from "@/context/userContext";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import React from "react";

const config = {
  rpcUrl: "https://mainnet.optimism.io",
  domain: "example.com",
  siweUri: "https://example.com/login",
};

export default function ClientAppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthKitProvider config={config}>
      <RainbowKitProviderWrapper>
        <UserProvider>
          <div className="max-h-screen flex flex-col antialiased">
            <main className="flex-1">{children}</main>
            <ConditionalNavbar />
          </div>
        </UserProvider>
      </RainbowKitProviderWrapper>
    </AuthKitProvider>
  );
}
