"use client";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import { UserProvider } from "@/context/userContext";
import RainbowKitProviderWrapper from "@/providers/RainbowKitProviderWrapper";
import { AuthKitProvider } from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";

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
