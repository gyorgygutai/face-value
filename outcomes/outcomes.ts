import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { RequestPayload } from "@/types/schema"

export type Outcome = {
  id: string
  title: string
  order: number
}

export type OutcomeFull = Outcome & RequestPayload

const outcomesDir = path.join(process.cwd(), "outcomes")

export function getOutcomes(): Outcome[] {
  const files = fs.readdirSync(outcomesDir).filter((f) => f.endsWith(".md"))
  return files
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(outcomesDir, file), "utf-8"))
      return { id: data.id as string, title: data.title as string, order: data.order as number }
    })
    .sort((a, b) => a.order - b.order)
}

export function getOutcomeFull(id: string): OutcomeFull | null {
  const files = fs.readdirSync(outcomesDir).filter((f) => f.endsWith(".md"))
  for (const file of files) {
    const { data, content } = matter(fs.readFileSync(path.join(outcomesDir, file), "utf-8"))
    if (data.id === id) {
      return {
        id: data.id as string,
        title: data.title as string,
        order: data.order as number,
        prompt: content.trim(),
        height: data.height as number,
        width: data.width as number,
      }
    }
  }
  return null
}
