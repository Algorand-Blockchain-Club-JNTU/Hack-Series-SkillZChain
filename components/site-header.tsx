"use client"

import Link from "next/link"
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"
import { MobileMenu } from "@/components/mobile-menu"
import { useWallet } from "@txnlab/use-wallet-react"
import { useWalletSimulation } from "@/context/wallet-simulation-context"

export function SiteHeader() {
  const { activeAccount } = useWallet()
  const { isSimulatingWallet } = useWalletSimulation()
  const walletConnected = !!activeAccount || isSimulatingWallet

  return (
    <header className="border-b border-slate-800/40 bg-[#0f1218]/90 backdrop-blur-xl fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold text-white">
            Skill
            <span className="text-2xl md:text-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
              Z
            </span>
            Chain
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {walletConnected ? (
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
              <span className="text-2xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text font-bold">
                Z
              </span>
              <span className="text-amber-400 font-medium">
                1,250 SKILLZ {isSimulatingWallet && <span className="text-xs">[SIM]</span>}
              </span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
              <span className="text-slate-400 text-sm">Connect wallet to view balance</span>
            </div>
          )}
          <div className="hidden md:block">
            <ConnectWalletButton className="bg-gradient-to-r from-yellow-400 to-purple-600 hover:from-yellow-500 hover:to-purple-700 text-black font-medium" />
          </div>
          <MobileMenu walletConnected={walletConnected} />
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300"></div>
    </header>
  )
}
