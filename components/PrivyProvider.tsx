"use client"

import type React from "react"

import { PrivyProvider } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"

export default function PrivyProviderWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      onSuccess={() => router.push("/minter")}
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

