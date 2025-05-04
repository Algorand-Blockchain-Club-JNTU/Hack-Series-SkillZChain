"use client"

import type React from "react"

import Link from "next/link"
import { useRef } from "react"
import { useWallet } from "@txnlab/use-wallet-react"
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Trophy,
  Gamepad2,
  Users,
  Sparkles,
  ChevronRight,
  Search,
  TrendingUp,
  Star,
  Plus,
  ArrowRight,
  Github,
  Twitter,
  MessageSquare,
  AlignJustify,
  CastleIcon as ChessKnight,
  LayoutGrid,
  Grid3x3,
  Dice5,
  Puzzle,
} from "lucide-react"
import { LeftNavbar } from "@/components/arenas/left-navbar"
import { MobileMenu } from "@/components/mobile-menu"
import { ArenaMobileNav } from "@/components/arenas/mobile-nav" // Import the new mobile nav
import { GameCard } from "@/components/arenas/game-card"
import { CategoryCard } from "@/components/arenas/category-card"
import { TrendingGame } from "@/components/arenas/trending-game"
import { HowItWorksArena } from "@/components/arenas/how-it-works"
import { LeaderboardCard } from "@/components/arenas/leaderboard-card"
import { GameCarousel } from "@/components/game-carousel"
import { soloGames, multiplayerGames, categories, emptyLeaderboardData } from "@/data/games"

export default function ArenasPage() {
  const { activeAccount } = useWallet()
  const walletConnected = !!activeAccount
  const basicGamesRef = useRef<HTMLDivElement>(null)

  // Get first 3 games from each category
  const basicGamesSample = soloGames.slice(0, 3)
  const multiplayerGamesSample = multiplayerGames.slice(0, 3)
  const trendingGames = [
    {
      ...soloGames[0],
      players: "24",
      entryFee: "Free",
      reward: "50 SKILLZ",
      trending: true,
    },
    {
      ...multiplayerGames[0],
      players: "18",
      entryFee: "10 SKILLZ",
      reward: "200 SKILLZ",
      trending: true,
    },
  ]

  // Function to scroll to basic games section
  const scrollToBasicGames = () => {
    if (basicGamesRef.current) {
      basicGamesRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Map icon names to Lucide components
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Sparkles: <Sparkles className="h-5 w-5" />,
      Puzzle: <Puzzle className="h-5 w-5" />,
      ChessKnight: <ChessKnight className="h-5 w-5" />,
      LayoutGrid: <LayoutGrid className="h-5 w-5" />,
      Gamepad2: <Gamepad2 className="h-5 w-5" />,
      AlignJustify: <AlignJustify className="h-5 w-5" />,
      Grid3x3: <Grid3x3 className="h-5 w-5" />,
      Dice5: <Dice5 className="h-5 w-5" />,
    }

    return iconMap[iconName] || <Star className="h-5 w-5" />
  }

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
            <div className="hidden md:block">
              <ConnectWalletButton className="bg-gradient-to-r from-yellow-400 to-purple-600 hover:from-yellow-500 hover:to-purple-700 text-black font-medium" />
            </div>
            <MobileMenu walletConnected={walletConnected} />
          </div>
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300"></div>
      </header>

      <div className="flex">
        {/* Left Sidebar Navigation */}
        <LeftNavbar walletConnected={walletConnected} />

        {/* Main Content */}
        <main className="flex-1 pt-20 pb-16 md:pb-16 pl-0 md:pl-16 lg:pl-16">
          {/* Hero Section with Game Types */}
          <section className="py-6 md:py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-white">Battlegrounds</h1>
              <p className="text-slate-400 mb-6 md:mb-12 max-w-3xl text-sm md:text-base">
                Choose your arena, compete against players worldwide, and earn SKILLZ tokens based on your performance.
              </p>

              {/* Game Type Cards in Triangular Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {/* Basic Games */}
                <div className="md:col-span-1">
                  <Card className="bg-slate-800/30 border-slate-700 hover:border-blue-500/30 transition-all duration-300 h-full">
                    <CardContent className="p-4 md:p-6 flex flex-col h-full">
                      <div className="bg-blue-500/20 p-3 md:p-4 rounded-lg inline-flex mb-3 md:mb-4">
                        <Gamepad2 className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold mb-2">Basic Games</h2>
                      <p className="text-slate-400 mb-4 md:mb-6 flex-grow text-sm md:text-base">
                        Free-to-play games perfect for beginners. Test your skills and earn your first SKILLZ tokens.
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge className="bg-green-600/30 text-green-400 hover:bg-green-600/40 text-xs md:text-sm">
                          Free Entry
                        </Badge>
                        <Link href="/arenas/solo">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm" size="sm">
                            Play Now <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Multiplayer Games */}
                <div className="md:col-span-1">
                  <Card className="bg-slate-800/30 border-slate-700 hover:border-purple-500/30 transition-all duration-300 h-full">
                    <CardContent className="p-4 md:p-6 flex flex-col h-full">
                      <div className="bg-purple-500/20 p-3 md:p-4 rounded-lg inline-flex mb-3 md:mb-4">
                        <Users className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold mb-2">Multiplayer</h2>
                      <p className="text-slate-400 mb-4 md:mb-6 flex-grow text-sm md:text-base">
                        Compete directly against other players in real-time matches with higher stakes and rewards.
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge className="bg-blue-600/30 text-blue-400 hover:bg-blue-600/40 text-xs md:text-sm">
                          Competitive
                        </Badge>
                        <Link href="/arenas/multiplayer">
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm" size="sm">
                            Play Now <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Explore More */}
                <div className="md:col-span-1">
                  <Card className="bg-slate-800/30 border-slate-700 hover:border-amber-500/30 transition-all duration-300 h-full">
                    <CardContent className="p-4 md:p-6 flex flex-col h-full">
                      <div className="bg-amber-500/20 p-3 md:p-4 rounded-lg inline-flex mb-3 md:mb-4">
                        <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-amber-400" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold mb-2">Explore</h2>
                      <p className="text-slate-400 mb-4 md:mb-6 flex-grow text-sm md:text-base">
                        Discover new games, special events, tournaments, and exclusive challenges with unique rewards.
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge className="bg-purple-600/30 text-purple-400 hover:bg-purple-600/40 text-xs md:text-sm">
                          Various
                        </Badge>
                        <Button
                          onClick={scrollToBasicGames}
                          className="bg-slate-700 hover:bg-slate-600 text-white text-xs md:text-sm"
                          size="sm"
                        >
                          Discover <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Games Carousel Section */}
          <section className="py-6 md:py-12 px-4 md:px-8 bg-slate-900/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-white flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 md:h-6 md:w-6 text-amber-400" /> Featured Games
                </h2>
                <Link href="/arenas/categories">
                  <Button
                    variant="outline"
                    className="text-slate-300 border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-xs md:text-sm"
                    size="sm"
                  >
                    View All Categories <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </Link>
              </div>

              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-2xl p-5 md:p-8 border border-slate-700/50 shadow-lg shadow-purple-900/10">
                <GameCarousel walletConnected={walletConnected} onConnectWallet={() => {}} />
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-6 md:py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
                <h2 className="text-xl md:text-3xl font-bold text-white">Game Categories</h2>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    className="w-full sm:w-auto pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-6 mb-8">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={{
                      ...category,
                      icon: getIconComponent(category.icon),
                    }}
                  />
                ))}
                <Link href="/page-under-construction">
                  <div className="bg-slate-800/30 border border-dashed border-slate-700 hover:border-blue-500/30 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer h-full">
                    <div className="bg-slate-700/50 p-3 rounded-full mb-3">
                      <Plus className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="font-medium text-white mb-1 text-sm">Create Category</h3>
                    <p className="text-slate-400 text-xs">Suggest a new game type</p>
                  </div>
                </Link>
              </div>

              {/* Basic Games */}
              <div className="mb-8 md:mb-12" ref={basicGamesRef}>
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-white">Basic Games</h3>
                  <Link href="/arenas/solo">
                    <Button
                      variant="outline"
                      className="text-slate-300 border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-xs md:text-sm"
                      size="sm"
                    >
                      View All <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {basicGamesSample.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>

              {/* Multiplayer Games */}
              <div className="mb-8 md:mb-12">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-white">Multiplayer Games</h3>
                  <Link href="/arenas/multiplayer">
                    <Button
                      variant="outline"
                      className="text-slate-300 border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-xs md:text-sm"
                      size="sm"
                    >
                      View All <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {multiplayerGamesSample.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Trending Section */}
          <section className="py-6 md:py-12 px-4 md:px-8 bg-slate-900/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 md:h-6 md:w-6 text-amber-400" /> Trending Now
                </h2>
                <Link href="/arenas/trending">
                  <Button
                    variant="outline"
                    className="text-slate-300 border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-xs md:text-sm"
                    size="sm"
                  >
                    See All <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {trendingGames.map((game) => (
                  <TrendingGame
                    key={game.id}
                    game={{
                      ...game,
                      players: game.players,
                      entryFee: game.entryFee,
                      reward: game.reward,
                      trending: game.trending,
                    }}
                    walletConnected={walletConnected}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <HowItWorksArena />

          {/* Leaderboard Section */}
          <section className="py-6 md:py-12 px-4 md:px-8 bg-slate-900/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-white flex items-center">
                  <Trophy className="mr-2 h-5 w-5 md:h-6 md:w-6 text-amber-400" /> Top Players
                </h2>
                <Link href="/arenas/leaderboard">
                  <Button
                    variant="outline"
                    className="text-slate-300 border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-xs md:text-sm"
                    size="sm"
                  >
                    Full Leaderboard <ChevronRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </Link>
              </div>

              <div className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                  {emptyLeaderboardData.map((player) => (
                    <LeaderboardCard key={player.rank} player={player} />
                  ))}
                </div>
                <div className="border-t border-slate-700 p-4 text-center">
                  <Link href="/arenas/leaderboard">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm">
                      View Complete Rankings <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-800/50 py-8 md:py-12 mt-8">
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                <div>
                  <Link href="/" className="flex items-center gap-2 mb-4" target="_blank">
                    <span className="text-lg md:text-2xl font-bold text-white">
                      Skill
                      <span className="text-xl md:text-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
                        Z
                      </span>
                      Chain
                    </span>
                  </Link>
                  <p className="text-slate-400 text-xs md:text-sm">
                    The future of skill-based competitive gaming on the blockchain.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Platform</h3>
                  <ul className="space-y-2 text-slate-400 text-xs md:text-sm">
                    <li>
                      <Link href="/" className="hover:text-white transition" target="_blank">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/arenas" className="text-white font-medium hover:text-cyan-300 transition">
                        Battlegrounds
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-under-construction" className="hover:text-white transition">
                        Games
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h3>
                  <ul className="space-y-2 text-slate-400 text-xs md:text-sm">
                    <li>
                      <Link href="/page-under-construction" className="hover:text-white transition">
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-under-construction" className="hover:text-white transition">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-under-construction" className="hover:text-white transition">
                        Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-under-construction" className="hover:text-white transition">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Connect</h3>
                  <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
                    <Link href="https://twitter.com" className="text-slate-400 hover:text-white transition">
                      <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                    <Link href="https://discord.com" className="text-slate-400 hover:text-white transition">
                      <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                    <Link href="https://github.com" className="text-slate-400 hover:text-white transition">
                      <Github className="h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Powered by</span>
                    <a
                      href="https://algorand.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm font-medium text-slate-400 hover:text-white transition"
                    >
                      Algorand
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-800/50 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
                <p className="text-slate-500 text-xs md:text-sm">
                  &copy; {new Date().getFullYear()} SkillZChain. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <ArenaMobileNav />
      {/* Add padding to account for the mobile nav */}
      <div className="md:hidden h-16"></div>
    </div>
  )
}
