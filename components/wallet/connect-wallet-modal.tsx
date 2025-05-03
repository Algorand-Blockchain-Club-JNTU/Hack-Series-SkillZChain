"use client"

import { type Wallet, useWallet } from "@txnlab/use-wallet-react"
import { toast } from "react-toastify"
import { X } from "lucide-react"

const ConnectWalletModal = ({
  wallets,
  isOpen,
  onClose,
}: {
  wallets: Wallet[]
  isOpen: boolean
  onClose: () => void
}) => {
  const { activeAccount } = useWallet()

  if (!isOpen) return null

  const handleWalletClick = async (wallet: Wallet) => {
    try {
      if (wallet.isConnected) {
        await wallet.setActive()
        toast.success("Wallet set as active")
      } else {
        await wallet.connect()
        toast.success("Wallet connected successfully")
      }
      onClose()
    } catch (error) {
      console.error(error)
      toast.error("Failed to connect wallet")
    }
  }

  const disconnectWallets = async () => {
    try {
      for (const wallet of wallets) {
        if (wallet.isConnected) {
          await wallet.disconnect()
        }
      }
      toast.success("Disconnected from all wallets")
      onClose()
    } catch (error) {
      console.error(error)
      toast.error("Failed to disconnect wallets")
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-slate-900 rounded-lg shadow-lg w-full max-w-md p-6 border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Connect to a wallet</h3>
          <button className="text-slate-400 hover:text-white transition-colors" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {wallets.map((wallet) => (
            <div
              onClick={() => handleWalletClick(wallet)}
              key={wallet.id}
              className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-slate-800 transition-colors ${
                wallet.activeAccount ? "border-purple-500 bg-slate-800/50" : "border-slate-700"
              }`}
            >
              <div className="flex flex-col">
                <span className="font-medium text-white">{wallet.metadata.name}</span>
                {wallet.activeAccount && (
                  <span className="text-sm text-slate-400">
                    {`${wallet.activeAccount.address.slice(0, 6)}...${wallet.activeAccount.address.slice(-6)}`}
                  </span>
                )}
                {wallet.isActive && <span className="text-xs text-purple-400 mt-1">Active</span>}
              </div>
              <img
                src={wallet.metadata.icon || "/placeholder.svg?height=32&width=32"}
                alt={`${wallet.metadata.name} Icon`}
                className="h-8 w-8"
              />
            </div>
          ))}
        </div>

        {activeAccount && (
          <div
            onClick={disconnectWallets}
            className="flex items-center justify-center p-3 rounded-lg border border-red-500/50 cursor-pointer hover:bg-red-900/20 transition-colors text-red-400 hover:text-red-300 mb-6"
          >
            <span>Disconnect All Wallets</span>
          </div>
        )}

        <div className="pt-4 border-t border-slate-700 text-sm text-slate-400 text-center">
          <span>New to Algorand? </span>
          <a
            href="https://algorand.com/wallets"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Learn more about wallets
          </a>
        </div>
      </div>
    </div>
  )
}

export default ConnectWalletModal
