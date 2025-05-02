export interface Team {
  name: string
  score: number
}

export interface Question {
  id: number
  question: string
  answers: string[]
  correctAnswer: string
}

export interface Section {
  difficulty: "Easy" | "Medium" | "Hard"
  questions: Question[]
}

export interface GameState {
  status: "setup" | "playing" | "stealing" | "finished"
  teams: Team[]
  currentTeamIndex: number
  currentSection: number
  currentQuestionIndex: number
  questions: Question[]
  usedLifelines: {
    team1: {
      fiftyFifty: boolean
      askAudience: boolean
      swapQuestion: boolean
    }
    team2: {
      fiftyFifty: boolean
      askAudience: boolean
      swapQuestion: boolean
    }
  }
}
