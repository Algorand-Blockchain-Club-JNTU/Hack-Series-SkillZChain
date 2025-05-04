"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, TrendingUp, Gamepad2, Users, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/arenas",
      icon: Home,
    },
    {
      name: "Trending",
      href: "/arenas/trending",
      icon: TrendingUp,
    },
    {
      name: "Solo",
      href: "/arenas/solo",
      icon: Gamepad2,
    },
    {
      name: "Multiplayer",
      href: "/arenas/multiplayer",
      icon: Users,
    },
    {
      name: "Leaderboard",
      href: "/arenas/leaderboard",
      icon: Trophy,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="grid grid-cols-5 bg-slate-900 border-t border-slate-800" style={{ backgroundColor: "#0f172a" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 text-xs",
                isActive ? "text-purple-400" : "text-slate-400",
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive ? "text-purple-400" : "text-slate-400")} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
      {/* Add safe area padding for iOS devices */}
      <div className="h-6 bg-slate-900" style={{ backgroundColor: "#0f172a" }}></div>
    </div>
  )
}
