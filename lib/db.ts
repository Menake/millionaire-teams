import Database from "better-sqlite3"
import { existsSync } from "node:fs"
import path from "node:path"

const DB_PATH = path.join(process.cwd(), "questions.db")

// ponytail: cached on globalThis so Next's dev hot-reload doesn't leak a handle per edit
const globalForDb = globalThis as unknown as { questionDb?: Database.Database }

export function getDb() {
  if (!globalForDb.questionDb) {
    if (!existsSync(DB_PATH)) {
      throw new Error(`No question database at ${DB_PATH}. Run: bun run db:seed`)
    }
    // writable: drawing a quiz bumps times_used so recent questions get deprioritised
    globalForDb.questionDb = new Database(DB_PATH)
  }
  return globalForDb.questionDb
}
