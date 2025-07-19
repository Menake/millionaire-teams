"use client"

import { useState } from "react"
import type { Team } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Users, Play } from "lucide-react"

interface TeamSetupProps {
  onStartGame: (teams: Team[]) => void
}

export default function TeamSetup({ onStartGame }: TeamSetupProps) {
  const [teams, setTeams] = useState<Team[]>([
    { name: "Team A", score: 0 },
    { name: "Team B", score: 0 },
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
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-purple-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">It's Trivial</h1>
          </div>
        </div>

        {/* Team Setup Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-purple-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Team Setup</h3>
          </div>

          <div className="space-y-6">
            {teams.map((team, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {index === 0 ? "Team A" : "Team B"} Name:
                </label>
                <Input
                  type="text"
                  value={team.name}
                  onChange={(e) => handleTeamNameChange(index, e.target.value)}
                  className="w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-900"
                  placeholder={`Enter ${index === 0 ? "Team A" : "Team B"} name`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Start Game Button */}
        <div className="text-center">
          <Button
            onClick={handleStartGame}
            className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold text-xl rounded-lg transition-colors flex items-center mx-auto"
          >
            <Play className="h-6 w-6 mr-3" />
            Start Game
          </Button>
        </div>
      </div>
    </div>
  )
}
