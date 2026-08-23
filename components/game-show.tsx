"use client"

import { useState } from "react"
import TeamSetup from "./team-setup"
import CategorySelect from "./category-select"
import GameBoard from "./game-board"
import type { GameState, Team } from "@/lib/types"
import { getQuizQuestions } from "@/app/actions"
import { Brain, Trophy, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GameShow() {
  const [gameState, setGameState] = useState<GameState>({
    status: "setup",
    teams: [],
    selectedCategoryIds: [],
    currentTeamIndex: 0,
    currentSection: 0,
    currentQuestionIndex: 0,
    questions: [],
    usedLifelines: {
      team1: {
        fiftyFifty: false,
        askAudience: false,
        swapQuestion: false,
      },
      team2: {
        fiftyFifty: false,
        askAudience: false,
        swapQuestion: false,
      },
    },
  })

  const [isStarting, setIsStarting] = useState(false)

  const startGame = (teams: Team[]) => {
    setGameState({
      ...gameState,
      status: "category-select",
      teams,
    })
  }

  const startQuiz = async (categoryIds: string[]) => {
    setIsStarting(true)
    try {
      const questions = await getQuizQuestions(categoryIds)
      if (questions.length === 0) {
        alert("No questions found for those categories. Run: bun run db:seed")
        return
      }
      setGameState({
        ...gameState,
        status: "playing",
        selectedCategoryIds: categoryIds,
        questions,
      })
    } catch (e) {
      alert(e instanceof Error ? e.message : "Could not load questions")
    } finally {
      setIsStarting(false)
    }
  }

  const handleCorrectAnswer = () => {
    const pointsForQuestion = getPointsForCurrentQuestion()

    const updatedTeams = gameState.teams.map((team, index) => {
      if (index === gameState.currentTeamIndex) {
        return {
          ...team,
          score: team.score + pointsForQuestion,
        }
      }
      return team
    })

    moveToNextQuestion(updatedTeams)
  }

  const handleWrongAnswer = () => {
    // Switch to the other team for stealing opportunity
    const stealingTeamIndex = gameState.currentTeamIndex === 0 ? 1 : 0

    setGameState({
      ...gameState,
      status: "stealing",
      currentTeamIndex: stealingTeamIndex,
    })
  }

  const handleStealAnswer = (correct: boolean) => {
    let updatedTeams = [...gameState.teams]

    if (correct) {
      const stealingTeamIndex = gameState.currentTeamIndex
      const pointsForQuestion = getPointsForCurrentQuestion() / 2 // Half points for stealing

      updatedTeams = updatedTeams.map((team, index) => {
        if (index === stealingTeamIndex) {
          return {
            ...team,
            score: team.score + pointsForQuestion,
          }
        }
        return team
      })
    }


    moveToNextQuestion(updatedTeams);
  }

  const moveToNextQuestion = (updatedTeams: Team[]) => {
    const nextQuestionIndex = gameState.currentQuestionIndex + 1

    // Check if we've completed all questions in the current section
    if (nextQuestionIndex === gameState.questions.length) {
      setGameState({
        ...gameState,
        status: "finished",
        teams: updatedTeams,
      });
    } else {
      if (gameState.status === "stealing") {
        setGameState({
          ...gameState,
          teams: updatedTeams,
          status: "playing",
          currentQuestionIndex: gameState.currentQuestionIndex + 1,
          currentTeamIndex: gameState.currentTeamIndex
        })
        return;
      }


      // Move to the next question in the current section
      setGameState({
        ...gameState,
        teams: updatedTeams,
        status: "playing",
        currentQuestionIndex: nextQuestionIndex,
        currentTeamIndex: gameState.currentTeamIndex === 0 ? 1 : 0, // Switch teams between questions
      })
    }
  }

  const getPointsForCurrentQuestion = () => {
    // Points increase with section and question difficulty
    const basePoints = 1000
    const sectionMultiplier = gameState.currentSection + 1

    return basePoints * sectionMultiplier;
  }

  const useLifeline = (lifeline: "fiftyFifty" | "askAudience" | "swapQuestion") => {
    const teamKey = gameState.currentTeamIndex === 0 ? "team1" : "team2"

    // Check if the lifeline has already been used
    if (gameState.usedLifelines[teamKey][lifeline]) {
      return
    }

    const updatedLifelines = {
      ...gameState.usedLifelines,
      [teamKey]: {
        ...gameState.usedLifelines[teamKey],
        [lifeline]: true,
      },
    }
    
    setGameState({
      ...gameState,
      usedLifelines: updatedLifelines,
    })
  }

  const resetGame = () => {
    setGameState({
      status: "setup",
      teams: [],
      selectedCategoryIds: [],
      currentTeamIndex: 0,
      currentSection: 0,
      currentQuestionIndex: 0,
      questions: [],
      usedLifelines: {
        team1: {
          fiftyFifty: false,
          askAudience: false,
          swapQuestion: false,
        },
        team2: {
          fiftyFifty: false,
          askAudience: false,
          swapQuestion: false,
        },
      },
    })
  }

  if (gameState.status === "setup") {
    return <TeamSetup onStartGame={startGame} />
  }

  if (gameState.status === "category-select") {
    return <CategorySelect onStartQuiz={startQuiz} isStarting={isStarting} />
  }

  if (gameState.status === "finished") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-100">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-center mb-8">
            <Brain className="h-12 w-12 text-purple-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">Game Over!</h1>
          </div>
          
          {/* Winner Announcement */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-2xl mb-6 text-gray-700">
              {gameState.teams[0].score > gameState.teams[1].score ? (
                <p className="text-purple-600 font-bold">
                  {gameState.teams[0].name} wins with {gameState.teams[0].score} points!
                </p>
              ) : gameState.teams[1].score > gameState.teams[0].score ? (
                <p className="text-purple-600 font-bold">
                  {gameState.teams[1].name} wins with {gameState.teams[1].score} points!
                </p>
              ) : (
                <p className="text-purple-600 font-bold">It's a tie with {gameState.teams[0].score} points each!</p>
              )}
            </div>
            
            {/* Final Scores */}
            <div className="grid grid-cols-2 gap-6">
              {gameState.teams.map((team, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold mb-2 text-gray-900">{team.name}</h2>
                  <div className="flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-yellow-500 mr-2" />
                    <p className="text-3xl font-bold text-gray-900">{team.score} points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Play Again Button */}
          <Button
            onClick={resetGame}
            className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold text-xl rounded-lg transition-colors flex items-center mx-auto"
          >
            <Play className="h-6 w-6 mr-3" />
            Play Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <GameBoard
      gameState={gameState}
      onCorrectAnswer={handleCorrectAnswer}
      onWrongAnswer={handleWrongAnswer}
      onStealAnswer={handleStealAnswer}
      useLifeline={useLifeline}
      currentPoints={getPointsForCurrentQuestion()}
    />
  )
}
