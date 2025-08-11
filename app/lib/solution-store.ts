export type StoredSolution = {
  id: string
  problem: string
  category: string
  priority: string
  solution: string
  timestamp: number
}

const store: StoredSolution[] = []

export async function addSolution(entry: StoredSolution) {
  store.unshift(entry)
  if (store.length > 100) store.pop()
}

export async function listSolutions(limit = 12): Promise<StoredSolution[]> {
  return store.slice(0, limit)
}
