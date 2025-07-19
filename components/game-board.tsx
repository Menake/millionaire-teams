"use client"

import { useState, useEffect, useCallback } from "react"
import type { GameState } from "@/lib/types"
import QuestionDisplay from "./question-display"
import TeamScoreboard from "./team-scoreboard"
import Lifelines from "./lifelines"
import { Button } from "@/components/ui/button"
import CountdownTimer from "./countdown-timer"
import { Brain, Trophy, Check } from "lucide-react"

interface GameBoardProps {
  gameState: GameState
  onCorrectAnswer: () => void
  onWrongAnswer: () => void
  onStealAnswer: (correct: boolean) => void
  useLifeline: (lifeline: "fiftyFifty" | "askAudience" | "swapQuestion") => void
  currentPoints: number
}

export default function GameBoard({
  gameState,
  onCorrectAnswer,
  onWrongAnswer,
  onStealAnswer,
  useLifeline,
  currentPoints,
}: GameBoardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [eliminatedAnswers, setEliminatedAnswers] = useState<number[]>([])
  const [audienceResults, setAudienceResults] = useState<number[]>([])
  const [lifelineToUse, setLifelineToUse] = useState<"fiftyFifty" | "askAudience" | "swapQuestion" | null>(null)

  const currentTeam = gameState.teams[gameState.currentTeamIndex]
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex]

  const isStealingMode = gameState.status === "stealing"
  const teamKey = gameState.currentTeamIndex === 0 ? "team1" : "team2"

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null)
    setShowResult(false)
    setEliminatedAnswers([])
    setAudienceResults([])
    setLifelineToUse(null) // Reset lifeline trigger
  }, [gameState.currentSection, gameState.currentQuestionIndex, gameState.currentTeamIndex])

  // Call useLifeline unconditionally, but only trigger it when lifelineToUse is set
  useEffect(() => {
    if (lifelineToUse) {
      useLifeline(lifelineToUse)
      setLifelineToUse(null) // Reset after using the lifeline
    }
  }, [lifelineToUse, useLifeline])

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    const isCorrect = selectedAnswer === currentQuestion?.correctAnswer
    setShowResult(true)

    // Use setTimeout to show the result before moving to the next question
    setTimeout(() => {
      if (isStealingMode) {
        onStealAnswer(isCorrect)
      } else {
        if (isCorrect) {
          onCorrectAnswer()
        } else {
          onWrongAnswer()
        }
      }
      setShowResult(false)
    }, 1000)
  }

  const handleFiftyFifty = useCallback(() => {
    if (!currentQuestion) return
        
    // Find incorrect answers
    const incorrectAnswers = currentQuestion.answers
      .filter((answer) => answer !== currentQuestion.correctAnswer)
      .map((answer) => currentQuestion.answers.indexOf(answer))

      console.log(incorrectAnswers);

    // Randomly select two incorrect answers to eliminate
    const shuffled = [...incorrectAnswers].sort(() => 0.5 - Math.random())
    const toEliminate = shuffled.slice(0, 2)

    setEliminatedAnswers(toEliminate)
    setLifelineToUse("fiftyFifty")
  }, [currentQuestion])

  const handleAskAudience = useCallback(() => {
    if (!currentQuestion) return

    // Generate fake audience results
    // Correct answer gets higher percentage
    const correctIndex = currentQuestion.answers.indexOf(currentQuestion.correctAnswer)
    const results = Array(4)
      .fill(0)
      .map((_, i) => {
        if (i === correctIndex) {
          // Correct answer gets between 40% and 70%
          return Math.floor(Math.random() * 30) + 40
        } else {
          // Incorrect answers share the rest
          return Math.floor(Math.random() * 20)
        }
      })

    // Normalize to ensure they sum to 100%
    const sum = results.reduce((a, b) => a + b, 0)
    const normalized = results.map((val) => Math.round((val / sum) * 100))

    // Adjust the last value to ensure they sum to exactly 100%
    const adjustedSum = normalized.slice(0, 3).reduce((a, b) => a + b, 0)
    normalized[3] = 100 - adjustedSum

    setAudienceResults(normalized)
    setLifelineToUse("askAudience")
  }, [currentQuestion])

  const handleSwapQuestion = useCallback(() => {
    setLifelineToUse("swapQuestion")
  }, [])

  if (!currentQuestion) {
    return <div>Loading questions...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Left - Game Title */}
        <div className="flex items-center">
          <Brain className="h-8 w-8 text-purple-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">It's Trivial</h1>
        </div>

        {/* Center - Timer */}
        <div className="flex-1 flex justify-center">
          <CountdownTimer questionId={gameState.currentQuestionIndex} defaultTime={gameState.status === "stealing" ? 10 : 30} />
        </div>

        {/* Right - Round Progress */}
        <div className="text-right">
          <div className="text-lg font-medium text-gray-900">Round {gameState.currentQuestionIndex + 1} of {gameState.questions.length}</div>
          <div className="w-32 h-2 bg-gray-300 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((gameState.currentQuestionIndex + 1) / gameState.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="flex justify-between mb-8">
        {/* Team A */}
        <div className="text-left">
          <div className="text-lg font-medium text-gray-900 mb-2">Team A</div>
          <div className="flex items-center">
            <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
            <span className="text-3xl font-bold text-gray-900">{gameState.teams[0]?.score || 240}</span>
          </div>
        </div>

        {/* Team B */}
        <div className="text-right">
          <div className="text-lg font-medium text-gray-900 mb-2">Team B</div>
          <div className="flex items-center justify-end">
            <span className="text-3xl font-bold text-gray-900">{gameState.teams[1]?.score || 180}</span>
            <Trophy className="h-6 w-6 text-yellow-500 ml-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <QuestionDisplay
          currentTeam={currentTeam}
          isStealingMode={isStealingMode}
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onSelectAnswer={handleAnswerSelect}
          eliminatedAnswers={eliminatedAnswers}
          audienceResults={audienceResults}
        />

        {/* Bottom Section */}
        <div className="flex justify-between gap-96 items-end mt-8 mx-auto max-w-4xl">
          {/* Lifelines */}
          <Lifelines
            isStealingMode={isStealingMode}
            usedLifelines={gameState.usedLifelines[teamKey]}
            onFiftyFifty={handleFiftyFifty}
            onAskAudience={handleAskAudience}
            onSwapQuestion={handleSwapQuestion}
          />

          {/* Lock Answer Button */}
          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer || showResult}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Check className="h-5 w-5 mr-2" />
            Lock Answer
          </Button>
        </div>
      </div>
    </div>
  )
}
