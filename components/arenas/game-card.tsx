"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Game {
  id: number
  title: string
  description: string
  image: string
  players?: string
  entryFee?: string
  reward?: string
  category: string
  type: "solo" | "multiplayer"
}

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  // Determine link based on game type
  const href = game.type === "solo" ? `/arenas/solo/${game.id}` : `/arenas/multiplayer/${game.id}`

  return (
    <Link href={href}>
      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden hover:border-slate-600 transition group h-full cursor-pointer">
        <div className="relative">
          <Image
            src={game.image || "/placeholder.svg"}
            alt={game.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          />
          <Badge className="absolute top-3 right-3 bg-slate-800/80 text-slate-200">{game.category}</Badge>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{game.title}</h3>
          <p className="text-slate-300 text-sm mb-4">{game.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
