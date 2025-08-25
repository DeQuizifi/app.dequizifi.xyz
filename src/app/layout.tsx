
import "@farcaster/auth-kit/styles.css";
import { AuthKitProvider } from "@farcaster/auth-kit";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RainbowKitProviderWrapper from "@/providers/RainbowKitProviderWrapper";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import { UserProvider } from "@/context/userContext";
import ClientAppProvider from "@/components/custom/common/ClientAppProvider";

type FarcasterAuthKitConfig = {
  rpcUrl: string;
  domain: string;
  siweUri: string;
};

const config: FarcasterAuthKitConfig = {
  rpcUrl: "https://mainnet.optimism.io",
  domain: "example.com",
  siweUri: "https://example.com/login",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeQuizifi",
  description: "The ultimate quiz platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientAppProvider>{children}</ClientAppProvider>
      </body>
      </html>
    );
  }