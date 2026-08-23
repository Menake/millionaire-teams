import type { Difficulty, Question } from "./types"

/** A question as it comes out of the DB, carrying how often it has been played. */
export interface PoolQuestion extends Question {
  timesUsed: number
}

export const QUIZ_LENGTH = 20

const TIERS: Difficulty[] = ["easy", "medium", "hard"]

/** Non-mutating Fisher-Yates. The old shuffleArray sorted its argument in place, which
 *  permanently reordered the module-level question bank on every game. */
export function shuffled<T>(items: readonly T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Split `total` across the three tiers, remainder going to the easier end. 20 -> 7/7/6. */
function tierQuotas(total: number): Record<Difficulty, number> {
  const base = Math.floor(total / 3)
  const rest = total % 3
  return { easy: base + (rest > 0 ? 1 : 0), medium: base + (rest > 1 ? 1 : 0), hard: base }
}

/** Least-played first, random among equal play counts.
 *  Sorted descending because the draw pops from the end. Array.sort is stable, so the
 *  shuffle survives as the tiebreak within each usage count. */
function byLeastUsed(items: PoolQuestion[]): PoolQuestion[] {
  return shuffled(items).sort((a, b) => b.timesUsed - a.timesUsed)
}

/**
 * Draw `total` questions spread evenly across `categoryIds`, ordered as a difficulty
 * ladder (easy first, hard last) with random order inside each tier.
 *
 * Questions played in previous games are deprioritised: within each category/difficulty
 * bucket the least-played are taken first, so the bank cycles before it repeats.
 *
 * Pure — takes the pool rather than reading the DB, so it can be tested without one.
 */
export function pickQuestions(
  pool: PoolQuestion[],
  categoryIds: string[],
  total = QUIZ_LENGTH,
): PoolQuestion[] {
  const cats = categoryIds.filter((id) => pool.some((q) => q.categoryId === id))
  if (cats.length === 0) return []

  // buckets[categoryId][tier] -> shuffled questions, popped as they're drawn
  const buckets = new Map<string, Record<Difficulty, PoolQuestion[]>>(
    cats.map((id) => [
      id,
      {
        easy: byLeastUsed(pool.filter((q) => q.categoryId === id && q.difficulty === "easy")),
        medium: byLeastUsed(pool.filter((q) => q.categoryId === id && q.difficulty === "medium")),
        hard: byLeastUsed(pool.filter((q) => q.categoryId === id && q.difficulty === "hard")),
      },
    ]),
  )

  const quotas = tierQuotas(total)
  const picked: PoolQuestion[] = []

  TIERS.forEach((tier, tierIndex) => {
    // round-robin across categories so each contributes its fair share of this tier
    const order = shuffled(cats)
    let need = quotas[tier]
    let i = 0
    let misses = 0
    while (need > 0 && misses < order.length) {
      const next = buckets.get(order[i % order.length])![tier].pop()
      if (next) {
        picked.push(next)
        need--
        misses = 0
      } else {
        misses++
      }
      i++
    }
    // this tier ran dry — push the shortfall onto the next one
    if (need > 0 && tierIndex < TIERS.length - 1) quotas[TIERS[tierIndex + 1]] += need
  })

  // still short (a thin bank) — top up from whatever's left rather than serving a short game
  if (picked.length < total) {
    const used = new Set(picked.map((q) => q.id))
    const rest = byLeastUsed(pool.filter((q) => cats.includes(q.categoryId) && !used.has(q.id)))
    picked.push(...rest.slice(-(total - picked.length)))
  }

  // the ladder, plus a per-question answer scramble so option order varies between games
  return TIERS.flatMap((tier) => shuffled(picked.filter((q) => q.difficulty === tier))).map(
    (q) => ({ ...q, answers: shuffled(q.answers) }),
  )
}
