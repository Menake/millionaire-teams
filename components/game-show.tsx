"use client"

import { useState } from "react"
import TeamSetup from "./team-setup"
import GameBoard from "./game-board"
import type { GameState, Team } from "@/lib/types"
import { generateQuestions, generateSimilarQuestion } from "@/lib/questions"

export default function GameShow() {
  const [gameState, setGameState] = useState<GameState>({
    status: "setup",
    teams: [],
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

  const startGame = (teams: Team[]) => {
    const questions = generateQuestions();

    setGameState({
      ...gameState,
      status: "playing",
      teams,
      questions,
    })
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

    moveToNextQuestion(updatedTeams)
  }

  const moveToNextQuestion = (updatedTeams: Team[]) => {
    const nextQuestionIndex = gameState.currentQuestionIndex + 1

    // Check if we've completed all questions in the current section
    if (gameState.currentQuestionIndex === 12) {
      setGameState({
        ...gameState,
        status: "finished",
        teams: updatedTeams,
      });
    } else {
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

    if (lifeline === "swapQuestion") {
      // Generate a new question of similar difficulty
      const newQuestion = generateSimilarQuestion(gameState.questions);

      const updatedQuestions = [...gameState.questions]
      updatedQuestions[gameState.currentQuestionIndex] = newQuestion

      setGameState({
        ...gameState,
        questions: updatedQuestions,
        usedLifelines: updatedLifelines,
      })
    } else {
      setGameState({
        ...gameState,
        usedLifelines: updatedLifelines,
      })
    }
  }

  const resetGame = () => {
    setGameState({
      status: "setup",
      teams: [],
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

  if (gameState.status === "finished") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="text-5xl font-bold mb-8 text-yellow-400">Game Over!</h1>
        <div className="text-3xl mb-12">
          {gameState.teams[0].score > gameState.teams[1].score ? (
            <p>
              {gameState.teams[0].name} wins with {gameState.teams[0].score} points!
            </p>
          ) : gameState.teams[1].score > gameState.teams[0].score ? (
            <p>
              {gameState.teams[1].name} wins with {gameState.teams[1].score} points!
            </p>
          ) : (
            <p>It's a tie with {gameState.teams[0].score} points each!</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 mb-12 w-full max-w-2xl">
          {gameState.teams.map((team, index) => (
            <div key={index} className="bg-blue-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">{team.name}</h2>
              <p className="text-4xl font-bold text-yellow-400">{team.score} points</p>
            </div>
          ))}
        </div>
        <button
          onClick={resetGame}
          className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold text-xl rounded-full hover:bg-yellow-400 transition-colors"
        >
          Play Again
        </button>
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
