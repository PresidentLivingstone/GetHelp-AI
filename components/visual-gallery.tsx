"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Brain, Users, Lightbulb, Target, Shield, Zap } from "lucide-react"

const SHOWCASE_ITEMS = [
  { 
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced algorithms understand context and nuance",
    gradient: "from-white/10 via-white/5 to-transparent"
  },
  { 
    icon: Users,
    title: "Personal Support",
    description: "Tailored solutions for your unique situation",
    gradient: "from-white/10 via-white/5 to-transparent"
  },
  { 
    icon: Lightbulb,
    title: "Instant Solutions",
    description: "Get actionable advice in seconds, not hours",
    gradient: "from-white/10 via-white/5 to-transparent"
  },
  { 
    icon: Target,
    title: "Precision Matching",
    description: "Category-specific responses for better results",
    gradient: "from-white/10 via-white/5 to-transparent"
  },
  { 
    icon: Shield,
    title: "Private & Secure",
    description: "Your data is processed safely and confidentially",
    gradient: "from-white/10 via-white/5 to-transparent"
  },
  { 
    icon: Zap,
    title: "Always Available",
    description: "24/7 assistance whenever you need help",
    gradient: "from-white/10 via-white/5 to-transparent"
  },
]

// Example scenarios that could be represented visually
const HELP_SCENARIOS = [
  {
    category: "Academic",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    alt: "Students collaborating on academic work"
  },
  {
    category: "Career",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    alt: "Professional workspace and career planning"
  },
  {
    category: "Personal",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
    alt: "Person reflecting on personal growth"
  }
]

export default function VisualGallery() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/3 blur-3xl rounded-full" />
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
          <Zap className="h-3.5 w-3.5" />
          <span className="text-white/80">Why Choose Our AI Assistant</span>
        </div>
        
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Built for Real Solutions
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
          Our AI doesn't just understand problems—it delivers personalized, actionable solutions 
          that make a real difference in your life.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SHOWCASE_ITEMS.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="group relative"
          >
            <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-black/70">
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              
              {/* Content */}
              <div className="relative p-6 lg:p-8">
                {/* Icon */}
                <div className="mb-4 inline-flex">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                    <item.icon className="h-6 w-6 text-white/80" />
                  </div>
                </div>

                {/* Text */}
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>

                {/* Decorative element */}
                <div className="absolute -bottom-2 -right-2 h-20 w-20 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:bg-white/10" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Use Cases Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-24"
      >
        <h3 className="mb-8 text-center text-2xl font-semibold text-white">
          Helping You Across All Areas of Life
        </h3>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {HELP_SCENARIOS.map((scenario, index) => (
            <motion.div
              key={scenario.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/50"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={scenario.image}
                  alt={scenario.alt}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-[50%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-lg font-semibold text-white">{scenario.category} Support</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-white/40">
          Join thousands who've found clarity and solutions through our AI assistant
        </p>
      </motion.div>
    </section>
  )
}