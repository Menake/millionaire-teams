export type Difficulty = "easy" | "medium" | "hard"

export interface SeedQuestion {
  question: string
  answers: [string, string, string, string]
  correctAnswer: string
  difficulty: Difficulty
  /** Short note on where the fact was verified. Not stored in the DB. */
  source: string
}
