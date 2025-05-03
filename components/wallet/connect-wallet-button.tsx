"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useWallet } from "@txnlab/use-wallet-react"
import ConnectWalletModal from "./connect-wallet-modal"

export function ConnectWalletButton({
  className,
  variant = "default",
  size = "default",
  fullWidth = false,
  showIcon = true,
}: {
  className?: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  fullWidth?: boolean
  showIcon?: boolean
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { activeAccount, wallets } = useWallet()

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const truncateAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  // Default button style for navbar
  let buttonStyle =
    "bg-gradient-to-r from-yellow-400 to-purple-600 hover:from-yellow-500 hover:to-purple-700 text-black font-medium"

  // Override with custom className if provided
  if (className) {
    buttonStyle = className
  }

  return (
    <>
      <Button
        onClick={openModal}
        className={buttonStyle}
        variant={variant}
        size={size}
        style={fullWidth ? { width: "100%" } : undefined}
      >
        {showIcon && <Wallet className="mr-2 h-4 w-4" />}
        {activeAccount ? truncateAddress(activeAccount.address) : "Connect Wallet"}
      </Button>
      <ConnectWalletModal wallets={wallets} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
