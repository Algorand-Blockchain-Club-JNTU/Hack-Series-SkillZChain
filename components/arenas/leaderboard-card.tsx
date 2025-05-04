"use client"

import { Trophy } from "lucide-react"

interface Player {
  rank: number
  username: string
  avatar?: string
  earnings?: number
  games?: number
  winRate?: number
  name?: string
  score?: number
  change?: "up" | "down" | "same"
}

interface LeaderboardCardProps {
  player: Player
}

export function LeaderboardCard({ player }: LeaderboardCardProps) {
  // Use username or name, whichever is available
  const displayName = player.username || player.name || "Player"

  return (
    <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 md:p-4 hover:bg-slate-800 transition-colors">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex-shrink-0 w-6 md:w-8 text-center">
          {player.rank === 1 ? (
            <Trophy className="h-5 w-5 md:h-6 md:w-6 text-amber-400 mx-auto" />
          ) : player.rank === 2 ? (
            <Trophy className="h-4 w-4 md:h-5 md:w-5 text-slate-300 mx-auto" />
          ) : player.rank === 3 ? (
            <Trophy className="h-4 w-4 md:h-5 md:w-5 text-amber-700 mx-auto" />
          ) : (
            <span className="text-sm md:text-base text-slate-400">{player.rank}</span>
          )}
        </div>
        <div className="relative h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
          {/* Placeholder for avatar */}
          <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
            {displayName.substring(0, 2).toUpperCase()}
          </div>
        </div>
        <div className="font-medium text-sm md:text-base">{displayName}</div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="text-amber-400 font-semibold text-sm md:text-base">{player.score || player.earnings || 0}</div>
        {player.change && (
          <div
            className={`text-xs md:text-sm ${
              player.change === "up" ? "text-green-400" : player.change === "down" ? "text-red-400" : "text-slate-400"
            }`}
          >
            {player.change === "up" ? "↑" : player.change === "down" ? "↓" : "–"}
          </div>
        )}
      </div>
    </div>
  )
}
