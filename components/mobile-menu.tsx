"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  onAboutClickAction: () => void
  onHowItWorksClick: () => void
  walletConnected: boolean
  onConnectWallet: () => void
}

export function MobileMenu({ onAboutClickAction, onHowItWorksClick, walletConnected, onConnectWallet }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const handleAboutClick = () => {
    onAboutClickAction()
    closeMenu()
  }

  const handleHowItWorksClick = () => {
    onHowItWorksClick()
    closeMenu()
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-white focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={closeMenu}
      />

      {/* Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-3/4 bg-slate-900 z-50 p-6 shadow-xl transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end mb-8">
          <button onClick={closeMenu} className="p-2 text-white focus:outline-none" aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          <Button onClick={handleAboutClick} className="text-white text-lg font-medium py-2 border-b border-slate-800">
            About Us
          </Button>
          <Button
            onClick={handleHowItWorksClick}
            className="text-white text-lg font-medium py-2 border-b border-slate-800"
          >
            How It Works
          </Button>
          <Link
            href="/arenas"
            onClick={closeMenu}
            className="text-white text-lg font-medium py-2 border-b border-slate-800"
          >
            Battlegrounds
          </Link>
          <div className="mt-6">
            <Button
              onClick={() => {
                onConnectWallet()
                closeMenu()
              }}
              className="w-full bg-gradient-to-r from-yellow-400 to-purple-600 hover:from-yellow-500 hover:to-purple-700 text-black font-medium py-6"
            >
              {walletConnected ? "Wallet Connected" : "Connect Wallet"}
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}
