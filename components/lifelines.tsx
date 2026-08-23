"use client"

import { Button } from "@/components/ui/button"
import { X, Brain, RefreshCw, Scissors } from "lucide-react"

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
    <div className="flex gap-3">
      {/* 50:50 */}
      <Button
        variant="outline"
        size="lg"
        onClick={onFiftyFifty}
        disabled={usedLifelines.fiftyFifty || isStealingMode}
        className={`w-16 h-16 p-0 rounded-lg ${
          usedLifelines.fiftyFifty ? "opacity-50 bg-gray-300" : "bg-purple-500 hover:bg-purple-600 border-purple-500"
        }`}
        title="50:50 - Removes two incorrect answers"
      >
        <div className="flex flex-col items-center">
          <Scissors className="h-6 w-6 text-white" />
          <span className="text-xs text-white mt-1">50:50</span>
        </div>
      </Button>

      {/* Ask AI */}
      <Button
        variant="outline"
        size="lg"
        onClick={onAskAudience}
        disabled={usedLifelines.askAudience || isStealingMode}
        className={`w-16 h-16 p-0 rounded-lg ${
          usedLifelines.askAudience ? "opacity-50 bg-gray-300" : "bg-purple-500 hover:bg-purple-600 border-purple-500"
        }`}
        title="Ask AI - Shows AI poll results"
      >
        <div className="flex flex-col items-center">
          <Brain className="h-6 w-6 text-white" />
          <span className="text-xs text-white mt-1">Ask AI</span>
        </div>
      </Button>
    </div>
  )
}
