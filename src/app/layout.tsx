import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from 'next/font/google'

import { Chivo } from 'next/font/google'
import { Libre_Franklin } from 'next/font/google'

const chivo = Chivo({
  subsets: ['latin'],
  display: 'swap',
})

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
})

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: "Blurhash Generator",
  description: "Generate a blurhash for an image url",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          // "min-h-screen bg-background font-sans antialiased",
          // chivo.className,
          // libreFranklin.className,
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >{children}</body>
    </html>
  );
}
