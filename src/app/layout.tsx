import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Chat Bot Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <div className="min-h-screen flex flex-col ">
        <header className="h-24 flex items-center justify-center text-center w-full border-b border-b-zinc-200 bg-blue-500 text-white">
          <h1 className="font-bold text-2xl uppercase">Chat Bot</h1>
        </header>
        {children}
        </div>
      </body>
    </html>
  );
}
