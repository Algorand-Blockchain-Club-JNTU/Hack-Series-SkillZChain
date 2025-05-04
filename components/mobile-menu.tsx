"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, TrendingUp, History, Gift, Trophy, Gamepad2, Users, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"
import { useWalletSimulation } from "@/context/wallet-simulation-context"

interface MobileMenuProps {
  onAboutClick?: () => void
  onHowItWorksClick?: () => void
  walletConnected: boolean
  onConnectWallet?: () => void
}

export function MobileMenu({ onAboutClick, onHowItWorksClick, walletConnected, onConnectWallet }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isSimulatingWallet } = useWalletSimulation()

  // Consider a wallet connected if either real wallet is connected or simulation is active
  const effectiveWalletConnected = walletConnected || isSimulatingWallet

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const handleAboutClick = () => {
    if (onAboutClick) onAboutClick()
    closeMenu()
  }

  const handleHowItWorksClick = () => {
    if (onHowItWorksClick) onHowItWorksClick()
    closeMenu()
  }

  const navItems = [
    {
      name: "Home",
      href: "/arenas",
      icon: <Home className="h-5 w-5" />,
      requiresWallet: false,
    },
    {
      name: "Trending",
      href: "/arenas/trending",
      icon: <TrendingUp className="h-5 w-5" />,
      requiresWallet: false,
    },
    {
      name: "Game History",
      href: "/arenas/history",
      icon: <History className="h-5 w-5" />,
      requiresWallet: true,
    },
    {
      name: "Rewards",
      href: "/arenas/rewards",
      icon: <Gift className="h-5 w-5" />,
      requiresWallet: true,
    },
    {
      name: "Leaderboard",
      href: "/arenas/leaderboard",
      icon: <Trophy className="h-5 w-5" />,
      requiresWallet: false,
    },
    {
      name: "Solo Games",
      href: "/arenas/solo",
      icon: <Gamepad2 className="h-5 w-5" />,
      requiresWallet: false,
    },
    {
      name: "Multiplayer",
      href: "/arenas/multiplayer",
      icon: <Users className="h-5 w-5" />,
      requiresWallet: false,
    },
    {
      name: "Settings",
      href: "/arenas/settings",
      icon: <Settings className="h-5 w-5" />,
      requiresWallet: true,
    },
    {
      name: "Help",
      href: "/arenas/help",
      icon: <HelpCircle className="h-5 w-5" />,
      requiresWallet: false,
    },
  ]

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-white focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Full-screen modal with solid background */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900" style={{ backgroundColor: "#0f172a" }}>
          {/* Header with close button */}
          <div className="flex items-center justify-end p-4 border-b border-slate-800">
            <button onClick={closeMenu} className="p-2 text-white focus:outline-none" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu content with solid background */}
          <div className="flex-1 overflow-y-auto bg-slate-900" style={{ backgroundColor: "#0f172a" }}>
            <nav className="flex flex-col gap-4 p-6">
              {/* Main navigation items */}
              {navItems.map((item) => {
                const isDisabled = item.requiresWallet && !effectiveWalletConnected
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={isDisabled ? "#" : item.href}
                    onClick={(e) => {
                      if (isDisabled) {
                        e.preventDefault()
                      } else {
                        closeMenu()
                      }
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors bg-slate-800/50",
                      isActive
                        ? "bg-purple-500/20 text-purple-300"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white",
                      isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-400",
                    )}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <span>{item.name}</span>
                    {isDisabled && (
                      <span className="ml-auto text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">Connect</span>
                    )}
                  </Link>
                )
              })}

              {/* Additional links */}
              {onAboutClick && (
                <Button
                  onClick={handleAboutClick}
                  className="text-white text-lg font-medium py-2 border-b border-slate-800 justify-start bg-slate-800/50"
                  variant="ghost"
                >
                  About Us
                </Button>
              )}
              {onHowItWorksClick && (
                <Button
                  onClick={handleHowItWorksClick}
                  className="text-white text-lg font-medium py-2 border-b border-slate-800 justify-start bg-slate-800/50"
                  variant="ghost"
                >
                  How It Works
                </Button>
              )}
            </nav>
          </div>

          {/* Footer with connect wallet button */}
          <div className="p-6 border-t border-slate-800 bg-slate-900" style={{ backgroundColor: "#0f172a" }}>
            <div onClick={closeMenu}>
              <ConnectWalletButton
                className="w-full bg-gradient-to-r from-yellow-400 to-purple-600 hover:from-yellow-500 hover:to-purple-700 text-black font-medium py-6"
                fullWidth={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
