import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alfara Nafi Dinara — Portfolio",
  description: "Software engineer portfolio for products across software, AI, blockchain, and startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${atkinson.variable} ${hanken.variable} ${plexMono.variable} scroll-smooth antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
