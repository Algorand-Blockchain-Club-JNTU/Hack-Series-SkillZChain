"use client"

import Link from "next/link"
import { useWallet } from "@txnlab/use-wallet-react"
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Search } from "lucide-react"
import { LeftNavbar } from "@/components/arenas/left-navbar"
import { GameCard } from "@/components/game-card"
import { multiplayerGames } from "@/data/games"
import { useState } from "react"

export default function MultiplayerPage() {
  const { activeAccount } = useWallet()
  const walletConnected = !!activeAccount
  const [searchTerm, setSearchTerm] = useState("")

  // Filter games based on search term
  const filteredGames = multiplayerGames.filter(
    (game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <Link href="/arenas">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
                  <Users className="mr-2 h-5 w-5 md:h-6 md:w-6 text-purple-400" /> Multiplayer Games
                </h1>
              </div>

              <div className="w-full sm:w-auto sm:ml-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-auto pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {filteredGames.length === 0 ? (
              <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-slate-700/50 shadow-lg shadow-purple-900/10 text-center">
                <Users className="h-12 w-12 md:h-16 md:w-16 text-slate-400 mx-auto mb-4" />
                <h2 className="text-xl md:text-2xl font-bold mb-4">No Games Found</h2>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-sm md:text-base">
                  No games match your search criteria. Try a different search term.
                </p>
                <Button onClick={() => setSearchTerm("")} className="bg-purple-600 hover:bg-purple-700 text-white">
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    title={game.title}
                    description={game.description}
                    image={game.image}
                    type="multiplayer"
                    id={game.id}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
