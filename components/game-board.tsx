"use client"

import { useState, useEffect, useCallback } from "react"
import type { GameState } from "@/lib/types"
import QuestionDisplay from "./question-display"
import TeamScoreboard from "./team-scoreboard"
import Lifelines from "./lifelines"
import { Button } from "@/components/ui/button"

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
    }, 3000)
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
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex justify-between mb-6">
        <TeamScoreboard
          teams={gameState.teams}
          currentTeamIndex={gameState.currentTeamIndex}
          isStealingMode={isStealingMode}
        />

        <div className="text-right">
          <div className="text-xl mb-2">Section {gameState.currentSection + 1} / 3</div>
          <div className="text-lg">Question {gameState.currentQuestionIndex + 1} / 4</div>
          <div className="text-2xl font-bold text-yellow-400 mt-2">
            {isStealingMode ? `${Math.floor(currentPoints / 2)} points (steal)` : `${currentPoints} points`}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Lifelines
          isStealingMode={isStealingMode}
          usedLifelines={gameState.usedLifelines[teamKey]}
          onFiftyFifty={handleFiftyFifty}
          onAskAudience={handleAskAudience}
          onSwapQuestion={handleSwapQuestion}
        />

        <QuestionDisplay
          isStealingMode={isStealingMode}
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onSelectAnswer={handleAnswerSelect}
          eliminatedAnswers={eliminatedAnswers}
          audienceResults={audienceResults}
        />

        <div className="mt-8">
          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer || showResult}
            className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold text-xl rounded-full hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Final Answer
          </Button>
        </div>

        {isStealingMode && (
          <div className="mt-4 text-xl text-yellow-400">{currentTeam.name} has a chance to steal!</div>
        )}
      </div>
    </div>
  )
}
