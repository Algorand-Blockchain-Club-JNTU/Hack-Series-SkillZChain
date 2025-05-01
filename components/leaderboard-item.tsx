import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy } from "lucide-react"

interface LeaderboardItemProps {
  rank: number
  username: string
  avatar: string
  earnings: number
  games: number
  winRate: number
}

export function LeaderboardItem({ rank, username, avatar, earnings, games, winRate }: LeaderboardItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/30 transition">
      <div className="flex items-center gap-4">
        <div className="w-8 text-center font-bold">
          {rank === 1 && <Trophy className="h-5 w-5 text-yellow-400 mx-auto" />}
          {rank === 2 && <Trophy className="h-5 w-5 text-slate-300 mx-auto" />}
          {rank === 3 && <Trophy className="h-5 w-5 text-amber-700 mx-auto" />}
          {rank > 3 && <span className="text-slate-400">#{rank}</span>}
        </div>
        <Avatar>
          <AvatarImage src={avatar || "/placeholder.svg"} alt={username} />
          <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{username}</div>
          <div className="text-xs text-slate-400">{games} games played</div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-xs text-slate-400">Win Rate</div>
          <div className="font-semibold">{winRate}%</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Earnings</div>
          <div className="font-semibold text-yellow-400">{earnings.toLocaleString()} SKILLZ</div>
        </div>
      </div>
    </div>
  )
}
