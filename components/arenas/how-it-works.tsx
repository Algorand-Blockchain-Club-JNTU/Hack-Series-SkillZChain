"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Gamepad2, Trophy, Coins, Shield } from "lucide-react"

export function HowItWorksArena() {
  return (
    <section className="py-6 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">How SkillZChain Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Compete in skill-based games, earn SKILLZ tokens, and unlock exclusive rewards on the blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 md:p-6 text-center">
            <div className="bg-blue-500/20 p-3 md:p-4 rounded-full inline-flex mb-3 md:mb-4">
              <Gamepad2 className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">1. Play Games</h3>
            <p className="text-slate-400 text-xs md:text-sm">
              Choose from a variety of skill-based games and compete against players worldwide.
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 md:p-6 text-center">
            <div className="bg-purple-500/20 p-3 md:p-4 rounded-full inline-flex mb-3 md:mb-4">
              <Trophy className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">2. Win Matches</h3>
            <p className="text-slate-400 text-xs md:text-sm">
              Demonstrate your skills and win matches to climb the leaderboard rankings.
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 md:p-6 text-center">
            <div className="bg-amber-500/20 p-3 md:p-4 rounded-full inline-flex mb-3 md:mb-4">
              <Coins className="h-6 w-6 md:h-8 md:w-8 text-amber-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">3. Earn SKILLZ</h3>
            <p className="text-slate-400 text-xs md:text-sm">
              Earn SKILLZ tokens based on your performance, stored securely on the Algorand blockchain.
            </p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 md:p-6 text-center">
            <div className="bg-green-500/20 p-3 md:p-4 rounded-full inline-flex mb-3 md:mb-4">
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-green-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">4. Unlock Rewards</h3>
            <p className="text-slate-400 text-xs md:text-sm">
              Use your SKILLZ tokens to unlock premium games, exclusive NFTs, and special rewards.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/how-it-works">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
