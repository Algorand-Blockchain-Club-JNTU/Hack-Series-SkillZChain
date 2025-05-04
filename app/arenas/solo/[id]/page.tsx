"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy, Users, Clock, Gamepad2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { soloGames } from "@/data/games"

export default function GameDetailPage({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the game by ID
    const gameId = Number.parseInt(params.id)
    const foundGame = soloGames.find((g) => g.id === gameId)

    if (foundGame) {
      setGame(foundGame)
    }

    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080b12] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-[#080b12] text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
        <p className="mb-6 text-slate-300">The game you're looking for doesn't exist or has been removed.</p>
        <Link href="/arenas/solo">
          <Button variant="outline">Back to Games</Button>
        </Link>
      </div>
    )
  }

  // Special handling for our implemented games
  const hasImplementation = [1, 13].includes(game.id)
  const gamePlayUrl = `/arenas/solo/${game.id}/play`

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
                  target.src = "/placeholder.svg?key=game"
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

              {hasImplementation ? (
                <Link href={gamePlayUrl}>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium">
                    Play Now
                  </Button>
                </Link>
              ) : (
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                  disabled
                >
                  Coming Soon
                </Button>
              )}

              <Tabs defaultValue="details" className="mt-8">
                <TabsList className="bg-slate-800 border border-slate-700">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                  <TabsTrigger value="rewards">Rewards</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-500/20 p-2 rounded-full">
                            <Clock className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Duration</p>
                            <p className="font-medium">{game.duration || "5-10 minutes"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-500/20 p-2 rounded-full">
                            <Trophy className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Top Prize</p>
                            <p className="font-medium">{game.topPrize || "50 SKILLZ"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-500/20 p-2 rounded-full">
                            <Users className="h-5 w-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">Players</p>
                            <p className="font-medium">{game.players || "1,245"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <h3 className="text-lg font-medium mb-2">How to Play</h3>
                        <p className="text-slate-300">
                          {game.howToPlay ||
                            "Join this exciting game and test your skills to earn SKILLZ tokens. Complete challenges, answer questions correctly, and climb the leaderboard to maximize your rewards."}
                        </p>
                      </div>

                      <div className="pt-2">
                        <h3 className="text-lg font-medium mb-2">Game Rules</h3>
                        <ul className="list-disc pl-5 text-slate-300 space-y-1">
                          {game.rules ? (
                            game.rules.map((rule: string, index: number) => <li key={index}>{rule}</li>)
                          ) : (
                            <>
                              <li>Players must complete the game within the time limit</li>
                              <li>Rewards are distributed based on performance</li>
                              <li>Anti-cheat mechanisms are in place to ensure fair play</li>
                              <li>Players can retry games after a 1-hour cooldown period</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="leaderboard" className="mt-4">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="text-center py-8">
                        <Gamepad2 className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Leaderboard Coming Soon</h3>
                        <p className="text-slate-400 max-w-md mx-auto">
                          The leaderboard for this game is being prepared. Check back soon to see how you rank against
                          other players!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="rewards" className="mt-4">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="text-center py-8">
                        <Trophy className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Rewards Information Coming Soon</h3>
                        <p className="text-slate-400 max-w-md mx-auto">
                          Detailed information about rewards and achievements for this game will be available soon!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
