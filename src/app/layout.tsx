import { Inter, JetBrains_Mono } from "next/font/google";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

import { Metadata } from "next";
import "./globals.css";

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "One Time Secret",
  description: "Share a one time secret",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="en" className={`${jetbrains_mono.variable} ${inter.variable}`}>
        <body
          className={`h-screen font-sans text-gray-700 dark:text-gray-200 bg-indigo-50 dark:bg-indigo-950 `}>
          <div className="relative md:flex flex-1 flex-col items-center justify-center py-0 md:py-16">
            <Providers>{children}</Providers>
          </div>
          <Toaster />
        </body>
      </html>
    </>
  );
}
