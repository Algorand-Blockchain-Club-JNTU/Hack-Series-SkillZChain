"use client"

import type React from "react"
import Link from "next/link"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  ChevronRight,
  Github,
  Twitter,
  MessageSquare,
  ArrowRight,
  Play,
  Award,
  Gift,
  ChevronDown,
  Rocket,
  Sparkles,
  Target,
  Layers,
  Lock,
} from "lucide-react"
import { GameCarousel } from "@/components/game-carousel"
import { MobileMenu } from "@/components/mobile-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// Import the ConnectWalletButton component
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"
import { useWallet } from "@txnlab/use-wallet-react"

// Game data
const games = [
  {
    id: 1,
    title: "Crypto Trivia",
    description: "Test your blockchain knowledge against other players in real-time.",
    image: "/games/crypto-trivia.png",
    premium: false,
  },
  {
    id: 2,
    title: "Chain Puzzles",
    description: "Solve complex puzzles faster than your opponents to earn rewards.",
    image: "/games/chain-puzzles.png",
    premium: true,
  },
  {
    id: 3,
    title: "Strategy Masters",
    description: "Deploy your tactical genius in this turn-based strategy game.",
    image: "/games/strategy-masters.png",
    premium: true,
  },
  {
    id: 4,
    title: "Crypto Racer",
    description: "Race to the finish line in this fast-paced blockchain-themed racing game.",
    image: "/games/crypto-racer.png",
    premium: true,
  },
  {
    id: 5,
    title: "Blockchain Builder",
    description: "Build and optimize your own blockchain network in this strategy game.",
    image: "/games/blockchain-builder.png",
    premium: true,
  },
]

export default function Home() {
  const { activeAccount } = useWallet()
  const walletConnected = !!activeAccount
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const howItWorksSectionRef = useRef<HTMLDivElement>(null)
  const algorandSectionRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const yOffset = -80 // Adjust this value to account for the fixed header
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1218] text-white">
      {/* Navigation */}
      <header className="border-b border-slate-800/40 bg-[#0f1218]/70 backdrop-blur-xl fixed top-0 left-0 right-0 z-50">
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
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-slate-300 hover:text-white transition relative group">
                  Get Started
                  <ChevronDown className="h-4 w-4" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border border-slate-700 text-white">
                <DropdownMenuItem
                  className="hover:bg-slate-700 cursor-pointer focus:bg-slate-700"
                  onClick={() => scrollToSection(aboutSectionRef)}
                >
                  About Us
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-slate-700 cursor-pointer focus:bg-slate-700"
                  onClick={() => scrollToSection(howItWorksSectionRef)}
                >
                  How It Works
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/arenas" target="_blank" className="text-white font-medium hover:text-cyan-300 transition">
              Battlegrounds
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ConnectWalletButton />
            </div>
            <MobileMenu
              onAboutClick={() => scrollToSection(aboutSectionRef)}
              onHowItWorksClick={() => scrollToSection(howItWorksSectionRef)}
              walletConnected={walletConnected}
              onConnectWallet={() => {}}
            />
          </div>
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300"></div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-10 md:mb-20">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text tracking-tight">
              SkillZChain
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              Compete. Earn. Own Your Victory.
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 md:mb-12 text-base md:text-lg px-2">
              Decentralized competitive gaming. Play skill-based games, earn on-chain rewards, and join a fair,
              trustless community.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-16">
            {!walletConnected && (
              <ConnectWalletButton
                className="bg-gradient-to-r from-yellow-400 to-purple-600 hover:from-yellow-500 hover:to-purple-700 text-black font-medium px-6 py-5 md:px-8 md:py-6 text-base md:text-lg rounded-full"
                size="lg"
              />
            )}
            <Button
              onClick={() => scrollToSection(aboutSectionRef)}
              className="bg-[#1e2330]/70 hover:bg-slate-800/80 backdrop-blur-sm text-white font-medium px-6 py-5 md:px-8 md:py-6 text-base md:text-lg rounded-full border border-slate-700/50"
            >
              Know More <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <div ref={aboutSectionRef} className="h-0 w-full" aria-hidden="true"></div>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
                About SkillZChain
              </span>
            </h2>
            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-5 md:p-8 border border-slate-700/50 shadow-lg shadow-purple-900/10">
              <div className="flex flex-col items-center">
                <div className="w-full">
                  <p className="text-slate-300 mb-4 text-base md:text-lg leading-relaxed">
                    SkillZChain is revolutionizing the world of competitive gaming by leveraging blockchain technology
                    to create a transparent, fair, and rewarding experience for all players.
                  </p>
                  <p className="text-slate-300 mb-4 text-base md:text-lg leading-relaxed">
                    Our platform connects skilled gamers from around the world, allowing them to compete in various
                    games and challenges while earning rewards based purely on their performance.
                  </p>
                  <p className="text-slate-300 mb-6 text-base md:text-lg leading-relaxed">
                    Built on the Algorand blockchain, SkillZChain ensures lightning-fast transactions, minimal fees, and
                    a carbon-negative footprint. Our platform features a variety of skill-based games including trivia
                    challenges, strategic puzzles, and competitive matches where your abilities—not your
                    wallet—determine your success.
                  </p>
                  <div className="text-center">
                    <Link href="/about">
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-full px-5 py-2 md:px-6 md:py-3 text-base md:text-lg">
                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <div ref={howItWorksSectionRef} className="h-0 w-full" aria-hidden="true"></div>
      <section className="py-12 md:py-16 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center">
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
              How It Works
            </span>
          </h2>

          <div className="max-w-4xl mx-auto relative">
            {/* Flow line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 transform -translate-y-1/2 hidden md:block"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative">
              {/* Step 1 */}
              <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-4 md:p-6 border border-slate-700/50 shadow-lg shadow-purple-900/10 flex flex-col items-center text-center relative z-10">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-400 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Play className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Play Games</h3>
                <p className="text-slate-300 text-xs md:text-sm">Compete in skill-based games</p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-4 md:p-6 border border-slate-700/50 shadow-lg shadow-purple-900/10 flex flex-col items-center text-center relative z-10">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Trophy className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Win Matches</h3>
                <p className="text-slate-300 text-xs md:text-sm">Demonstrate your skills</p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-4 md:p-6 border border-slate-700/50 shadow-lg shadow-purple-900/10 flex flex-col items-center text-center relative z-10">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Award className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Earn SKILLZ</h3>
                <p className="text-slate-300 text-xs md:text-sm">Get performance-based tokens</p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-4 md:p-6 border border-slate-700/50 shadow-lg shadow-purple-900/10 flex flex-col items-center text-center relative z-10">
                <div className="bg-gradient-to-r from-purple-500 to-yellow-400 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Gift className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Get Rewards</h3>
                <p className="text-slate-300 text-xs md:text-sm">Exchange for NFTs and perks</p>
              </div>
            </div>

            <div className="text-center mt-8 md:mt-10">
              <Link href="/how-it-works">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-medium rounded-full px-5 py-2 md:px-6">
                  Learn More <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why SkillZChain Section - Redesigned */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
              Why SkillZChain?
            </span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-center mb-8 md:mb-12 text-sm md:text-base px-2">
            Redefining competitive gaming with blockchain technology and skill-based rewards
          </p>

          <div className="max-w-6xl mx-auto">
            {/* Main value proposition */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md p-5 md:p-8 rounded-2xl border border-slate-700/50 shadow-lg shadow-purple-900/10 mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-yellow-400 to-purple-500 text-transparent bg-clip-text">
                    The Future of Competitive Gaming
                  </h3>
                  <p className="text-slate-300 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                    SkillZChain is building a new gaming ecosystem where your skills are truly valued. Unlike
                    traditional gaming platforms that rely on pay-to-win mechanics or random chance, our platform
                    rewards players based solely on their abilities and performance.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    By leveraging blockchain technology, we've created a transparent, fair, and rewarding environment
                    where players can compete, earn, and truly own their achievements.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-xs md:max-w-md aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-full animate-pulse"></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-yellow-400/20 to-purple-500/20 rounded-full animate-pulse animation-delay-1000"></div>
                    <div className="absolute inset-8 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full animate-pulse animation-delay-2000"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-slate-800/80 backdrop-blur-md p-4 md:p-6 rounded-xl border border-slate-700/50 shadow-lg">
                        <Sparkles className="h-10 w-10 md:h-16 md:w-16 text-yellow-400 mx-auto mb-3 md:mb-4" />
                        <div className="text-center">
                          <h4 className="font-bold text-lg md:text-xl mb-1">Skill-Based Economy</h4>
                          <p className="text-slate-300 text-xs md:text-sm">Your skills determine your rewards</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Three key pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md p-5 md:p-6 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-900/20 group">
                <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 p-3 rounded-lg inline-flex mb-3 md:mb-4 group-hover:from-purple-400/30 group-hover:to-purple-600/30 transition-all duration-300">
                  <Target className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Meritocratic Rewards</h3>
                <p className="text-slate-300 text-sm md:text-base">
                  Our platform distributes rewards based on skill and performance, not on how much money you've spent.
                  Every SKILLZ token is earned through gameplay.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md p-5 md:p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-cyan-900/20 group">
                <div className="bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 p-3 rounded-lg inline-flex mb-3 md:mb-4 group-hover:from-cyan-400/30 group-hover:to-cyan-600/30 transition-all duration-300">
                  <Layers className="h-6 w-6 md:h-8 md:w-8 text-cyan-400" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Blockchain Transparency</h3>
                <p className="text-slate-300 text-sm md:text-base">
                  All game outcomes, rewards, and transactions are recorded on the Algorand blockchain, ensuring
                  complete transparency and fairness.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md p-5 md:p-6 rounded-xl border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300 shadow-lg hover:shadow-yellow-900/20 group">
                <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 p-3 rounded-lg inline-flex mb-3 md:mb-4 group-hover:from-yellow-400/30 group-hover:to-yellow-600/30 transition-all duration-300">
                  <Lock className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Community Governance</h3>
                <p className="text-slate-300 text-sm md:text-base">
                  Our DAO allows players to participate in platform decisions and anti-cheat mechanisms, creating a
                  truly player-owned ecosystem.
                </p>
              </div>
            </div>

            {/* Call to action */}
            <div className="text-center">
              <Link href="/join">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-medium rounded-full px-6 py-2 md:px-8 md:py-3 text-base md:text-lg">
                  <Rocket className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Join the Revolution
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Carousel */}
      <section className="py-12 md:py-20 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-2xl p-5 md:p-8 border border-slate-700/50 shadow-lg shadow-purple-900/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
                Featured Games
              </span>
            </h2>
            <GameCarousel games={games} walletConnected={walletConnected} onConnectWallet={() => {}} />
          </div>
        </div>
      </section>

      {/* Why Algorand Section */}
      <div ref={algorandSectionRef} className="h-0 w-full" aria-hidden="true"></div>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">
              Why Algorand Blockchain?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-left mb-6 md:mb-10">
              <div className="bg-slate-800/30 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-green-400">Speed & Efficiency</h3>
                <p className="text-slate-300 text-sm md:text-base">
                  Algorand's high throughput and instant finality enable fast, frequent transactions that are essential
                  for real-time gaming rewards. Players receive their SKILLZ tokens immediately after successful
                  gameplay.
                </p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-green-400">Low Transaction Costs</h3>
                <p className="text-slate-300 text-sm md:text-base">
                  With fees as low as 0.001 ALGO per transaction, SkillZChain can process microtransactions efficiently,
                  allowing even small rewards to be distributed cost-effectively.
                </p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-green-400">Carbon-Negative Blockchain</h3>
                <p className="text-slate-300 text-sm md:text-base">
                  Algorand's commitment to sustainability aligns with our vision for a responsible gaming ecosystem. Our
                  platform runs on a carbon-negative blockchain, minimizing environmental impact.
                </p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-slate-700/50">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-green-400">Smart Contract Reliability</h3>
                <p className="text-slate-300 text-sm md:text-base">
                  Algorand's secure and robust smart contract capabilities enable us to create transparent reward
                  systems and anti-cheat mechanisms that players can trust.
                </p>
              </div>
            </div>
            <a href="https://algorand.co/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium rounded-full px-5 py-2 md:px-6 md:py-3">
                Learn More About Algorand <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-800/50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="text-xl md:text-2xl font-bold text-white">
                  Skill
                  <span className="text-2xl md:text-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
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
                  <button onClick={() => scrollToSection(aboutSectionRef)} className="hover:text-white transition">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection(howItWorksSectionRef)} className="hover:text-white transition">
                    How It Works
                  </button>
                </li>
                <li>
                  <Link
                    href="/arenas"
                    target="_blank"
                    className="text-white font-medium hover:text-cyan-300 transition"
                  >
                    Battlegrounds
                  </Link>
                </li>
                <li>
                  <Link href="/games" className="hover:text-white transition">
                    Games
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h3>
              <ul className="space-y-2 text-slate-400 text-xs md:text-sm">
                <li>
                  <Link href="/docs" className="hover:text-white transition">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
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
              <span className="mx-1">·</span>
              <Link href="/admin" className="text-slate-500 hover:text-slate-500">
                .
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
