"use client"

import type { Question, Team } from "@/lib/types"
import { motion } from "framer-motion"
import { CheckCircle, X } from "lucide-react"

const DIFFICULTY_STYLES = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-rose-100 text-rose-700",
} as const

interface QuestionDisplayProps {
  currentTeam: Team;
  isStealingMode: boolean;
  question: Question
  selectedAnswer: string | null
  showResult: boolean
  showCorrectAnswer?: boolean
  onSelectAnswer: (answer: string) => void
  eliminatedAnswers: number[]
  audienceResults: number[]
}

export default function QuestionDisplay({
  isStealingMode,
  question,
  selectedAnswer,
  showResult,
  showCorrectAnswer = false,
  onSelectAnswer,
  eliminatedAnswers,
  audienceResults,
  currentTeam
}: QuestionDisplayProps) {
  const getAnswerClassName = (answer: string, index: number) => {
    let className = "relative p-6 rounded-lg cursor-pointer transition-all duration-300 text-lg font-medium border-2"

    const darkClasses = [
      "bg-blue-300", // A - blue
      "bg-green-300", // B - green
      "bg-purple-300", // C - purple
      "bg-yellow-300", // D - orange
    ]

    // Base colors for each option (A, B, C, D)
    const colorClasses = [
      "bg-blue-200 border-blue-300", // A - Light blue
      "bg-green-200 border-green-300", // B - Light green
      "bg-purple-200 border-purple-300", // C - Light purple
      "bg-yellow-200 border-yellow-300", // D - Light yellow/orange
    ]

    // If this answer is eliminated by 50:50
    if (eliminatedAnswers.includes(index)) {
      className += " bg-gray-300 border-gray-400 pointer-events-none opacity-50"
    } else {
      className += ` ${colorClasses[index]} hover:${darkClasses[index]}` 
    }
      
    // Selected state (when not showing result)
    if (selectedAnswer === answer && !showResult) {
      className += ` ring-4 ring-purple-500 ${darkClasses[index]}`
    }

    // Show correct/incorrect when result is shown
    if (showResult && selectedAnswer === answer) {
      if (answer === question.correctAnswer) {
        className += " border-green-600 bg-green-100 ring-4 ring-green-500"
      } else {
        className += " border-red-600 bg-red-100 ring-4 ring-red-500"
      }
    }

    // Highlight correct answer when result is shown (for stealing mode or when showing correct answer)
    if (showResult && answer === question.correctAnswer && selectedAnswer !== answer && (isStealingMode || showCorrectAnswer)) {
      className += " border-green-600 bg-green-100 ring-4 ring-green-500"
    }

    return className
  }

  const getAnswerIcon = (answer: string, index: number) => {
    if (!showResult) return null

    // Show checkmark for correct answer
    if (answer === question.correctAnswer && showCorrectAnswer) {
      return <CheckCircle className="h-6 w-6 text-green-600 ml-auto" />
    }

    // Show X for selected wrong answer
    if (selectedAnswer === answer && answer !== question.correctAnswer) {
      return <X className="h-6 w-6 text-red-600 ml-auto" />
    }

    return null
  }

  const answerLetters = ["A", "B", "C", "D"]

  return (
    <div className="w-2/3 mx-auto">
      {/* Question Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
        {/* Category and Question Number */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-40 flex items-center gap-2">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium truncate">
              {question.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${DIFFICULTY_STYLES[question.difficulty]}`}>
              {question.difficulty}
            </span>
          </div>

          <p className="text-3xl text-purple-700 font-medium">{currentTeam.name} {isStealingMode ? "stealing" : "answering"}</p>
          <div className="w-40" />
        </div>

        {/* Question Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
          {question.question}
        </h2>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {question.answers.map((answer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !eliminatedAnswers.includes(index) && onSelectAnswer(answer)}
              className={getAnswerClassName(answer, index)}
            >
              <div className="flex items-center">
                {/* Answer Letter Circle */}
                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mr-4 font-bold text-gray-700">
                  {answerLetters[index]}
                </div>
                
                {/* Answer Text */}
                <span className="text-gray-900 font-medium">{answer}</span>

                {/* Result Icon */}
                {getAnswerIcon(answer, index)}

                {/* Audience Results (if available) */}
                {audienceResults.length > 0 && !showResult && (
                  <div className="ml-auto">
                    <div className="bg-white h-3 w-16 rounded-full overflow-hidden border border-gray-300">
                      <div 
                        className="h-full bg-purple-500 transition-all duration-500" 
                        style={{ width: `${audienceResults[index]}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-center mt-1 text-gray-600">{audienceResults[index]}%</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </div>
  )
}
