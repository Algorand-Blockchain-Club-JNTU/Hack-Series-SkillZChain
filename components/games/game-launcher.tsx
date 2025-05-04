"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface GameLauncherProps {
  gameTitle: string
  gameDescription: string
  children: React.ReactNode
}

export function GameLauncher({ gameTitle, gameDescription, children }: GameLauncherProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Debug state to track component behavior
  const [debugState, setDebugState] = useState<string>("initial")

  const handlePlay = () => {
    setDebugState("play clicked")
    setShowConfirmation(false)
    setIsPlaying(true)
  }

  const handleQuit = () => {
    setDebugState("quit clicked")
    setIsPlaying(false)
  }

  // Render the game in fullscreen when playing
  if (isPlaying) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex flex-col">
        <div className="absolute top-4 right-4 z-[10000]">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-slate-800/50 border-slate-700 hover:bg-slate-700"
            onClick={handleQuit}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Quit Game</span>
          </Button>
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    )
  }

  return (
    <div>
      <Button
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
        onClick={() => {
          setDebugState("play now clicked")
          setShowConfirmation(true)
        }}
      >
        Play Now
      </Button>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-xl">{gameTitle}</DialogTitle>
            <DialogDescription className="text-slate-400">{gameDescription}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-slate-300">Are you ready to play? This game will open in fullscreen mode.</p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-slate-700"
              onClick={() => {
                setDebugState("cancel clicked")
                setShowConfirmation(false)
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handlePlay}
            >
              Play Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Debug info - will be hidden in production */}
      <div className="hidden">
        <p>Debug State: {debugState}</p>
        <p>Show Confirmation: {showConfirmation ? "true" : "false"}</p>
        <p>Is Playing: {isPlaying ? "true" : "false"}</p>
      </div>
    </div>
  )
}
