"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

// Trivia questions about Algorand and blockchain
const triviaQuestions = [
  {
    question: "Who is the founder of Algorand?",
    options: ["Vitalik Buterin", "Silvio Micali", "Charles Hoskinson", "Satoshi Nakamoto"],
    correctAnswer: "Silvio Micali",
    explanation: "Silvio Micali is a Turing Award-winning cryptographer and the founder of Algorand.",
  },
  {
    question: "What consensus mechanism does Algorand use?",
    options: ["Proof of Work", "Proof of Stake", "Pure Proof of Stake", "Delegated Proof of Stake"],
    correctAnswer: "Pure Proof of Stake",
    explanation: "Algorand uses Pure Proof of Stake (PPoS), which randomly selects validators from all token holders.",
  },
  {
    question: "What is the native cryptocurrency of the Algorand blockchain?",
    options: ["ALGO", "ADA", "ETH", "SOL"],
    correctAnswer: "ALGO",
    explanation: "ALGO is the native cryptocurrency of the Algorand blockchain.",
  },
  {
    question: "What programming language is primarily used for Algorand smart contracts?",
    options: ["Solidity", "Python", "TEAL", "JavaScript"],
    correctAnswer: "TEAL",
    explanation:
      "TEAL (Transaction Execution Approval Language) is the assembly-like language used for Algorand smart contracts.",
  },
  {
    question: "What is the approximate block finalization time on Algorand?",
    options: ["10 minutes", "4.5 seconds", "15 seconds", "2 minutes"],
    correctAnswer: "4.5 seconds",
    explanation: "Algorand has a block finalization time of approximately 4.5 seconds.",
  },
]

export function TriviaGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  try {
    const currentQuestion = triviaQuestions[currentQuestionIndex]

    const handleOptionSelect = (option: string) => {
      if (isAnswered) return
      setSelectedOption(option)
    }

    const handleSubmit = () => {
      if (!selectedOption || isAnswered) return

      setIsAnswered(true)
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore(score + 1)
      }
    }

    const handleNext = () => {
      if (currentQuestionIndex === triviaQuestions.length - 1) {
        setGameOver(true)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
        setIsAnswered(false)
      }
    }

    const handleRestart = () => {
      setCurrentQuestionIndex(0)
      setSelectedOption(null)
      setIsAnswered(false)
      setScore(0)
      setGameOver(false)
    }

    const getScoreMessage = () => {
      if (score >= 4) return "Blockchain Expert! 🏆"
      if (score >= 3) return "Algorand Pro! 🌟"
      if (score >= 2) return "Crypto Enthusiast! 👍"
      return "Keep Learning! 📚"
    }

    if (gameOver) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 p-4">
          <Card className="w-full max-w-lg p-8 bg-slate-800 text-white shadow-xl rounded-xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-400 mb-6">Quiz Complete!</h2>
              <div className="text-6xl font-bold mb-4 text-purple-400">
                {score} / {triviaQuestions.length}
              </div>
              <p className="text-xl font-medium text-gray-300 mb-8">{getScoreMessage()}</p>
              <Button
                onClick={handleRestart}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium"
              >
                Play Again
              </Button>
            </div>
          </Card>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 p-4">
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-slate-800 px-4 py-2 rounded-full shadow-md text-white">
              <span className="font-medium">
                Question {currentQuestionIndex + 1}/{triviaQuestions.length}
              </span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-full shadow-md text-white">
              <span className="font-medium text-purple-400">Score: {score}</span>
            </div>
          </div>

          <Card className="bg-slate-800 text-white shadow-xl rounded-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-6">{currentQuestion.question}</h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedOption === option
                        ? isAnswered
                          ? option === currentQuestion.correctAnswer
                            ? "bg-green-900 border-2 border-green-500"
                            : "bg-red-900 border-2 border-red-500"
                          : "bg-blue-900 border-2 border-blue-500"
                        : "bg-slate-700 hover:bg-slate-600 border-2 border-slate-600"
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {isAnswered && option === currentQuestion.correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      )}
                      {isAnswered && selectedOption === option && option !== currentQuestion.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {isAnswered && (
                <div className="mt-6 p-4 bg-blue-900 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-200">{currentQuestion.explanation}</p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-center gap-4">
                {!isAnswered ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedOption}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-full"
                  >
                    {currentQuestionIndex === triviaQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  } catch (err) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-900 p-4 text-white">
        <h2 className="text-2xl font-bold mb-4">Error in Trivia Game</h2>
        <p className="mb-4">{error || String(err)}</p>
        <Button onClick={() => window.location.reload()} className="bg-white text-red-900 hover:bg-gray-200">
          Reload Game
        </Button>
      </div>
    )
  }
}
