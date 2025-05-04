"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { soloGames } from "@/data/games"

export default function TriviaGamePage() {
  const game = soloGames[0] // Assuming you want to display the first game

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/40 bg-[#080b12]/90 backdrop-blur-xl fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-white">
              Skill
              <span className="text-2xl md:text-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
                Z
              </span>
              Chain
            </span>
          </Link>
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300"></div>
      </header>

      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="mb-6">
          <Link href="/arenas/solo">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden">
            <div className="relative h-64 md:h-80">
              <Image
                src={game.image || "/placeholder.svg"}
                alt={game.title}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?key=pwq28"
                }}
              />
            </div>

            <div className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{game.title}</h1>
              <p className="text-slate-300 mb-6">{game.description}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-slate-700/50 px-3 py-1.5 rounded-full text-sm">
                  <span className="text-slate-300">Category:</span>{" "}
                  <span className="text-white font-medium">{game.category}</span>
                </div>
                <div className="bg-slate-700/50 px-3 py-1.5 rounded-full text-sm">
                  <span className="text-slate-300">Difficulty:</span>{" "}
                  <span className="text-white font-medium">{game.difficulty}</span>
                </div>
                <div className="bg-slate-700/50 px-3 py-1.5 rounded-full text-sm">
                  <span className="text-slate-300">Rewards:</span>{" "}
                  <span className="text-white font-medium">{game.rewards}</span>
                </div>
              </div>

              {/* Simple link button to the game page */}
              <Link href="/arenas/solo/1/play">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium">
                  Play Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
