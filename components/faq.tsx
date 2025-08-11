"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { MessageCircle, Clock, Shield, Database, Zap, Code, Lightbulb, ExternalLink, HelpCircle } from "lucide-react"
import Link from "next/link"

const FAQ_ITEMS = [
  {
    id: "response-time",
    question: "How fast is the response?",
    answer: "Responses are typically generated within 2-5 seconds after submission. The solution appears automatically in a popup dialog, which you can copy or reference later in your history.",
    icon: Clock,
  },
  {
    id: "solution-quality",
    question: "How accurate are the solutions?",
    answer: "Our AI generates high-quality solutions based on best practices and up-to-date knowledge. However, for critical issues (especially in technical, medical, or legal domains), we recommend verifying the information with a specialist.",
    icon: Lightbulb,
  },
  {
    id: "data-privacy",
    question: "What data do you send to the AI?",
    answer: "Only the three fields you provide: your problem description, category, and priority level. All data is transmitted securely via encrypted webhook directly from our server, never exposing API keys in the client.",
    icon: Shield,
  },
  
  {
    id: "history",
    question: "Can I access my previous solutions?",
    answer: "Yes. All your past solutions appear in the 'Recent Solutions' section, organized by category and priority. You can filter, expand, and reference them at any time.",
    icon: Database,
  },
  {
    id: "ai-model",
    question: "What AI technology powers the solutions?",
    answer: "We use a specialized version of a large language model that's been fine-tuned to provide concise, actionable solutions across different domains. The model is regularly updated to ensure accuracy and relevance.",
    icon: Zap,
  },
  {
    id: "usage-limits",
    question: "Are there limits to how many questions I can ask?",
    answer: "The current version allows unlimited questions across all categories. We monitor usage patterns to prevent abuse, but there are no explicit caps for legitimate use cases.",
    icon: Code,
  },
  
]

export default function FAQ() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Background element */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/4 w-[500px] h-[500px] bg-white/3 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm">
          <HelpCircle className="h-3.5 w-3.5" />
          <span className="text-white/80">Common Questions</span>
        </div>
        
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
          Straight answers about how our AI assistant works—no fluff, just the information you need.
        </p>
      </motion.div>

      {/* FAQ Accordion */}
      <div className="mx-auto max-w-4xl">
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <AccordionItem 
                value={item.id} 
                className="border-b border-white/10 py-2 first:border-t"
              >
                <AccordionTrigger className="group flex items-center gap-3 py-5 text-left text-lg font-medium text-white hover:text-white/90 [&[data-state=open]>div>svg]:text-white [&[data-state=open]>div]:text-white">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-200 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white/90">
                    <item.icon className="h-4 w-4" />
                  </div>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-1 text-base leading-relaxed text-white/70">
                  <div className="ml-11">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
        
      </div>
    </section>
  )
}
