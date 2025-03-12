import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import PrivyProviderWrapper from "@/components/PrivyProvider"

export const metadata: Metadata = {
  title: "Soneium Ticket Maker 🎫",
  description: "Web3 App for minting NFTs as tickets for Astar & Soneium events",
    generator: 'Carlos Rodríguez - @Juminstock'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PrivyProviderWrapper>{children}</PrivyProviderWrapper>
      </body>
    </html>
  )
}