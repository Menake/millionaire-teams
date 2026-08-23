import { expect, test } from "bun:test"
import { pickQuestions, QUIZ_LENGTH, type PoolQuestion } from "./pick-questions"
import type { Difficulty } from "./types"

let nextId = 1
function makePool(categoryIds: string[], per: Record<Difficulty, number>): PoolQuestion[] {
  return categoryIds.flatMap((categoryId) =>
    (["easy", "medium", "hard"] as Difficulty[]).flatMap((difficulty) =>
      Array.from({ length: per[difficulty] }, () => ({
        id: nextId++,
        categoryId,
        category: categoryId,
        question: `q${nextId}`,
        answers: ["a", "b", "c", "d"],
        correctAnswer: "a",
        difficulty,
        timesUsed: 0,
      })),
    ),
  )
}

const FULL = { easy: 9, medium: 8, hard: 8 }
const THREE = ["history", "geography", "economics"]

test("draws exactly 20 and never repeats a question", () => {
  const picked = pickQuestions(makePool(THREE, FULL), THREE)
  expect(picked).toHaveLength(QUIZ_LENGTH)
  expect(new Set(picked.map((q) => q.id)).size).toBe(QUIZ_LENGTH)
})

test("only returns questions from the requested categories", () => {
  const pool = makePool([...THREE, "pop-culture"], FULL)
  const picked = pickQuestions(pool, THREE)
  expect(picked.every((q) => THREE.includes(q.categoryId))).toBe(true)
})

test("hits the 7 easy / 7 medium / 6 hard split", () => {
  const picked = pickQuestions(makePool(THREE, FULL), THREE)
  const count = (d: Difficulty) => picked.filter((q) => q.difficulty === d).length
  expect(count("easy")).toBe(7)
  expect(count("medium")).toBe(7)
  expect(count("hard")).toBe(6)
})

test("orders as a ladder: every easy before every medium before every hard", () => {
  const rank: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 }
  const ranks = pickQuestions(makePool(THREE, FULL), THREE).map((q) => rank[q.difficulty])
  expect(ranks).toEqual([...ranks].sort((a, b) => a - b))
})

test("spreads roughly evenly across categories", () => {
  const picked = pickQuestions(makePool(THREE, FULL), THREE)
  for (const id of THREE) {
    const n = picked.filter((q) => q.categoryId === id).length
    expect(n).toBeGreaterThanOrEqual(5) // even share is 6.67
    expect(n).toBeLessThanOrEqual(8)
  }
})

test("a single category still yields a full 20-question game", () => {
  const picked = pickQuestions(makePool(["sri-lanka"], FULL), ["sri-lanka"])
  expect(picked).toHaveLength(QUIZ_LENGTH)
  expect(picked.every((q) => q.categoryId === "sri-lanka")).toBe(true)
})

test("a tier running dry redistributes rather than returning a short game", () => {
  // only 2 hard questions available across both categories, but 6 are wanted
  const pool = makePool(["a", "b"], { easy: 20, medium: 20, hard: 1 })
  const picked = pickQuestions(pool, ["a", "b"])
  expect(picked).toHaveLength(QUIZ_LENGTH)
  expect(picked.filter((q) => q.difficulty === "hard")).toHaveLength(2)
})

test("returns everything available when the pool is smaller than 20", () => {
  const pool = makePool(["a"], { easy: 3, medium: 3, hard: 3 })
  expect(pickQuestions(pool, ["a"])).toHaveLength(9)
})

test("unknown category ids are ignored", () => {
  const pool = makePool(["a"], FULL)
  expect(pickQuestions(pool, ["a", "nope"])).toHaveLength(QUIZ_LENGTH)
  expect(pickQuestions(pool, ["nope"])).toHaveLength(0)
})

test("does not mutate the pool it was given", () => {
  const pool = makePool(THREE, FULL)
  const before = pool.map((q) => q.id)
  pickQuestions(pool, THREE)
  expect(pool.map((q) => q.id)).toEqual(before)
})

test("prefers questions that have never been played", () => {
  const pool = makePool(["a"], FULL)
  // mark everything as played once except a handful
  const fresh = new Set([pool[0].id, pool[1].id, pool[10].id, pool[20].id])
  for (const q of pool) if (!fresh.has(q.id)) q.timesUsed = 1

  const picked = pickQuestions(pool, ["a"])
  for (const id of fresh) {
    expect(picked.some((q) => q.id === id)).toBe(true)
  }
})

test("does not repeat a question while unplayed ones remain", () => {
  // 2 categories = 18 easy / 16 medium / 16 hard. A game takes 7/7/6, so the easy tier
  // is the binding constraint: two full games fit before anything must be reused.
  const pool = makePool(["a", "b"], FULL)
  const seen = new Set<number>()

  for (let game = 0; game < 2; game++) {
    for (const q of pickQuestions(pool, ["a", "b"])) {
      expect(seen.has(q.id)).toBe(false)
      seen.add(q.id)
      pool.find((p) => p.id === q.id)!.timesUsed++
    }
  }
  expect(seen.size).toBe(40)
})

test("evens out play counts once the bank has been through a full cycle", () => {
  const pool = makePool(["a"], FULL)
  for (let game = 0; game < 6; game++) {
    for (const q of pickQuestions(pool, ["a"])) {
      pool.find((p) => p.id === q.id)!.timesUsed++
    }
  }
  // 25 questions, 120 draws — but tier quotas mean usage evens out within each tier
  for (const tier of ["easy", "medium", "hard"] as Difficulty[]) {
    const used = pool.filter((q) => q.difficulty === tier).map((q) => q.timesUsed)
    expect(Math.max(...used) - Math.min(...used)).toBeLessThanOrEqual(1)
  }
})
