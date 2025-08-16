"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { connectors } = getDefaultWallets({
  appName: "DeQuizifi",
  projectId: "YOUR_PROJECT_ID", // Replace with your WalletConnect project ID if needed
});

const config = createConfig({
  chains: [base],
  connectors,
  transports: {
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function RainbowKitProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
