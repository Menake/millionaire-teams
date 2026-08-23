"use client"

import { useEffect, useState } from "react"
import { getCategories, type CategoryOption } from "@/app/actions"
import { QUIZ_LENGTH } from "@/lib/pick-questions"
import { Button } from "@/components/ui/button"
import { Check, Layers, Loader2, Play } from "lucide-react"

interface CategorySelectProps {
  onStartQuiz: (categoryIds: string[]) => void
  isStarting: boolean
}

export default function CategorySelect({ onStartQuiz, isStarting }: CategorySelectProps) {
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load categories"))
  }, [])

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    )

  const perCategory = selected.length > 0 ? Math.floor(QUIZ_LENGTH / selected.length) : 0

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <p className="text-xl font-bold text-gray-900 mb-2">No question bank found</p>
        <p className="text-gray-600 mb-4">{error}</p>
        <code className="bg-gray-900 text-gray-100 px-4 py-2 rounded-lg text-sm">
          bun run db:seed
        </code>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-3">
            <Layers className="h-10 w-10 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Choose your categories</h1>
          </div>
          <p className="text-gray-600">
            We'll build a {QUIZ_LENGTH}-question quiz, easiest first.
          </p>
        </div>

        {/* Category grid */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {categories.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-gray-400">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((category) => {
                const isSelected = selected.includes(category.id)
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggle(category.id)}
                    aria-pressed={isSelected}
                    className={`relative flex flex-col items-center text-center gap-2 rounded-lg border-2 p-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
                      isSelected
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                    )}
                    <span className="text-3xl leading-none" aria-hidden="true">
                      {category.emoji}
                    </span>
                    <span
                      className={`text-sm font-semibold leading-tight ${
                        isSelected ? "text-purple-700" : "text-gray-900"
                      }`}
                    >
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500">{category.questionCount} questions</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Selection summary + start */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4 h-5">
            {selected.length === 0
              ? "Pick at least one category to begin"
              : `${selected.length} ${selected.length === 1 ? "category" : "categories"} — about ${perCategory} question${perCategory === 1 ? "" : "s"} from each`}
          </p>
          <Button
            onClick={() => onStartQuiz(selected)}
            disabled={selected.length === 0 || isStarting}
            className="w-full px-8 py-6 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-xl rounded-lg transition-colors flex items-center justify-center mx-auto"
          >
            {isStarting ? (
              <>
                <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                Building your quiz…
              </>
            ) : (
              <>
                <Play className="h-6 w-6 mr-3" />
                Start Quiz
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
