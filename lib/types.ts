export type Difficulty = "easy" | "medium" | "hard"

export interface Team {
  name: string
  score: number
}

export interface Category {
  id: string
  name: string
}

export interface Question {
  id: number
  categoryId: string
  category: string
  question: string
  answers: string[]
  correctAnswer: string
  difficulty: Difficulty
}

export interface GameState {
  status: "setup" | "category-select" | "playing" | "stealing" | "finished"
  teams: Team[]
  selectedCategoryIds: string[]
  currentTeamIndex: number
  currentSection: number
  currentQuestionIndex: number
  questions: Question[]
  usedLifelines: {
    team1: { fiftyFifty: boolean; askAudience: boolean; swapQuestion: boolean }
    team2: { fiftyFifty: boolean; askAudience: boolean; swapQuestion: boolean }
  }
}
