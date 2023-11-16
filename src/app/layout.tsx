import "./globals.css";
import React, { PropsWithChildren } from "react";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${jetbrains_mono.variable} font-mono relative bg-indigo-700 sm:bg-gray-900 text-gray-700 dark:text-gray-200 text-md h-screen flex flex-1 flex-col overflow-auto`}
        >
          <div className="relative sm:flex flex-1 flex-col items-center justify-center py-0 sm:py-16">
            {children}
          </div>
          <Toaster></Toaster>
        </body>
      </Providers>
    </html>
  );
}
