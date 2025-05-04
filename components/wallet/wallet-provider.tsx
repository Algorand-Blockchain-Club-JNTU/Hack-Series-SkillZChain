"use client"

import type React from "react"
import { NetworkId, WalletId, WalletManager, WalletProvider } from "@txnlab/use-wallet-react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { WalletModalProvider } from "./wallet-modal-provider"

// Import the configuration
import { algorandConfig } from "@/utils/api-config"

// Update the wallet manager initialization to use environment variables
const walletManager = new WalletManager({
  wallets: [
    WalletId.DEFLY,
    WalletId.PERA,
    WalletId.EXODUS,
    {
      id: WalletId.LUTE,
      options: {
        siteName: "SkillZChain",
      },
    },
  ],
  defaultNetwork: algorandConfig.network === "mainnet" ? NetworkId.MAINNET : NetworkId.TESTNET,
})

export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider manager={walletManager}>
      <WalletModalProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </WalletModalProvider>
    </WalletProvider>
  )
}
