'use client';

import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
    const pathname = usePathname(); // 현재 경로를 가져옴

    return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AnimatePresence initial={false}>
              <SessionProvider key={pathname}>
                  {children}
              </SessionProvider>
              <div id="modal-root"></div>
          </AnimatePresence>
      </body>
    </html>
  );
}
