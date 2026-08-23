This is a "Who wants to be a millionaire" style game show application. The rules are the same as the original game except instead of one person competing it's two teams that are battling each other. Each team is asked one question and if they get it right they move on to the next round. If they get it wrong then the opposition team has a chance to "steal" the question and get the answer.

Each correct answer should give a certain number of points and each stolen answer will get half of the full points. The winner is the team that has the highest number of points at the end of the game.

The lifelines for this game are the following:
    - 50:50: Same as the original show
    - Ask the audience: Same as the original show
    - Swap questions: Allows the team to get a new question.

## Getting started

The question bank lives in a local SQLite database that is **not** committed — build it
before the first run, and again whenever you change anything under `data/questions/`:

```bash
bun install
bun run db:seed   # writes questions.db from data/questions/
bun run dev
```

## Questions

`data/questions/` is the source of truth — one file per category, plain TypeScript, each
question carrying a `difficulty` (`easy` / `medium` / `hard`) and a `source` note recording
where the fact was verified. `bun run db:seed` validates every entry before writing:
exactly four answers, no duplicate answer strings within a question (duplicates break the
50:50 lifeline), `correctAnswer` present verbatim in `answers`, and at least 7 questions per
difficulty tier so a single-category game can still fill a full round. A bad question fails
the seed loudly rather than shipping.

To add a category, drop a new file in `data/questions/`, register it in `data/questions.ts`,
and re-seed. Nothing else needs changing — the picker reads whatever is in the database.

## Game flow

Team setup → category selection → 20 questions. The 20 are drawn evenly across the chosen
categories and ordered as a difficulty ladder: 7 easy, then 7 medium, then 6 hard. Points are
flat (1000 a question, half for a steal) — difficulty controls the running order, not scoring.

Questions already played are **deprioritised**. Each draw bumps a `times_used` counter on the
20 questions it served, and the next draw takes the least-played first within each
category/difficulty bucket. The bank cycles through before anything repeats, and once every
question has been played the same number of times the choice is random again. Re-seeding
resets the play counts.

```bash
bun test        # draw-logic checks
bun run typecheck
```
