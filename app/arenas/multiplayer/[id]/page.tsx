"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useWallet } from "@txnlab/use-wallet-react"
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock } from "lucide-react"
import { LeftNavbar } from "@/components/arenas/left-navbar"
import { multiplayerGames } from "@/data/games"

export default function MultiplayerGameDetailPage() {
  const { activeAccount } = useWallet()
  const walletConnected = !!activeAccount
  const params = useParams()
  const [game, setGame] = useState(multiplayerGames[0])
  const [loading, setLoading] = useState(true)

  // Find the game based on the ID param
  useEffect(() => {
    const id = Number(params.id)
    const foundGame = multiplayerGames.find((g) => g.id === id)

    if (foundGame) {
      setGame(foundGame)
    }

    setLoading(false)
  }, [params.id])

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/40 bg-[#080b12]/90 backdrop-blur-xl fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" target="_blank">
            <span className="text-xl md:text-2xl font-bold text-white">
              Skill
              <span className="text-2xl md:text-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
                Z
              </span>
              Chain
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {walletConnected ? (
              <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
                <span className="text-2xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text font-bold">
                  Z
                </span>
                <span className="text-amber-400 font-medium">1,250 SKILLZ</span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
                <span className="text-slate-400 text-sm">Connect wallet to view balance</span>
              </div>
            )}
            <ConnectWalletButton className="bg-gradient-to-r from-yellow-400 to-purple-600 hover:from-yellow-500 hover:to-purple-700 text-black font-medium" />
          </div>
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300"></div>
      </header>

      <div className="flex">
        {/* Left Sidebar Navigation */}
        <LeftNavbar walletConnected={walletConnected} />

        {/* Main Content */}
        <main className="flex-1 pt-20 pb-16 pl-0 md:pl-16 lg:pl-16">
          <div className="container mx-auto px-4 py-6 md:py-8">
            {loading ? (
              <div className="text-center py-20">Loading...</div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
                  <Link href="/arenas/multiplayer">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{game.title}</h1>
                  <Badge className="bg-slate-700 text-xs">{game.category}</Badge>
                </div>

                <div className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden">
                  <div className="relative h-48 md:h-64 lg:h-96">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 md:p-6 lg:p-8">
                    <p className="text-slate-300 mb-6 md:mb-8 text-sm md:text-base">{game.description}</p>

                    <div className="max-w-xl mx-auto text-center bg-slate-800 p-6 md:p-8 rounded-lg">
                      <div className="bg-slate-700/50 p-3 md:p-4 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
                      </div>
                      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Game Under Construction</h2>
                      <p className="text-slate-300 mb-4 md:mb-6 text-sm md:text-base">
                        We're still perfecting this game to give you the best possible experience. Please check back
                        soon to enjoy {game.title}!
                      </p>
                      <Link href="/arenas/multiplayer">
                        <Button className="bg-slate-700 hover:bg-slate-600">Return to Games</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
