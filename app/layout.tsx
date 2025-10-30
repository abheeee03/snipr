import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Snipr",
  description: "Long Videos, in Short",
};

const satoshi = localFont({
  src: '../public/font.ttf'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.className} antialiased`}
      >
        <Toaster position="top-right" />        
        {children}
      </body>
    </html>
  );
}
