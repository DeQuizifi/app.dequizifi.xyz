import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BottomNavbar from "@/components/layout/BottomNavbar";
import "./globals.css";
import RainbowKitProviderWrapper from "@/providers/RainbowKitProviderWrapper";

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
        <div className="max-h-screen flex flex-col">
          {/* Main content area with bottom padding for navbar */}
          <main className="flex-1">
            {children}
          </main>
          {/* Bottom Navigation */}
          <BottomNavbar />
        </div>
        </RainbowKitProviderWrapper>
      </body>
    </html>
  );
}
