"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Trophy, Clock } from "lucide-react"
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"

interface TrendingGameProps {
  game: {
    id: number
    title: string
    description: string
    image: string
    category: string
    type: string
    players: string
    entryFee: string
    reward: string
    trending?: boolean
  }
  walletConnected: boolean
}

export function TrendingGame({ game, walletConnected }: TrendingGameProps) {
  const href = game.type === "solo" ? `/arenas/solo/${game.id}` : `/arenas/multiplayer/${game.id}`

  return (
    <div className="bg-slate-800/30 border border-slate-700 hover:border-amber-500/30 rounded-xl overflow-hidden transition-all duration-300 group">
      <div className="relative">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          width={600}
          height={300}
          className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {game.trending && (
          <div className="absolute top-3 right-3 bg-amber-600/90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" /> Trending
          </div>
        )}
      </div>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4 gap-2 md:gap-0">
          <h3 className="text-lg md:text-xl font-bold">{game.title}</h3>
          <Badge className="self-start md:self-auto bg-slate-700 text-xs">{game.category}</Badge>
        </div>
        <p className="text-slate-300 text-xs md:text-sm mb-4 md:mb-6">{game.description}</p>

        <div className="grid grid-cols-3 gap-2 mb-4 md:mb-6 text-center">
          <div className="bg-slate-800/50 rounded-lg p-2 md:p-3">
            <div className="text-xs md:text-sm text-slate-400">Players</div>
            <div className="flex items-center justify-center gap-1 text-white font-medium text-xs md:text-sm">
              <Users className="h-3 w-3 md:h-4 md:w-4 text-blue-400" /> {game.players}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-2 md:p-3">
            <div className="text-xs md:text-sm text-slate-400">Entry</div>
            <div className="text-white font-medium text-xs md:text-sm">{game.entryFee}</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-2 md:p-3">
            <div className="text-xs md:text-sm text-slate-400">Reward</div>
            <div className="flex items-center justify-center gap-1 text-amber-400 font-medium text-xs md:text-sm">
              <Trophy className="h-3 w-3 md:h-4 md:w-4" /> {game.reward}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock className="h-3 w-3 md:h-4 md:w-4" /> Next match in 10 min
          </div>
          {walletConnected ? (
            <Link href={href}>
              <Button
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium text-xs md:text-sm"
                size="sm"
              >
                Play Now
              </Button>
            </Link>
          ) : (
            <ConnectWalletButton
              className="bg-gradient-to-r from-yellow-400 to-purple-600 hover:from-yellow-500 hover:to-purple-700 text-black font-medium text-xs md:text-sm"
              size="sm"
            />
          )}
        </div>
      </div>
    </div>
  )
}
