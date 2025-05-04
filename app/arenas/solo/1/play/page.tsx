"use client"

import { TriviaGame } from "@/components/games/trivia-game"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TriviaGamePlayPage() {
  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      {/* Minimal header with back button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/arenas/solo/1">
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-slate-800/50 border-slate-700">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Game Info</span>
          </Button>
        </Link>
      </div>

      {/* Game container */}
      <div className="w-full h-screen">
        <TriviaGame />
      </div>
    </div>
  )
}
