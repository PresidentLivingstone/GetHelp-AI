"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Check, Shield, Zap } from "lucide-react"

function Band({
  reverse = false,
  title,
  text,
  bullets,
  imageSrc,
  imageAlt,
}: {
  reverse?: boolean
  title: string
  text: string
  bullets: { icon: any; text: string }[]
  imageSrc: string
  imageAlt: string
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div
        className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-xl border border-white/10"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-xl object-cover grayscale"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(255,255,255,0.08),transparent_70%)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="space-y-5"
        >
          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="max-w-prose text-white/70">{text}</p>
          <ul className="mt-4 grid gap-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                <b.icon className="mt-0.5 h-4 w-4 text-white/70" />
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default function FeatureBands() {
  return (
    <div className="py-6">
      <Band
        title="Built for clarity and speed"
        text="Thoughtful defaults, minimal ceremony, and a straight path to answers."
        bullets={[
          { icon: Zap, text: "Instant submission to our secure agent via webhook" },
          { icon: Check, text: "Plain‑text responses optimized for readability" },
          { icon: Shield, text: "Server‑side processing—no secrets exposed in the browser" },
        ]}
        imageSrc="/grayscale-architecture.png"
        imageAlt="Minimalist desk scene in grayscale"
      />
      <Band
        reverse
        title="Opinionated, but calm"
        text="A black‑and‑white system with subtle motion so your content takes center stage."
        bullets={[
          { icon: Check, text: "Grayscale visuals that won’t distract" },
          { icon: Zap, text: "Gentle on‑scroll reveals and hover affordances" },
          { icon: Shield, text: "Accessible, semantic, and keyboard‑friendly" },
        ]}
        imageSrc="/grayscale-desk.png"
        imageAlt="Abstract brutalist architecture in grayscale"
      />
    </div>
  )
}
