import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wallet, Github, Twitter, MessageSquare, ArrowRight } from "lucide-react"

export default function AboutPage() {
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
            About SkillZChain
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Revolutionizing competitive gaming through blockchain technology
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-md rounded-xl p-8 border border-slate-700/50 shadow-lg shadow-purple-900/10 mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
                Our Mission
              </h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                SkillZChain is revolutionizing the world of competitive gaming by leveraging blockchain technology to
                create a transparent, fair, and rewarding experience for all players.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Our platform connects skilled gamers from around the world, allowing them to compete in various games
                and challenges while earning rewards based purely on their performance.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
                Our Vision
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                We envision a future where competitive gaming is accessible to everyone, regardless of their financial
                status. By focusing on skill-based rewards rather than pay-to-win mechanics, we're creating a more
                equitable gaming ecosystem that values talent and dedication above all else.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Through blockchain technology, we're ensuring that all transactions, rewards, and game outcomes are
                transparent and immutable. This creates a trustless environment where players can compete with
                confidence, knowing that the system is fair and cannot be manipulated.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-md rounded-xl p-8 border border-slate-700/50 shadow-lg shadow-purple-900/10">
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold">
                    AC
                  </div>
                </div>
                <h3 className="font-bold mb-1">Alex Chen</h3>
                <p className="text-sm text-slate-400 mb-2">Founder & CEO</p>
                <p className="text-sm text-slate-300">
                  Gaming enthusiast with 10+ years in blockchain development and competitive gaming.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold">
                    MJ
                  </div>
                </div>
                <h3 className="font-bold mb-1">Maya Johnson</h3>
                <p className="text-sm text-slate-400 mb-2">CTO</p>
                <p className="text-sm text-slate-300">
                  Algorand specialist with expertise in smart contract development and game mechanics.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold">
                    RP
                  </div>
                </div>
                <h3 className="font-bold mb-1">Raj Patel</h3>
                <p className="text-sm text-slate-400 mb-2">Head of Game Design</p>
                <p className="text-sm text-slate-300">
                  Former esports champion with a passion for creating balanced, skill-based competitive games.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-medium rounded-full px-8 py-3 text-lg">
                Back to Home <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-800/50 py-12 mt-16">
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
