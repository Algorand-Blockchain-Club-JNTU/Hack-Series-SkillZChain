"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { featuredGames } from "@/data/games"

interface GameCarouselProps {
  walletConnected: boolean
  onConnectWallet: () => void
}

export function GameCarousel({ walletConnected, onConnectWallet }: GameCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef<number | null>(null)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Auto scroll functionality
  useEffect(() => {
    if (!isPaused && !isTransitioning) {
      timerRef.current = setInterval(() => {
        handleNext()
      }, 3000) // Change slide every 3 seconds (was 4000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPaused, isTransitioning, featuredGames.length])

  const handlePrev = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setActiveIndex((prevIndex) => (prevIndex - 1 + featuredGames.length) % featuredGames.length)

    // Pause auto-scroll briefly when manually navigating
    setIsPaused(true)

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
      setTimeout(() => setIsPaused(false), 1500) // Was 2000
    }, 500)
  }

  const handleNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setActiveIndex((prevIndex) => (prevIndex + 1) % featuredGames.length)

    // Pause auto-scroll briefly when manually navigating
    setIsPaused(true)

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
      setTimeout(() => setIsPaused(false), 1500) // Was 2000
    }, 500)
  }

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return

    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    // If swipe distance is significant enough
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left, show next
        handleNext()
      } else {
        // Swiped right, show prev
        handlePrev()
      }
    }

    touchStartX.current = null
    setTimeout(() => setIsPaused(false), 1500)
  }

  // Calculate indices for visible cards
  const getVisibleIndices = () => {
    const indices = []
    const totalGames = featuredGames.length

    if (isMobile) {
      // On mobile, show only 3 cards: previous, active, next
      indices.push((activeIndex - 1 + totalGames) % totalGames) // Previous
      indices.push(activeIndex) // Active
      indices.push((activeIndex + 1) % totalGames) // Next
    } else {
      // On desktop, show 5 cards
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
    }

    return indices
  }

  const visibleIndices = getVisibleIndices()

  return (
    <div
      className="relative py-8 md:py-16 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => !isTransitioning && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-center items-center h-[300px] md:h-[400px] relative">
        {/* We'll render ALL games but position only the visible ones */}
        {featuredGames.map((game, idx) => {
          const positionIndex = visibleIndices.indexOf(idx)
          const isVisible = positionIndex !== -1
          const isActive = idx === activeIndex

          // Calculate position or null if not visible
          const position = isVisible ? (isMobile ? positionIndex - 1 : positionIndex - 2) : null

          // Scale and translation values based on device
          const getTransform = () => {
            if (position === null) return "scale(0.4) translateX(0)"

            if (isMobile) {
              // Mobile transformations (3 cards)
              return position === -1
                ? "scale(0.8) translateX(-8rem)"
                : position === 0
                  ? "scale(1) translateX(0)"
                  : "scale(0.8) translateX(8rem)"
            } else {
              // Desktop transformations (5 cards)
              return position === -2
                ? "scale(0.6) translateX(-24rem)"
                : position === -1
                  ? "scale(0.8) translateX(-12rem)"
                  : position === 0
                    ? "scale(1) translateX(0)"
                    : position === 1
                      ? "scale(0.8) translateX(12rem)"
                      : "scale(0.6) translateX(24rem)"
            }
          }

          // Opacity values based on position
          const getOpacity = () => {
            if (position === null) return 0

            if (isMobile) {
              // Mobile opacities (3 cards)
              return position === -1 || position === 1 ? 0.7 : 1
            } else {
              // Desktop opacities (5 cards)
              return position === -2 || position === 2 ? 0.4 : position === -1 || position === 1 ? 0.7 : 1
            }
          }

          return (
            <div
              key={game.id}
              className={cn(
                "absolute transition-all duration-500 ease-out will-change-transform",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
                isActive ? "z-30" : position === -1 || position === 1 ? "z-20" : "z-10",
              )}
              style={{
                transform: getTransform(),
                opacity: getOpacity(),
              }}
            >
              <div className="w-[280px] md:w-[320px] bg-slate-800/80 backdrop-blur-md rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600/80 transition group shadow-lg shadow-purple-900/10">
                <div className="relative">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    width={400}
                    height={200}
                    className="w-full h-36 md:h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  {game.premium && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold px-2 py-1 rounded-full">
                      Premium
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-5">
                  {isActive && <h3 className="text-lg md:text-xl font-bold mb-2">{game.title}</h3>}
                  <p className="text-slate-300 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{game.description}</p>

                  {isActive && (
                    <Link href={game.type === "solo" ? `/arenas/solo/${game.id}` : `/arenas/multiplayer/${game.id}`}>
                      <div className="cursor-pointer mt-2 md:mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full text-sm md:text-base py-1 md:py-2 flex justify-center">
                        Explore Game
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Swipe indicator for mobile */}
      <div className="md:hidden text-center text-xs text-slate-400 mt-4">Swipe left or right to navigate</div>

      {/* Navigation controls - visible on desktop, hidden on mobile (since we have swipe) */}
      <div className="hidden md:flex justify-center gap-3 md:gap-4 mt-6 md:mt-8">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-slate-600/50 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-slate-600/50 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </div>
  )
}
