import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface GameCardProps {
  title: string
  description: string
  image: string
  entryFee?: string
  reward?: string
  players?: string
  premium?: boolean
  type?: "solo" | "multiplayer"
  id?: number
}

export function GameCard({ title, description, image, premium = false, type = "solo", id = 1 }: GameCardProps) {
  // Determine link based on game type and id
  const href = type === "solo" ? `/arenas/solo/${id}` : `/arenas/multiplayer/${id}`

  return (
    <Link href={href}>
      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden card-hover cursor-pointer transition-all h-full hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/10">
        <div className="relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={200}
            className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {premium && <Badge className="absolute top-3 right-3 bg-amber-600 text-white text-xs">Premium</Badge>}
        </div>
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-1">{title}</h3>
          <p className="text-slate-300 text-xs sm:text-sm mb-2 line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
