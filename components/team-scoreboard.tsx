"use client"

import type { Team } from "@/lib/types"

interface TeamScoreboardProps {
  teams: Team[]
  currentTeamIndex: number
  isStealingMode: boolean
}

export default function TeamScoreboard({ teams, currentTeamIndex, isStealingMode }: TeamScoreboardProps) {
  return (
    <div className="flex flex-1 gap-4">
      {teams.map((team, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${
            currentTeamIndex === index ? "bg-yellow-700 border-2 border-yellow-400" : "bg-blue-900"
          }`}
        >
          <div className="font-bold text-lg">{team.name}</div>
          <div className="text-2xl font-bold text-yellow-400">{team.score}</div>
          {currentTeamIndex === index && (
            <div className="text-sm mt-1">{isStealingMode ? "Stealing" : "Current Turn"}</div>
          )}
        </div>
      ))}
    </div>
  )
}
