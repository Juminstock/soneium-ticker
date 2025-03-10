"use client"

import type React from "react"
import { PrivyProvider } from "@privy-io/react-auth"

export default function PrivyProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["google", "twitter", "wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}