"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useWallet } from "@txnlab/use-wallet-react"
import ConnectWalletModal from "./connect-wallet-modal"

// Create context
type WalletModalContextType = {
  openWalletModal: () => void
  closeWalletModal: () => void
}

const WalletModalContext = createContext<WalletModalContextType | undefined>(undefined)

// Provider component
export function WalletModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { wallets } = useWallet()

  const openWalletModal = () => setIsModalOpen(true)
  const closeWalletModal = () => setIsModalOpen(false)

  return (
    <WalletModalContext.Provider value={{ openWalletModal, closeWalletModal }}>
      {children}
      <ConnectWalletModal wallets={wallets} isOpen={isModalOpen} onClose={closeWalletModal} />
    </WalletModalContext.Provider>
  )
}

// Custom hook to use the wallet modal
export function useWalletModal() {
  const context = useContext(WalletModalContext)
  if (context === undefined) {
    throw new Error("useWalletModal must be used within a WalletModalProvider")
  }
  return context
}
