import { BrandLogo } from "@/components/brand-logo"
import HeroForm from "@/components/hero-form"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import PastExperiences from "@/components/past-experiences"
import VisualGallery from "@/components/visual-gallery"
import FeatureBands from "@/components/feature-bands"
import FAQ from "@/components/faq"
import FinalCTA from "@/components/final-cta"

export default async function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <BrandLogo />
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">
              How it works
            </a>
            <a href="#gallery" className="text-sm text-white/70 hover:text-white transition-colors">
              Gallery
            </a>
            <a href="#testimonials" className="text-sm text-white/70 hover:text-white transition-colors">
              Testimonials
            </a>
            <a href="#experiences" className="text-sm text-white/70 hover:text-white transition-colors">
              Past experiences
            </a>
            <a href="#faq" className="text-sm text-white/70 hover:text-white transition-colors">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background:radial-gradient(1000px_600px_at_50%_-20%,rgb(255_255_255/8%),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_rgba(0,0,0,0.6))]"
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-24 md:grid-cols-2 md:py-28">
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              Elite-grade assistance, without the meetings
            </div>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl filter drop-shadow-[0_0_35px_rgba(255,255,255,0.18)]">
              Get
              <span className="block">Solutions</span>
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-white/70">
              Submit your problem. Get intelligent solutions instantly.
            </p>
            <div className="mt-10 md:hidden">
              <HeroForm />
            </div>
          </div>

          <div className="relative hidden md:block">
            <HeroForm />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-t border-white/10">
        <HowItWorks />
      </section>

      <section id="gallery" className="border-t border-white/10">
        <VisualGallery />
      </section>

      <section id="features" className="border-t border-white/10">
        <FeatureBands />
      </section>

      <section id="testimonials" className="border-t border-white/10">
        <Testimonials />
      </section>

      <section id="experiences" className="border-t border-white/10">
        <PastExperiences />
      </section>

      <section id="faq" className="border-t border-white/10">
        <FAQ />
      </section>

      <section id="cta" className="border-t border-white/10">
        <FinalCTA />
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-white/50 md:flex-row">
          <div className="flex items-center gap-3">
            <BrandLogo compact />
            <span className="hidden md:inline">
              {"\u00A9"} {new Date().getFullYear()} GetHelp
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="hover:text-white/80">
              Process
            </a>
            <a href="#gallery" className="hover:text-white/80">
              Visuals
            </a>
            <a href="#sources" className="hover:text-white/80">
              Sources
            </a>
            <a href="#experiences" className="hover:text-white/80">
              Latest
            </a>
            <a href="#top" className="hover:text-white/80">
              Back to form
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
