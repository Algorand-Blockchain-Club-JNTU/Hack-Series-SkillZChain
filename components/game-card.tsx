import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

interface GameCardProps {
  title: string
  description: string
  image: string
  entryFee: string
  reward: string
  players: string
  premium?: boolean
}

export function GameCard({ title, description, image, entryFee, reward, players, premium = false }: GameCardProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden hover:border-slate-600 transition group">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
        />
        {premium && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
            Premium
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-300 text-sm mb-4">{description}</p>
        <div className="flex justify-between text-sm text-slate-400">
          <div>
            <div className="font-semibold text-white">Entry</div>
            <div>{entryFee}</div>
          </div>
          <div>
            <div className="font-semibold text-white">Reward</div>
            <div className="text-yellow-400">{reward}</div>
          </div>
          <div>
            <div className="font-semibold text-white">Players</div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" /> {players}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
          Play Now
        </Button>
      </CardFooter>
    </Card>
  )
}
