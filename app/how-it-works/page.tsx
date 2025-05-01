import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Play,
  Trophy,
  Award,
  Gift,
  Wallet,
  Users,
  Shield,
  ArrowRight,
  Github,
  Twitter,
  MessageSquare,
} from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0f1218] text-white">
      {/* Navigation */}
      <header className="border-b border-slate-800/40 bg-[#0f1218]/70 backdrop-blur-xl fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">
              Skill
              <span className="text-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
                Z
              </span>
              Chain
            </span>
          </Link>
          <Button className="bg-gradient-to-r from-yellow-400 to-purple-600 hover:from-yellow-500 hover:to-purple-700 text-black font-medium">
            <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
          </Button>
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300"></div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
            How SkillZChain Works
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            A comprehensive guide to our blockchain-powered competitive gaming platform
          </p>
        </div>
      </section>

      {/* Detailed Flow Section */}
      <section className="py-16 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical flow line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-purple-500 via-cyan-400 to-yellow-300 transform -translate-x-1/2 hidden md:block"></div>

              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center mb-20 relative">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
                    1. Create Your Account
                  </h3>
                  <p className="text-slate-300">
                    Sign up for a SkillZChain account and connect your Algorand wallet. This allows you to participate
                    in games, track your progress, and receive rewards directly to your wallet.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 flex justify-start md:justify-center">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-400 w-16 h-16 rounded-full flex items-center justify-center z-10">
                    <Wallet className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center mb-20 relative">
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 md:text-left">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    2. Browse Game Arenas
                  </h3>
                  <p className="text-slate-300">
                    Explore our diverse selection of skill-based games and challenges. From trivia to strategy games,
                    there's something for every type of player. Free-to-play options are available for beginners.
                  </p>
                </div>
                <div className="md:w-1/2 md:pr-12 flex justify-end md:justify-center">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center z-10">
                    <Play className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center mb-20 relative">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    3. Compete & Win
                  </h3>
                  <p className="text-slate-300">
                    Participate in matches and tournaments against players of similar skill levels. Our matchmaking
                    system ensures fair competition, while our anti-cheat mechanisms maintain integrity.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 flex justify-start md:justify-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center z-10">
                    <Trophy className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center mb-20 relative">
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 md:text-left">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                    4. Earn SKILLZ Tokens
                  </h3>
                  <p className="text-slate-300">
                    Your performance determines your rewards. Win matches and complete challenges to earn SKILLZ tokens,
                    which are automatically sent to your connected wallet via Algorand smart contracts.
                  </p>
                </div>
                <div className="md:w-1/2 md:pr-12 flex justify-end md:justify-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center z-10">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-center mb-20 relative">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-transparent bg-clip-text">
                    5. Unlock Premium Features
                  </h3>
                  <p className="text-slate-300">
                    Use your earned SKILLZ tokens to access premium game rooms with higher stakes and bigger rewards.
                    Premium arenas offer exclusive gameplay experiences and enhanced rewards.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12 flex justify-start md:justify-center">
                  <div className="bg-gradient-to-r from-pink-500 to-yellow-400 w-16 h-16 rounded-full flex items-center justify-center z-10">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex flex-col md:flex-row-reverse items-center relative">
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 md:text-left">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text">
                    6. Collect Rewards & NFTs
                  </h3>
                  <p className="text-slate-300">
                    Exchange your SKILLZ tokens for exclusive NFTs, platform perks, or participate in special events
                    where tokens can be converted to ALGO. Your achievements are permanently recorded on the blockchain.
                  </p>
                </div>
                <div className="md:w-1/2 md:pr-12 flex justify-end md:justify-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-green-400 w-16 h-16 rounded-full flex items-center justify-center z-10">
                    <Gift className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold mb-6">Ready to Start Your Journey?</h3>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-medium rounded-full px-8 py-3 text-lg">
                  Join SkillZChain Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DAO Governance Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-md rounded-xl p-8 border border-slate-700/50 shadow-lg shadow-purple-900/10">
            <h2 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
                Community Governance
              </span>
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <Image
                  src="/blockchain-puzzle-game.png"
                  alt="SkillZChain Community"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <p className="text-slate-300 mb-4 leading-relaxed">
                  SkillZChain is governed by its community through a Decentralized Autonomous Organization (DAO). By
                  staking your SKILLZ tokens, you gain voting rights on platform decisions.
                </p>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  The DAO plays a crucial role in our anti-cheat system, with staked members reviewing disputed matches
                  and voting on outcomes. This ensures fair play and community-driven governance.
                </p>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span className="text-purple-400 font-medium">Join the DAO by staking your SKILLZ tokens</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-800/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-white">
                  Skill
                  <span className="text-3xl bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300 text-transparent bg-clip-text">
                    Z
                  </span>
                  Chain
                </span>
              </Link>
              <p className="text-slate-400 text-sm">The future of skill-based competitive gaming on the blockchain.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/arenas" className="hover:text-white transition">
                    Arenas
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
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400">
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
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex gap-4 mb-4">
                <Link href="https://twitter.com" className="text-slate-400 hover:text-white transition">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="https://discord.com" className="text-slate-400 hover:text-white transition">
                  <MessageSquare className="h-5 w-5" />
                </Link>
                <Link href="https://github.com" className="text-slate-400 hover:text-white transition">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Powered by</span>
                <span className="text-sm font-medium text-slate-400">Algorand</span>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} SkillZChain. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
