import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from "next/font/google";

const defaultFont = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ihsan Solusi Informatika',
  description: 'Ihsan Solusi Informatika - Software House & IT Consultant -- Coding Test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={defaultFont.className + " bg-white"} lang="en">
      <body className="flex h-screen flex-col bg-white">{children}</body>
    </html>
  )
}
