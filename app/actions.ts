"use server"

import { addSolution } from "@/app/lib/solution-store"

const WEBHOOK_URL = "https://primary-production-72978.up.railway.app/webhook/33c34515-1f6a-4fda-8af4-87471024cbcd"

// Helper functions to force plain text output and strip JSON/code wrappers
function toPlainTextFromAny(value: any): string {
  try {
    if (typeof value === "string") return toPlainText(value)
    if (Array.isArray(value)) {
      const joined = value.map((v) => (typeof v === "string" ? v : JSON.stringify(v))).join("\n")
      return toPlainText(joined)
    }
    if (value && typeof value === "object") {
      const preferredKeys = ["solution", "answer", "message", "result", "text", "content", "output"]
      for (const k of preferredKeys) {
        if (value[k]) return toPlainText(String(value[k]))
      }
      // Fall back to concatenating all string values
      const strings = Object.values(value).filter((v) => typeof v === "string") as string[]
      if (strings.length) return toPlainText(strings.join("\n"))
      return toPlainText(JSON.stringify(value))
    }
    return toPlainText(String(value))
  } catch {
    return "No solution text returned."
  }
}

function toPlainText(raw: string): string {
  if (!raw) return ""
  let text = raw

  // If it looks like JSON, try to parse and extract a friendly field
  const looksJson = /^[\s\n]*[{[]/.test(text.trim())
  if (looksJson) {
    try {
      const parsed = JSON.parse(text)
      return toPlainTextFromAny(parsed)
    } catch {
      // ignore if not valid JSON
    }
  }

  // Strip markdown code fences while keeping inner content
  text = text.replace(/```[a-zA-Z0-9]*\n?/g, "").replace(/```/g, "")

  // Remove leading/trailing JSON-y wrappers
  text = text.replace(/^[\s"'{}[\]]+/, "").replace(/[\s"'{}[\]]+$/, "")

  // Remove obvious JSON key labels like: key: value
  text = text.replace(/(^|\n)\s*"?[A-Za-z0-9_\- ]+"?\s*:\s*/g, "$1")

  // Strip disallowed special symbols
  text = text.replace(/[*#$/$$$$]/g, "")

  // Normalize whitespace but keep readable breaks
  text = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")

  return text.trim()
}

type SubmitState = {
  success: boolean
  id?: string
  solution?: string
  error?: string
}

export async function submitProblem(_prev: SubmitState | undefined, formData: FormData): Promise<SubmitState> {
  const problem = String(formData.get("problem") ?? "").trim()
  const category = String(formData.get("category") ?? "").trim()
  const priority = String(formData.get("priority") ?? "").trim()

  if (!problem) return { success: false, error: "Please describe your problem." }
  if (!category) return { success: false, error: "Please choose a category." }
  if (!priority) return { success: false, error: "Please set a priority level." }

  try {
    const payload = {
      problem,
      category,
      priority,
      metadata: {
        submittedAt: new Date().toISOString(),
        source: "GetHelp",
      },
    }

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain;q=0.8",
      },
      body: JSON.stringify(payload),
    })

    const contentType = res.headers.get("content-type") || ""
    let solutionText = ""
    if (contentType.includes("application/json")) {
      const data = await res.json()
      solutionText = toPlainTextFromAny(data)
    } else {
      const text = await res.text()
      solutionText = toPlainText(text)
    }
    solutionText = solutionText.trim() || "No solution text returned."

    const id = crypto.randomUUID()
    await addSolution({
      id,
      problem,
      category,
      priority,
      solution: solutionText,
      timestamp: Date.now(),
    })

    return { success: true, id, solution: solutionText }
  } catch (err: any) {
    return { success: false, error: err?.message ?? "Unexpected error." }
  }
}
