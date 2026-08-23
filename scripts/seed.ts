// bun:sqlite for writing (this script runs under Bun, which can't load better-sqlite3's
// Node-API bindings); the Next.js server reads the same file with better-sqlite3 under Node.
import { Database } from "bun:sqlite"
import { existsSync } from "node:fs"
import path from "node:path"
import { CATEGORIES } from "../data/questions"
import type { Difficulty } from "../data/questions/types"

const DB_PATH = path.join(process.cwd(), "questions.db")
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"]

const problems: string[] = []
const seenQuestions = new Map<string, string>()

function check(condition: boolean, where: string, message: string) {
  if (!condition) problems.push(`${where}: ${message}`)
}

for (const category of CATEGORIES) {
  for (const [i, q] of category.questions.entries()) {
    const where = `${category.id}[${i}] "${q.question.slice(0, 60)}"`

    check(q.answers.length === 4, where, `has ${q.answers.length} answers, expected 4`)
    check(
      new Set(q.answers).size === q.answers.length,
      where,
      "has duplicate answer strings (breaks the 50:50 lifeline)",
    )
    check(
      q.answers.includes(q.correctAnswer),
      where,
      `correctAnswer "${q.correctAnswer}" is not one of the answers`,
    )
    check(DIFFICULTIES.includes(q.difficulty), where, `bad difficulty "${q.difficulty}"`)
    check(q.question.trim().length > 0, where, "empty question text")
    check(
      q.answers.every((a) => a.trim().length > 0),
      where,
      "has a blank answer",
    )

    const key = q.question.trim().toLowerCase()
    const dupe = seenQuestions.get(key)
    check(dupe === undefined, where, `duplicates a question already in ${dupe}`)
    seenQuestions.set(key, category.id)
  }

  for (const difficulty of DIFFICULTIES) {
    const n = category.questions.filter((q) => q.difficulty === difficulty).length
    // a single-category game needs 7 easy / 7 medium / 6 hard to fill 20 questions
    check(n >= 7, category.id, `only ${n} ${difficulty} questions, want at least 7`)
  }
}

if (problems.length > 0) {
  console.error(`\n✗ ${problems.length} problem(s) — nothing was written:\n`)
  for (const p of problems) console.error(`  ${p}`)
  process.exit(1)
}

// Carry play history across re-seeds, matched on question text. Without this, adding
// questions would reset every counter and the freshly added ones would lose their head start.
const history = new Map<string, { timesUsed: number; lastUsedAt: string | null }>()
if (existsSync(DB_PATH)) {
  try {
    const previous = new Database(DB_PATH, { readonly: true })
    const rows = previous
      .query("SELECT question, times_used AS timesUsed, last_used_at AS lastUsedAt FROM questions")
      .all() as { question: string; timesUsed: number; lastUsedAt: string | null }[]
    for (const row of rows) history.set(row.question, row)
    previous.close()
  } catch {
    // older schema or unreadable file — start the counters fresh
  }
}

const db = new Database(DB_PATH, { create: true })
db.exec("PRAGMA foreign_keys = ON")
db.exec(`
  DROP TABLE IF EXISTS questions;
  DROP TABLE IF EXISTS categories;
  CREATE TABLE categories (
    id    TEXT PRIMARY KEY,
    name  TEXT NOT NULL,
    emoji TEXT NOT NULL
  );
  CREATE TABLE questions (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id    TEXT NOT NULL REFERENCES categories(id),
    question       TEXT NOT NULL,
    answers        TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    difficulty     TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    times_used     INTEGER NOT NULL DEFAULT 0,
    last_used_at   TEXT
  );
  CREATE INDEX questions_by_category ON questions (category_id, difficulty, times_used);
`)

const insertCategory = db.prepare("INSERT INTO categories (id, name, emoji) VALUES (?, ?, ?)")
const insertQuestion = db.prepare(
  `INSERT INTO questions (category_id, question, answers, correct_answer, difficulty,
                          times_used, last_used_at)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
)

db.transaction(() => {
  for (const category of CATEGORIES) {
    insertCategory.run(category.id, category.name, category.emoji)
    for (const q of category.questions) {
      const played = history.get(q.question)
      insertQuestion.run(
        category.id,
        q.question,
        JSON.stringify(q.answers),
        q.correctAnswer,
        q.difficulty,
        played?.timesUsed ?? 0,
        played?.lastUsedAt ?? null,
      )
    }
  }
})()

const total = CATEGORIES.reduce((n, c) => n + c.questions.length, 0)
console.log(`\n✓ Seeded ${DB_PATH}\n`)
for (const c of CATEGORIES) {
  const by = (d: Difficulty) => c.questions.filter((q) => q.difficulty === d).length
  console.log(
    `  ${c.emoji}  ${c.name.padEnd(20)} ${String(c.questions.length).padStart(3)}  ` +
      `(${by("easy")} easy, ${by("medium")} medium, ${by("hard")} hard)`,
  )
}
const carried = CATEGORIES.flatMap((c) => c.questions).filter(
  (q) => (history.get(q.question)?.timesUsed ?? 0) > 0,
).length
console.log(
  `\n  ${CATEGORIES.length} categories, ${total} questions` +
    (carried > 0 ? ` (play history kept for ${carried})` : "") +
    "\n",
)
db.close()
