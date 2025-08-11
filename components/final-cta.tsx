"use client"

import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowRight, Zap, Github, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function FinalCTA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <footer className="relative overflow-hidden pb-20 pt-24">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[1px] w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 [background:radial-gradient(circle_800px_at_50%_40%,rgba(255,255,255,0.08),transparent_80%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm"
        >
          {/* Shine effect */}
          <div 
            className="absolute -top-40 left-1/2 h-80 w-[120%] -translate-x-1/2 bg-gradient-to-b from-white/5 to-transparent rotate-12"
            style={{ 
              backgroundImage: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 100%)' 
            }}
          />
          
          <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-12 lg:p-16">
            {/* Left content */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm">
                    <Zap className="h-3.5 w-3.5 text-white/80" />
                    <span className="text-white/80">Get Started Now</span>
                  </div>
                  <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Ready for <span className="relative inline-block">
                      <span className="relative z-10">solutions</span>
                      <span className="absolute bottom-2 left-0 right-0 z-0 h-3 bg-white/10"></span>
                    </span>?
                  </h2>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-lg leading-relaxed text-white/70"
                >
                  Return to the form and describe your challenge. Our AI will analyze your situation and deliver a 
                  customized, actionable solution within seconds.
                </motion.p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Button 
                  onClick={scrollToTop}
                  className="group h-12 bg-white px-6 text-base font-medium text-black transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-white/10"
                >
                  <span className="mr-2">Get Your Solution</span>
                  <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
                </Button>
                
                {/* Gmail compose link */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=leotalkofficial@gmail.com&su=GetHelp%20Inquiry&body=Hi%20Livingstone%2C%0A%0AI%20would%20like%20to%20..."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline"
                    className="h-12 border-white/10 bg-white/5 px-6 text-base font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
                  >
                    <span className="mr-2">Contact Us</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </motion.div>
            </div>
            
            {/* Right side decorative element */}
            <div className="relative hidden md:flex md:items-center md:justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative h-64 w-64"
              >
                <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md" />
                <div className="absolute inset-4 rounded-full bg-white/5" />
                <div className="absolute inset-8 rounded-full bg-white/10" />
                <div className="absolute inset-16 flex items-center justify-center rounded-full bg-black">
                  <Zap className="h-12 w-12 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Acknowledgment & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex flex-col items-center justify-center space-y-4"
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="text-center">
            <p className="text-sm font-medium text-white/80">Livingstone Mazvovere</p>
            <p className="text-sm text-white/50">Software Developer & AI Generalist</p>
          </div>
          
          {/* Social links */}
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/PresidentLivingstone" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group rounded-full border border-white/10 bg-white/5 p-2 transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4 text-white/70 transition-colors group-hover:text-white" />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/livingstone-mazvovere-279811238/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group rounded-full border border-white/10 bg-white/5 p-2 transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4 text-white/70 transition-colors group-hover:text-white" />
            </Link>
            <Link 
              href="https://x.com/CeoMazvovere" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group rounded-full border border-white/10 bg-white/5 p-2 transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              aria-label="Twitter Profile"
            >
              <Twitter className="h-4 w-4 text-white/70 transition-colors group-hover:text-white" />
            </Link>
          </div>
          
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} • Built with Next.js & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
