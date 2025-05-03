import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProviderWrapper } from "@/components/wallet/wallet-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "SkillZChain - Compete. Earn. Own Your Victory.",
  description: "Decentralized skill-based games. Play to earn on-chain rewards.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <WalletProviderWrapper>{children}</WalletProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
