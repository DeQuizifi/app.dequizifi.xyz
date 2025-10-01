import type { Metadata } from "next";
import { Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";


const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeQuizifi",
  description: "The ultimate quiz platform",
  keywords: [
    "quiz",
    "platform",
    "trivia",
    "questions",
    "games",
    "DeQuizifi",
    "online quiz",
    "knowledge",
    "competition",
    "education"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
