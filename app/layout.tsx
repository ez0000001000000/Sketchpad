import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { ThemeSwitcher } from "@/components/theme-switcher"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} antialiased`}>
      <body className="font-mono">
        <Suspense>{children}</Suspense>
        <ThemeSwitcher />
      </body>
    </html>
  )
}
