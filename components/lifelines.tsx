"use client"

import { Button } from "@/components/ui/button"
import { SplitSquareVertical, Users, RefreshCw } from "lucide-react"

interface LifelinesProps {
  usedLifelines: {
    fiftyFifty: boolean
    askAudience: boolean
    swapQuestion: boolean
  }
  isStealingMode: boolean
  onFiftyFifty: () => void
  onAskAudience: () => void
  onSwapQuestion: () => void
}

export default function Lifelines({ usedLifelines, onFiftyFifty, onAskAudience, onSwapQuestion, isStealingMode }: LifelinesProps) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <Button
        variant="outline"
        size="lg"
        onClick={onFiftyFifty}
        disabled={usedLifelines.fiftyFifty || isStealingMode}
        className={`rounded-full p-3 ${
          usedLifelines.fiftyFifty ? "opacity-50 bg-gray-700" : "bg-blue-800 hover:bg-blue-700"
        }`}
        title="50:50 - Removes two incorrect answers"
      >
        <SplitSquareVertical className="h-6 w-6" />
        <span className="ml-2">50:50</span>
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={onAskAudience}
        disabled={usedLifelines.askAudience || isStealingMode}
        className={`rounded-full p-3 ${
          usedLifelines.askAudience ? "opacity-50 bg-gray-700" : "bg-blue-800 hover:bg-blue-700"
        }`}
        title="Ask the Audience - Shows audience poll results"
      >
        <Users className="h-6 w-6" />
        <span className="ml-2">Ask Audience</span>
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={onSwapQuestion}
        disabled={usedLifelines.swapQuestion || isStealingMode}
        className={`rounded-full p-3 ${
          usedLifelines.swapQuestion ? "opacity-50 bg-gray-700" : "bg-blue-800 hover:bg-blue-700"
        }`}
        title="Swap Question - Get a new question of similar difficulty"
      >
        <RefreshCw className="h-6 w-6" />
        <span className="ml-2">Swap Question</span>
      </Button>
    </div>
  )
}
