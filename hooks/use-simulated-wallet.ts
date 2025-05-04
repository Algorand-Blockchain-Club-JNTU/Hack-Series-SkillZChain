"use client"

import { useWallet } from "@txnlab/use-wallet-react"
import { useWalletSimulation } from "@/context/wallet-simulation-context"

export function useSimulatedWallet() {
  const { activeAccount, ...rest } = useWallet()
  const { isSimulatingWallet } = useWalletSimulation()

  // If we're simulating a wallet connection, return a fake active account
  const simulatedAccount = isSimulatingWallet
    ? {
        address: "SIMULATED7WALLET7ADDRESS7FOR7TESTING7PURPOSES7ONLY7XXXXXXXXXXXXXXX",
        name: "Simulated Wallet",
        authAddr: null,
        providerId: "simulated",
      }
    : null

  // Return either the real active account or the simulated one
  return {
    activeAccount: isSimulatingWallet ? simulatedAccount : activeAccount,
    isSimulatingWallet,
    ...rest,
  }
}
