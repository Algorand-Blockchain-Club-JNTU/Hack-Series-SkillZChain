import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, MessageSquare, ArrowRight } from "lucide-react"
// Import the ConnectWalletButton component
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button"

export default function AboutPage() {
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
          <ConnectWalletButton />
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-yellow-300"></div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
            About SkillZChain
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-6 md:mb-8 text-base md:text-lg">
            Revolutionizing competitive gaming through blockchain technology
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-slate-700/50 shadow-lg shadow-purple-900/10 mb-12 md:mb-16">
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
                Our Mission
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed text-sm md:text-base">
                SkillZChain is revolutionizing the world of competitive gaming by leveraging blockchain technology to
                create a transparent, fair, and rewarding experience for all players.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                Our platform connects skilled gamers from around the world, allowing them to compete in various games
                and challenges while earning rewards based purely on their performance.
              </p>
            </div>

            <div className="mt-10 md:mt-12">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text text-center">
                Our Vision
              </h2>
              <p className="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                We envision a future where competitive gaming is accessible to everyone, regardless of their financial
                status. By focusing on skill-based rewards rather than pay-to-win mechanics, we're creating a more
                equitable gaming ecosystem that values talent and dedication above all else.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                Through blockchain technology, we're ensuring that all transactions, rewards, and game outcomes are
                transparent and immutable. This creates a trustless environment where players can compete with
                confidence, knowing that the system is fair and cannot be manipulated.
              </p>
            </div>
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-medium rounded-full px-6 py-2 md:px-8 md:py-3 text-base md:text-lg">
                Back to Home <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-800/50 py-8 md:py-12 mt-8 md:mt-16">
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
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/arenas" className="hover:text-white transition">
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
              <Link href="/admin" className="text-slate-500 hover:text-white transition">
                Admin
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
