import { NextResponse } from "next/server"
import { listSolutions } from "@/app/lib/solution-store"

export async function GET() {
  const items = await listSolutions(12)
  return NextResponse.json({ items })
}
