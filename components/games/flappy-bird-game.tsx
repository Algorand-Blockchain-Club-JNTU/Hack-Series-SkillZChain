"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Game state
  const birdRef = useRef({
    x: 50,
    y: 200,
    width: 30,
    height: 30,
    velocity: 0,
    gravity: 0.6,
    lift: -10,
  })

  const pipesRef = useRef<any[]>([])
  const frameCountRef = useRef(0)
  const scoreRef = useRef(0)
  const gameStartedRef = useRef(false)
  const gameOverRef = useRef(false)
  const animationRef = useRef<number | null>(null)

  const startGame = () => {
    try {
      setGameStarted(true)
      setGameOver(false)
      setScore(0)
      gameStartedRef.current = true
      gameOverRef.current = false
      scoreRef.current = 0
      birdRef.current = {
        x: 50,
        y: 200,
        width: 30,
        height: 30,
        velocity: 0,
        gravity: 0.6,
        lift: -10,
      }
      pipesRef.current = []
      frameCountRef.current = 0

      // Start the game loop if it's not already running
      if (!animationRef.current) {
        const canvas = canvasRef.current
        if (canvas) {
          const ctx = canvas.getContext("2d")
          if (ctx) {
            animationRef.current = requestAnimationFrame(gameLoop)
          }
        }
      }
    } catch (err: any) {
      setError(`Error starting game: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const resetGame = () => {
    startGame()
  }

  const flapBird = () => {
    if (gameOverRef.current) return
    birdRef.current.velocity = birdRef.current.lift
  }

  const gameLoop = () => {
    try {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#70c5ce"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (!gameStartedRef.current) {
        // Draw start screen
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "white"
        ctx.font = "30px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Crypto Flappy Bird", canvas.width / 2, canvas.height / 2 - 50)
        ctx.font = "20px Arial"
        ctx.fillText("Tap or Press Space to Start", canvas.width / 2, canvas.height / 2)

        animationRef.current = requestAnimationFrame(gameLoop)
        return
      }

      if (gameOverRef.current) {
        // Draw game over screen
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "white"
        ctx.font = "30px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50)
        ctx.font = "20px Arial"
        ctx.fillText(`Score: ${scoreRef.current}`, canvas.width / 2, canvas.height / 2)
        ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 30)
        ctx.fillText("Tap or Press Space to Restart", canvas.width / 2, canvas.height / 2 + 70)

        animationRef.current = requestAnimationFrame(gameLoop)
        return
      }

      // Game logic
      const bird = birdRef.current
      bird.velocity += bird.gravity
      bird.y += bird.velocity

      // Add new pipes
      frameCountRef.current++
      if (frameCountRef.current % 100 === 0) {
        const pipeGap = 150
        const pipeMin = 50
        const pipeMax = canvas.height - pipeGap - pipeMin
        const pipeY = Math.floor(Math.random() * (pipeMax - pipeMin)) + pipeMin

        pipesRef.current.push({
          x: canvas.width,
          top: pipeY - 320,
          bottom: pipeY + pipeGap,
          width: 50,
          scored: false,
        })
      }

      // Update and draw pipes
      for (let i = pipesRef.current.length - 1; i >= 0; i--) {
        const pipe = pipesRef.current[i]
        pipe.x -= 2

        // Check if bird passed the pipe
        if (!pipe.scored && bird.x > pipe.x + pipe.width) {
          pipe.scored = true
          scoreRef.current++
          setScore(scoreRef.current)
        }

        // Remove pipes that are off screen
        if (pipe.x + pipe.width < 0) {
          pipesRef.current.splice(i, 1)
          continue
        }

        // Draw pipes
        ctx.fillStyle = "#73bf2e"
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top + 320)
        ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom)

        // Draw coin
        ctx.fillStyle = "#ffd700"
        const coinY = pipe.top + 320 + (pipe.bottom - (pipe.top + 320)) / 2
        ctx.beginPath()
        ctx.arc(pipe.x + pipe.width / 2, coinY, 15, 0, Math.PI * 2)
        ctx.fill()

        // Check collision with pipes
        if (
          bird.x + bird.width > pipe.x &&
          bird.x < pipe.x + pipe.width &&
          (bird.y < pipe.top + 320 || bird.y + bird.height > pipe.bottom)
        ) {
          endGame()
        }
      }

      // Check collision with ground or ceiling
      if (bird.y + bird.height > canvas.height || bird.y < 0) {
        endGame()
      }

      // Draw bird
      ctx.fillStyle = "#f8e71c"
      ctx.fillRect(bird.x, bird.y, bird.width, bird.height)

      // Draw score
      ctx.fillStyle = "white"
      ctx.font = "24px Arial"
      ctx.textAlign = "left"
      ctx.fillText(`Score: ${scoreRef.current}`, 10, 30)

      animationRef.current = requestAnimationFrame(gameLoop)
    } catch (err: any) {
      setError(`Error in game loop: ${err instanceof Error ? err.message : String(err)}`)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }

  const endGame = () => {
    gameOverRef.current = true
    setGameOver(true)

    // Update high score if needed
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current)
      try {
        localStorage.setItem("flappyBirdHighScore", scoreRef.current.toString())
      } catch (err: any) {
        console.error("Could not save high score:", err)
      }
    }
  }

  // Initialize canvas and start game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      setError("Canvas not found")
      return
    }

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    try {
      updateCanvasSize()
      window.addEventListener("resize", updateCanvasSize)

      // Start the animation loop
      animationRef.current = requestAnimationFrame(gameLoop)
    } catch (err: any) {
      setError(`Error initializing game: ${err instanceof Error ? err.message : String(err)}`)
    }

    // Cleanup function
    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [])

  // Handle key and touch events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault()
        if (!gameStartedRef.current) {
          startGame()
        } else if (!gameOverRef.current) {
          flapBird()
        } else {
          resetGame()
        }
      }
    }

    const handleTouch = () => {
      if (!gameStartedRef.current) {
        startGame()
      } else if (!gameOverRef.current) {
        flapBird()
      } else {
        resetGame()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    document.addEventListener("touchstart", handleTouch)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("touchstart", handleTouch)
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black">
      {error && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded-md">
          <p>Error: {error}</p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-3xl max-h-[80vh] touch-none border border-gray-700"
        onClick={() => {
          if (!gameStarted) {
            startGame()
          } else if (!gameOver) {
            flapBird()
          } else {
            resetGame()
          }
        }}
      />
      <div className="mt-4 flex gap-4">
        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => {
            if (!gameStarted) {
              startGame()
            } else {
              resetGame()
            }
          }}
        >
          {gameStarted ? "Restart" : "Start Game"}
        </Button>
        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => flapBird()}
          disabled={!gameStarted || gameOver}
        >
          Flap
        </Button>
      </div>
    </div>
  )
}
