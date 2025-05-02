"use client"

import type { Question } from "@/lib/types"
import { motion } from "framer-motion"

interface QuestionDisplayProps {
  isStealingMode: boolean;
  question: Question
  selectedAnswer: string | null
  showResult: boolean
  onSelectAnswer: (answer: string) => void
  eliminatedAnswers: number[]
  audienceResults: number[]
}

export default function QuestionDisplay({
  isStealingMode,
  question,
  selectedAnswer,
  showResult,
  onSelectAnswer,
  eliminatedAnswers,
  audienceResults,
}: QuestionDisplayProps) {
  const getAnswerClassName = (answer: string, index: number) => {
    let className = "p-4 rounded-lg mb-4 cursor-pointer transition-all duration-300 text-lg font-medium"

    // Base styling
    className += " border-2"

    // Selected state
    if (selectedAnswer === answer) {
      className += " border-yellow-400 bg-blue-800"
    } else {
      className += " border-blue-700 bg-blue-900 hover:bg-blue-800"
    }

    // Show correct/incorrect when result is shown
    if (showResult && selectedAnswer === answer) {
      if (answer === question.correctAnswer) {
        className += " border-green-500 bg-green-900"
      } else {
        className += " border-red-500 bg-red-900"
      }
    }

    // Highlight correct answer when result is shown
    if (showResult && answer === question.correctAnswer && selectedAnswer !== answer && isStealingMode) {
      className += " border-green-500 bg-green-900"
    }

    // If this answer is eliminated by 50:50
    if (eliminatedAnswers.includes(index)) {
      className += " bg-gray-600 pointer-events-none"
    }

    return className
  }

  const answerLetters = ["A", "B", "C", "D"]

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-blue-900 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <span className="inline-block w-8 h-8 rounded-full  text-center leading-8 mr-3">
                {answerLetters[index]}
              </span>
              <span>{answer}</span>

              {audienceResults.length > 0 && (
                <div className="ml-auto">
                  <div className="bg-blue-700 h-4 w-20 rounded-full overflow-hidden">
                    <div className="bg-yellow-400 h-full" style={{ width: `${audienceResults[index]}%` }}></div>
                  </div>
                  <div className="text-xs text-center mt-1">{audienceResults[index]}%</div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
