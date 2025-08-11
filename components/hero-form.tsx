"use client"

import { useActionState, useEffect, useMemo, useRef, useState } from "react"
import { submitProblem } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Copy, Loader2, Send, CheckCircle2, Tag, Flag, Sparkles, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

type SubmitState = {
  success: boolean
  id?: string
  solution?: string
  error?: string
}

const initialState: SubmitState = { success: false }

function useTypewriter(text: string, speed = 20) {
  const [output, setOutput] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!text) {
      setOutput("")
      setIsComplete(false)
      return
    }
    let i = 0
    setOutput("")
    setIsComplete(false)
    const id = setInterval(() => {
      setOutput((prev) => prev + text.charAt(i))
      i++
      if (i >= text.length) {
        clearInterval(id)
        setIsComplete(true)
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return { output, isComplete }
}

const CATEGORY_OPTIONS = [
  { value: "academic", label: "Academic Support", icon: "📚" },
  { value: "social", label: "Social & Relationships", icon: "👥" },
  { value: "personal", label: "Personal Development", icon: "🌱" },
  { value: "work", label: "Career & Work", icon: "💼" },
  { value: "technical", label: "Technical Issues", icon: "🔧" },
  { value: "health", label: "Health & Wellness", icon: "🏃" },
  { value: "financial", label: "Financial Guidance", icon: "💰" },
  { value: "other", label: "Other", icon: "✨" },
] as const

const PRIORITY_OPTIONS = [
  { value: "P0", label: "Critical - Need help now", color: "text-red-400" },
  { value: "P1", label: "High - Important issue", color: "text-orange-400" },
  { value: "P2", label: "Medium - Can wait a bit", color: "text-yellow-400" },
  { value: "P3", label: "Low - General question", color: "text-green-400" },
] as const

export default function HeroForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()
  const [state, formAction, isPending] = useActionState<SubmitState, FormData>(submitProblem, initialState)
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Controlled selects
  const [category, setCategory] = useState<string>("")
  const [priority, setPriority] = useState<string>("")
  const [problemText, setProblemText] = useState<string>("")

  const { output: typedSolution, isComplete } = useTypewriter(state.solution ?? "", 15)

  useEffect(() => {
    if (state.success) {
      setOpen(true)
      formRef.current?.reset()
      setCategory("")
      setPriority("")
      setProblemText("")
    } else if (state.error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: state.error || "Please try again in a moment.",
      })
    }
  }, [state.success, state.error, toast])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(state.solution ?? "")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied to clipboard",
        description: "Solution copied successfully",
      })
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Please try selecting and copying manually",
      })
    }
  }

  const panel = useMemo(
    () => (
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-0.5 backdrop-blur-sm">
        {/* Glow effect */}
        <div className="absolute inset-0 -z-10 rounded-2xl opacity-50">
          <div className="pointer-events-none h-full w-full animate-pulse rounded-2xl bg-gradient-to-t from-transparent via-white/10 to-transparent" />
        </div>

        <Card className="rounded-2xl border-0 bg-black/90 shadow-2xl">
          <CardHeader className="space-y-1 px-6 pt-6 pb-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-white/70" />
                <h3 className="text-lg font-medium text-white">Get Personalized Help</h3>
              </div>
            </motion.div>
            <p className="text-sm text-white/50">Our AI assistant is here to help you find solutions</p>
          </CardHeader>

          <CardContent className="space-y-6 px-6 pb-6">
            <form ref={formRef} action={formAction} className="space-y-6">
              {/* Category & Priority Grid */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white/90">
                    <span className="inline-flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-white/60" />
                      What do you need help with?
                    </span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-11 border-white/20 bg-white/5 text-white transition-all hover:bg-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/20">
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent className="border-white/20 bg-black/95 backdrop-blur-xl">
                      {CATEGORY_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">{opt.icon}</span>
                            {opt.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="category" value={category} />
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white/90">
                    <span className="inline-flex items-center gap-2">
                      <Flag className="h-3.5 w-3.5 text-white/60" />
                      How urgent is this?
                    </span>
                  </Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="h-11 border-white/20 bg-white/5 text-white transition-all hover:bg-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/20">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent className="border-white/20 bg-black/95 backdrop-blur-xl">
                      {PRIORITY_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          <span className={`font-medium ${opt.color}`}>
                            {opt.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="priority" value={priority} />
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-2">
                <Label htmlFor="problem" className="text-sm font-medium text-white/90">
                  Tell us what's happening
                </Label>
                <div className="relative">
                  <Textarea
                    id="problem"
                    name="problem"
                    required
                    value={problemText}
                    onChange={(e) => setProblemText(e.target.value)}
                    placeholder="Describe your situation in detail. The more context you provide, the better we can help..."
                    className="min-h-[140px] resize-none border-white/20 bg-white/5 text-white placeholder:text-white/40 transition-all hover:bg-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/20"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-white/30">
                    {problemText.length > 0 && `${problemText.length} characters`}
                  </div>
                </div>
                <p className="text-xs text-white/40">
                  Your information is processed securely and privately
                </p>
              </div>

              {/* Submit Button */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isPending ? "loading" : "ready"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="hidden md:flex items-center gap-2 text-xs text-white/40">
                    <AlertCircle className="h-3 w-3" />
                    <span>AI-powered responses in seconds</span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending || !category || !priority || !problemText.trim()}
                    className="ml-auto h-11 min-w-[140px] bg-white text-black font-medium shadow-lg transition-all hover:bg-white/90 hover:shadow-xl disabled:opacity-50 disabled:shadow-none"
                  >
                    {isPending ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-2"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Get Solution
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              </AnimatePresence>
            </form>
          </CardContent>
        </Card>
      </div>
    ),
    [formAction, isPending, category, priority, problemText]
  )

  return (
  <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {panel}
    </motion.div>

    {/* Solution Modal */}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl border-white/10 bg-black/95 backdrop-blur-2xl text-white p-0 overflow-hidden">
        
        {/* Header with gradient */}
        <div className="relative border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent px-8 py-6">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="flex items-center gap-3 text-2xl font-medium">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              Your Personalized Solution
            </DialogTitle>
            <DialogDescription className="mt-2 text-white/60">
              Here's a tailored solution based on your specific situation
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Solution Content */}
        <div className="space-y-6 p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-white/5 to-transparent opacity-50 blur-xl" />
            <div
              className="relative min-h-[200px] max-h-[60vh] overflow-auto rounded-xl border border-white/10 bg-white/5 p-6 text-base leading-relaxed text-white/90 whitespace-pre-wrap selection:bg-white/20 selection:text-white scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20"
              aria-live="polite"
              aria-atomic="true"
            >
              {typedSolution || (isPending ? "Analyzing your situation..." : state.solution)}
              {!isComplete && typedSolution && (
                <span className="inline-block w-2 h-5 ml-1 bg-white/60 animate-pulse" />
              )}
            </div>
          </motion.div>

          {/* Actions */}
          <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 text-center sm:text-left">
              This solution was generated specifically for your needs
            </p>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  </>); }