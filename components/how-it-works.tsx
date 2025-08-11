"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Webhook, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Share Your Challenge",
      description: "Tell us what you're facing. Select a category and priority level to help us understand your needs better.",
      features: ["Quick form", "Multiple categories", "Priority levels"],
      gradient: "from-white/10 via-white/5 to-transparent",
    },
    {
      icon: Webhook,
      title: "AI Analysis",
      description: "Your request is securely processed by our specialized AI that's trained to provide personalized solutions.",
      features: ["Secure processing", "Context-aware", "Instant analysis"],
      gradient: "from-white/10 via-white/5 to-transparent",
    },
    {
      icon: CheckCircle2,
      title: "Get Your Solution",
      description: "Receive a detailed, actionable solution tailored specifically to your situation within seconds.",
      features: ["Personalized advice", "Actionable steps", "Copy & apply"],
      gradient: "from-white/10 via-white/5 to-transparent",
    },
  ]

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-3xl rounded-full" />
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
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-white/80">Simple 3-step process</span>
        </div>
        
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          How It Works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
          Get personalized solutions in seconds. Our AI assistant understands your unique situation and provides tailored guidance.
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
        {/* Connection lines for desktop */}
        <div className="absolute top-1/4 left-1/4 right-1/4 hidden md:block">
          <div className="flex items-center justify-between">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-white/20 to-white/10" />
            <ArrowRight className="mx-4 h-4 w-4 text-white/30" />
            <div className="h-[2px] flex-1 bg-gradient-to-r from-white/10 to-white/20" />
            <ArrowRight className="mx-4 h-4 w-4 text-white/30" />
            <div className="h-[2px] flex-1 bg-gradient-to-r from-white/20 to-white/10" />
          </div>
        </div>

        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative"
          >
            <Card className="group relative h-full overflow-hidden border-white/10 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-black/70">
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              
              <CardContent className="relative flex h-full flex-col p-6 lg:p-8">
                {/* Step number */}
                <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/80 text-2xl font-bold text-white/20">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-6 inline-flex">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                    <step.icon className="h-6 w-6 text-white/80" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 pt-2">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/40">
                        <div className="h-1 w-1 rounded-full bg-white/40" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className="mt-6 flex justify-center md:hidden">
                    <ArrowRight className="h-5 w-5 rotate-90 text-white/20" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-white/40">
          Ready to get started? Scroll up and share your challenge with us.
        </p>
      </motion.div>
    </section>
  )
}