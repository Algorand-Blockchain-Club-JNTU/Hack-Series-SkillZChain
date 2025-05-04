"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gamepad2, Users, TrendingUp, Trophy, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function ArenaMobileNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/arenas",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Trending",
      href: "/arenas/trending",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      name: "Solo",
      href: "/arenas/solo",
      icon: <Gamepad2 className="h-5 w-5" />,
    },
    {
      name: "Multiplayer",
      href: "/arenas/multiplayer",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Leaderboard",
      href: "/arenas/leaderboard",
      icon: <Trophy className="h-5 w-5" />,
    },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-40">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/arenas" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive
                  ? "text-purple-400 bg-slate-800/50"
                  : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/30",
              )}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
