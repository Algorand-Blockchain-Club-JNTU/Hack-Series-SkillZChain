"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  History,
  Gift,
  Trophy,
  Home,
  Gamepad2,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWalletSimulation } from "@/context/wallet-simulation-context"

interface LeftNavbarProps {
  walletConnected: boolean
}

export function LeftNavbar({ walletConnected }: LeftNavbarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)
  const { isSimulatingWallet } = useWalletSimulation()

  // Consider a wallet connected if either real wallet is connected or simulation is active
  const effectiveWalletConnected = walletConnected || isSimulatingWallet

  // Check window width on mount and resize
  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true)
      }
    }

    // Initial check
    checkWidth()

    // Add event listener
    window.addEventListener("resize", checkWidth)

    // Cleanup
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

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
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 bg-slate-900/70 backdrop-blur-md border-r border-slate-800/50 pt-20 hidden md:flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <Button
        onClick={() => setCollapsed(!collapsed)}
        variant="ghost"
        size="sm"
        className={cn(
          "absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-slate-800 border border-slate-700 p-0 flex items-center justify-center",
          "hover:bg-slate-700 hover:border-slate-600",
        )}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      <div className="flex flex-col h-full">
        <div className="flex-1 px-2 py-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isDisabled = item.requiresWallet && !effectiveWalletConnected
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={isDisabled ? "#" : item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-purple-500/20 text-purple-300"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white",
                    isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-400",
                    collapsed ? "justify-center" : "",
                  )}
                  onClick={(e) => {
                    if (isDisabled) {
                      e.preventDefault()
                    }
                  }}
                  title={item.name}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  {!collapsed && (
                    <>
                      <span className="truncate">{item.name}</span>
                      {isDisabled && (
                        <span className="ml-auto text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">Connect</span>
                      )}
                    </>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* SKILLZ Balance at Bottom */}
        <div className={cn("p-4 border-t border-slate-800/50", collapsed ? "px-2" : "")}>
          <div
            className={cn(
              "bg-slate-800/50 rounded-lg p-3 flex items-center",
              collapsed ? "justify-center" : "justify-between",
            )}
          >
            <div className={cn("flex items-center gap-2", collapsed ? "flex-col" : "")}>
              <span className="text-2xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text font-bold">
                Z
              </span>
              {!collapsed && (
                <div>
                  <div className="text-xs text-slate-400">Your Balance</div>
                  {effectiveWalletConnected ? (
                    <div className="text-yellow-400 font-medium">
                      1,250 SKILLZ {isSimulatingWallet && <span className="text-xs">[SIM]</span>}
                    </div>
                  ) : (
                    <div className="text-slate-500">Connect wallet</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
