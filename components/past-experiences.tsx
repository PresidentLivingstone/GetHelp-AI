"use client"
import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Filter, Zap, AlertCircle, ChevronDown, ChevronUp, RefreshCw, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

type Item = {
  id: string
  problem: string
  category: string
  priority: string
  solution: string
  timestamp: number
}

export default function PastExperiences() {
  const [items, setItems] = useState<Item[] | null>(null)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const fetchData = async () => {
    try {
      setRefreshing(true)
      const res = await fetch("/api/solutions", { cache: "no-store" })
      const data = await res.json()
      setItems(data.items ?? [])
      setIsLoading(false)
    } catch (error) {
      setItems([])
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
    timerRef.current = setInterval(fetchData, 10000) // Refresh every 10 seconds
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const filteredItems = selectedCategory 
    ? items?.filter(item => item.category === selectedCategory) 
    : items

  const categories = items 
    ? Array.from(new Set(items.map(item => item.category)))
    : []

  const priorityColor = (priority: string) => {
    switch(priority) {
      case "P0": return "border-red-500/20 bg-red-500/10 text-red-200"
      case "P1": return "border-orange-500/20 bg-orange-500/10 text-orange-200"
      case "P2": return "border-yellow-500/20 bg-yellow-500/10 text-yellow-200"
      case "P3": return "border-green-500/20 bg-green-500/10 text-green-200"
      default: return "border-white/10 bg-white/10 text-white"
    }
  }

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 bottom-1/4 w-[600px] h-[600px] bg-white/3 blur-3xl rounded-full" />
      </div>

      {/* Header with filter controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="text-white/80">Knowledge Base</span>
            </div>
            
            <h2 className="text-4xl font-semibold tracking-tight text-white">Recent Solutions</h2>
            <p className="mt-3 max-w-2xl text-lg text-white/60">
              Browse through recent challenges our AI has solved. Updated in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {items && items.length > 0 && (
              <div className="relative">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-white/50" />
                  <select
                    className="appearance-none rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDown className="h-4 w-4 text-white/50" />
                  </div>
                </div>
              </div>
            )}
            
            <Button
              onClick={fetchData}
              disabled={refreshing}
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Live indicator */}
        <div className="mt-6 flex items-center gap-2">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <div className="absolute -inset-1 animate-ping rounded-full bg-green-500 opacity-30" />
          </div>
          <p className="text-xs text-white/50">Live updates every 10 seconds</p>
        </div>
      </motion.div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
                  <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />
                  <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />
                </div>
              </div>
              <Separator className="bg-white/10" />
              <div className="p-5 space-y-4">
                <div>
                  <div className="h-4 w-16 mb-2 animate-pulse rounded bg-white/10" />
                  <div className="space-y-2">
                    <div className="h-4 animate-pulse rounded bg-white/10" />
                    <div className="h-4 animate-pulse rounded bg-white/10" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                  </div>
                </div>
                <div>
                  <div className="h-4 w-16 mb-2 animate-pulse rounded bg-white/10" />
                  <div className="space-y-2">
                    <div className="h-4 animate-pulse rounded bg-white/10" />
                    <div className="h-4 animate-pulse rounded bg-white/10" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredItems?.length === 0 ? (
        <Card className="border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 rounded-full bg-white/5 p-4">
              <AlertCircle className="h-8 w-8 text-white/40" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No solutions yet</h3>
            <p className="text-white/60 max-w-md">
              {selectedCategory 
                ? `No solutions found in the "${selectedCategory}" category. Try selecting a different category or submit a new request.`
                : "Be the first to submit a problem using the form above. Your solution will appear here."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredItems?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Card className="group h-full border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-black/70">
                  <CardHeader className="space-y-3 p-5">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="flex items-center gap-1 border-white/10 bg-white/10 text-white/80">
                        <Clock className="h-3 w-3" />
                        {new Date(item.timestamp).toLocaleTimeString([], { 
                          hour: "2-digit", 
                          minute: "2-digit",
                          hour12: true
                        })}
                      </Badge>
                      <span className="text-xs text-white/40">
                        <span className="hidden sm:inline">ID </span>
                        {item.id.slice(0, 8)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="border-white/10 bg-white/10 text-white hover:bg-white/20">
                        {item.category}
                      </Badge>
                      <Badge className={priorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <Separator className="bg-white/10" />
                  
                  <CardContent className="space-y-4 p-5">
                    {/* Problem section */}
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">Problem</p>
                      <div className={`relative overflow-hidden ${expandedItem === item.id ? 'max-h-none' : 'max-h-[80px]'}`}>
                        <p className="text-sm leading-relaxed text-white/85">
                          {item.problem}
                        </p>
                        {item.problem.length > 180 && expandedItem !== item.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent" />
                        )}
                      </div>
                    </div>
                    
                    {/* Solution section */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-wider text-white/50">Solution</p>
                        {item.solution.includes('\n') && (
                          <Badge className="border-white/10 bg-white/5 text-white/60 text-xs">
                            <Zap className="mr-1 h-3 w-3" />
                            AI Generated
                          </Badge>
                        )}
                      </div>
                      <div className={`relative overflow-hidden ${expandedItem === item.id ? 'max-h-none' : 'max-h-[120px]'}`}>
                        <p className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
                          {item.solution}
                        </p>
                        {item.solution.length > 240 && expandedItem !== item.id && (
                          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  {(item.problem.length > 180 || item.solution.length > 240) && (
                    <CardFooter className="p-3 pt-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(item.id)}
                        className="w-full border-t border-white/10 text-xs text-white/50 hover:bg-white/5 hover:text-white/80"
                      >
                        {expandedItem === item.id ? (
                          <span className="flex items-center gap-1">
                            Show Less <ChevronUp className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            Show More <ChevronDown className="h-3 w-3" />
                          </span>
                        )}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}