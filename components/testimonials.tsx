"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Star, Quote, ArrowRight, MessageSquare, CheckCircle } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Amira C.",
    role: "Staff Engineer, Fintech",
    avatar: "/user1.jpg", 
    quote: "The response quality felt like pairing with a principal engineer. Direct, actionable, zero fluff.",
    category: "Technical Support",
    rating: 5,
    outcome: "Resolved critical API integration issue in hours instead of days",
  },
  {
    name: "Lucas T.",
    role: "Head of Design, Enterprise SaaS",
    avatar: "/user2.jpg",
    quote: "This is senior design energy—clarity, constraints, and a path forward. The black-and-white tone is exactly right.",
    category: "Work Related",
    rating: 5,
    outcome: "Streamlined design system implementation across 4 product teams",
  },
  {
    name: "Priya N.",
    role: "CTO, HealthTech",
    avatar: "/user3.jpg",
    quote: "We shipped the fix in 30 minutes. The answer addressed edge cases we hadn't even considered.",
    category: "Technical Support",
    rating: 5,
    outcome: "Fixed critical production bug affecting patient data security",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-white text-white" : "fill-transparent text-white/20"
          }`}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-black">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/3 w-[500px] h-[500px] bg-white/3 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center sm:text-left"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-4 py-1.5 text-sm">
          <MessageSquare className="h-3.5 w-3.5 text-white" />
          <span className="text-white">Real User Experiences</span>
        </div>
        
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          From Our Users
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/60">
          See how professionals across industries use our AI assistant to solve complex problems with 
          speed and precision.
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="group h-full"
          >
            <Card className="relative h-full overflow-hidden border-white/10 bg-black/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-black/50">
              {/* Corner quote decoration */}
              <div className="absolute -right-3 -top-3 -rotate-12 text-4xl font-serif text-white/10 select-none">
                "
              </div>
              
              <CardContent className="flex h-full flex-col p-6 lg:p-7">
                {/* Category pill */}
                <div className="mb-4">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-black/80 px-2.5 py-1 text-xs text-white">
                    {testimonial.category}
                  </div>
                </div>
                
                {/* Quote */}
                <div className="relative mb-6 flex-1">
                  <Quote className="absolute -left-1 -top-1 h-4 w-4 text-white/20" />
                  <blockquote className="pl-2 text-base leading-relaxed text-white">
                    {testimonial.quote}
                  </blockquote>
                </div>
                
                {/* Outcome */}
                <div className="mb-4 flex items-start gap-2 rounded-lg border border-white/10 bg-black/70 p-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-white/80" />
                  <p className="text-xs text-white/90">
                    {testimonial.outcome}
                  </p>
                </div>

                {/* Person details */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-white/20">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-black text-white">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{testimonial.name}</p>
                      <p className="text-xs text-white/70">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <StarRating rating={testimonial.rating} />
                </div>
                
                {/* Hover decoration */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-white/40 to-white/10 transition-all duration-300 group-hover:w-full" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View more link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 flex justify-center"
      >
        <a href="#" className="group inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-white/80">
          See more success stories
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </section>
  )
}