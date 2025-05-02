"use client"

import { useState } from "react"
import type { Team } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TeamSetupProps {
  onStartGame: (teams: Team[]) => void
}

export default function TeamSetup({ onStartGame }: TeamSetupProps) {
  const [teams, setTeams] = useState<Team[]>([
    { name: "Team 1", score: 0 },
    { name: "Team 2", score: 0 },
  ])

  const handleTeamNameChange = (index: number, name: string) => {
    const updatedTeams = [...teams]
    updatedTeams[index].name = name
    setTeams(updatedTeams)
  }

  const handleStartGame = () => {
    // Validate team names
    if (teams[0].name.trim() === "" || teams[1].name.trim() === "") {
      alert("Please enter names for both teams")
      return
    }

    onStartGame(teams)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-yellow-400">Who Wants to Be a Millionaire</h1>
          <h2 className="text-2xl font-semibold">Team Edition</h2>
        </div>

        <div className="bg-blue-900 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Team Setup</h3>

          {teams.map((team, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">Team {index + 1} Name:</label>
              <Input
                type="text"
                value={team.name}
                onChange={(e) => handleTeamNameChange(index, e.target.value)}
                className="w-full bg-blue-800 border-blue-700 text-white"
                placeholder={`Enter Team ${index + 1} name`}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleStartGame}
            className="px-8 py-6 bg-yellow-500 text-blue-900 font-bold text-xl rounded-full hover:bg-yellow-400 transition-colors"
          >
            Start Game
          </Button>
        </div>
      </div>
    </div>
  )
}
