import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RainbowKitProviderWrapper from "@/providers/RainbowKitProviderWrapper";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import { UserProvider } from "@/context/userContext";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RainbowKitProviderWrapper>
          <UserProvider>
          <div className="max-h-screen flex flex-col">
            {/* Main content area with bottom padding for navbar */}
            <main className="flex-1">{children}</main>
            {/* Conditional Bottom Navigation */}
            <ConditionalNavbar />
          </div>
          </UserProvider>
        </RainbowKitProviderWrapper>
      </body>
    </html>
  );
}
