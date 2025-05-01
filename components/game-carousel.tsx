"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface Game {
  id: number
  title: string
  description: string
  image: string
  premium?: boolean
}

interface GameCarouselProps {
  games: Game[]
  walletConnected: boolean
  onConnectWallet: () => void
}

export function GameCarousel({ games, walletConnected, onConnectWallet }: GameCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto scroll functionality
  useEffect(() => {
    if (!isPaused && !isTransitioning) {
      timerRef.current = setInterval(() => {
        handleNext()
      }, 4000) // Change slide every 4 seconds
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPaused, isTransitioning, games.length])

  const handlePrev = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setActiveIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length)

    // Pause auto-scroll briefly when manually navigating
    setIsPaused(true)

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
      setTimeout(() => setIsPaused(false), 2000)
    }, 500)
  }

  const handleNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setActiveIndex((prevIndex) => (prevIndex + 1) % games.length)

    // Pause auto-scroll briefly when manually navigating
    setIsPaused(true)

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
      setTimeout(() => setIsPaused(false), 2000)
    }, 500)
  }

  // Calculate indices for visible cards
  const getVisibleIndices = () => {
    const indices = []
    const totalGames = games.length

    // Add cards before the active one
    for (let i = 2; i >= 1; i--) {
      indices.push((activeIndex - i + totalGames) % totalGames)
    }

    // Add the active card
    indices.push(activeIndex)

    // Add cards after the active one
    for (let i = 1; i <= 2; i++) {
      indices.push((activeIndex + i) % totalGames)
    }

    return indices
  }

  const visibleIndices = getVisibleIndices()

  return (
    <div
      className="relative py-16 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => !isTransitioning && setIsPaused(false)}
    >
      <div className="flex justify-center items-center h-[400px] relative">
        {/* We'll render ALL games but position only the visible ones */}
        {games.map((game, idx) => {
          const positionIndex = visibleIndices.indexOf(idx)
          const isVisible = positionIndex !== -1
          const isActive = idx === activeIndex

          // Calculate position (-2, -1, 0, 1, 2) or null if not visible
          const position = isVisible ? positionIndex - 2 : null

          return (
            <div
              key={game.id}
              className={cn(
                "absolute transition-all duration-500 ease-out will-change-transform",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
                isActive ? "z-30" : position === -1 || position === 1 ? "z-20" : "z-10",
              )}
              style={{
                transform:
                  position === null
                    ? "scale(0.4) translateX(0)"
                    : position === -2
                      ? "scale(0.6) translateX(-24rem)"
                      : position === -1
                        ? "scale(0.8) translateX(-12rem)"
                        : position === 0
                          ? "scale(1) translateX(0)"
                          : position === 1
                            ? "scale(0.8) translateX(12rem)"
                            : "scale(0.6) translateX(24rem)",
                opacity:
                  position === null
                    ? 0
                    : position === -2 || position === 2
                      ? 0.4
                      : position === -1 || position === 1
                        ? 0.7
                        : 1,
              }}
            >
              <div className="w-[320px] bg-slate-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600/80 transition group shadow-lg shadow-purple-900/10">
                <div className="relative">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  {game.premium && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold px-2 py-1 rounded-full">
                      Premium
                    </div>
                  )}
                </div>
                <div className="p-5">
                  {isActive && <h3 className="text-xl font-bold mb-2">{game.title}</h3>}
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">{game.description}</p>

                  {isActive &&
                    (walletConnected ? (
                      <Link href="/arenas">
                        <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full">
                          Play Now
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        onClick={onConnectWallet}
                        className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-purple-600 hover:from-yellow-500 hover:to-purple-700 text-black font-medium rounded-full"
                      >
                        <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                      </Button>
                    ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation controls */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="rounded-full border border-slate-600/50 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="rounded-full border border-slate-600/50 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
