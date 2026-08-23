"use server"

import { getDb } from "@/lib/db"
import { pickQuestions, QUIZ_LENGTH, type PoolQuestion } from "@/lib/pick-questions"
import type { Category, Question } from "@/lib/types"

export interface CategoryOption extends Category {
  emoji: string
  questionCount: number
}

export async function getCategories(): Promise<CategoryOption[]> {
  return getDb()
    .prepare(
      `SELECT c.id, c.name, c.emoji, COUNT(q.id) AS questionCount
       FROM categories c
       LEFT JOIN questions q ON q.category_id = c.id
       GROUP BY c.id
       ORDER BY c.name`,
    )
    .all() as CategoryOption[]
}

interface QuestionRow extends Omit<PoolQuestion, "answers"> {
  answers: string
}

export async function getQuizQuestions(categoryIds: string[]): Promise<Question[]> {
  if (categoryIds.length === 0) return []

  const db = getDb()
  const placeholders = categoryIds.map(() => "?").join(", ")
  const rows = db
    .prepare(
      `SELECT q.id, q.category_id AS categoryId, c.name AS category, q.question,
              q.answers, q.correct_answer AS correctAnswer, q.difficulty,
              q.times_used AS timesUsed
       FROM questions q
       JOIN categories c ON c.id = q.category_id
       WHERE q.category_id IN (${placeholders})`,
    )
    .all(...categoryIds) as QuestionRow[]

  const pool: PoolQuestion[] = rows.map((row) => ({ ...row, answers: JSON.parse(row.answers) }))
  const picked = pickQuestions(pool, categoryIds, QUIZ_LENGTH)

  // record the draw so these questions sink to the back of the queue next game
  const markUsed = db.prepare(
    "UPDATE questions SET times_used = times_used + 1, last_used_at = ? WHERE id = ?",
  )
  const now = new Date().toISOString()
  db.transaction((questions: Question[]) => {
    for (const q of questions) markUsed.run(now, q.id)
  })(picked)

  return picked
}
