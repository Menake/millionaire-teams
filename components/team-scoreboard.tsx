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
      {teams.map((team, index) => {
        const fontColour = currentTeamIndex === index 
          ? "text-blue-900"
          : "text-white";

        return (
          <div
            key={index}
            className={`p-4 rounded-lg w-1/2 ${
              currentTeamIndex === index ? "bg-yellow-500 border-2 border-yellow-700" : "bg-blue-900"
            }`}
          >
            <div className={`font-bold text-lg ${fontColour}`}>{team.name}</div>
            <div className={`text-2xl font-bold ${fontColour}`}>{team.score}</div>
            {currentTeamIndex === index && (
              <div className={`text-sm mt-1 ${fontColour}`}>{isStealingMode ? "Stealing" : "Current Turn"}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
