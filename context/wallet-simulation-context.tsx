"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type WalletSimulationContextType = {
  isSimulatingWallet: boolean
  toggleWalletSimulation: () => void
}

const WalletSimulationContext = createContext<WalletSimulationContextType | undefined>(undefined)

export function WalletSimulationProvider({ children }: { children: ReactNode }) {
  const [isSimulatingWallet, setIsSimulatingWallet] = useState(false)

  // Load simulation state from localStorage on mount
  useEffect(() => {
    const storedValue = localStorage.getItem("skillzchain_wallet_simulation")
    if (storedValue) {
      setIsSimulatingWallet(storedValue === "true")
    }
  }, [])

  // Save simulation state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("skillzchain_wallet_simulation", isSimulatingWallet.toString())
  }, [isSimulatingWallet])

  const toggleWalletSimulation = () => {
    setIsSimulatingWallet((prev) => !prev)
  }

  return (
    <WalletSimulationContext.Provider value={{ isSimulatingWallet, toggleWalletSimulation }}>
      {children}
    </WalletSimulationContext.Provider>
  )
}

export function useWalletSimulation() {
  const context = useContext(WalletSimulationContext)
  if (context === undefined) {
    throw new Error("useWalletSimulation must be used within a WalletSimulationProvider")
  }
  return context
}
