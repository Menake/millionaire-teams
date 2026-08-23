import type { SeedQuestion } from "./questions/types"
import { crime } from "./questions/crime"
import { economics } from "./questions/economics"
import { foodDrink } from "./questions/food-drink"
import { generalKnowledge } from "./questions/general-knowledge"
import { geography } from "./questions/geography"
import { history } from "./questions/history"
import { movies } from "./questions/movies"
import { popCulture } from "./questions/pop-culture"
import { songs } from "./questions/songs"
import { scienceNature } from "./questions/science-nature"
import { sriLanka } from "./questions/sri-lanka"
import { technology } from "./questions/technology"

export interface SeedCategory {
  id: string
  name: string
  emoji: string
  questions: SeedQuestion[]
}

/** Source of truth for the question bank. `bun run db:seed` loads this into questions.db. */
export const CATEGORIES: SeedCategory[] = [
  { id: "general-knowledge", name: "General Knowledge", emoji: "🧠", questions: generalKnowledge },
  { id: "history", name: "History", emoji: "🏛️", questions: history },
  { id: "geography", name: "Geography", emoji: "🌍", questions: geography },
  { id: "science-nature", name: "Science & Nature", emoji: "🔬", questions: scienceNature },
  { id: "sri-lanka", name: "Sri Lanka", emoji: "🇱🇰", questions: sriLanka },
  { id: "economics", name: "Economics", emoji: "📈", questions: economics },
  { id: "pop-culture", name: "Pop Culture", emoji: "📺", questions: popCulture },
  { id: "movies", name: "Movies", emoji: "🎬", questions: movies },
  { id: "songs", name: "Songs", emoji: "🎵", questions: songs },
  { id: "food-drink", name: "Food & Drink", emoji: "🍜", questions: foodDrink },
  { id: "crime", name: "Crime", emoji: "🔍", questions: crime },
  { id: "technology", name: "Technology", emoji: "💻", questions: technology },
]
