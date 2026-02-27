'use client'

import Link from 'next/link'
import { UserPlus, FileEdit, Handshake, Briefcase } from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { HeroVideo } from '@/components/landing/HeroVideo'
import { HeroSearchShowcase } from '@/components/landing/HeroSearchShowcase'

const WORKFLOW_STEPS = [
  {
    icon: UserPlus,
    title: 'Sign Up',
    description: 'Create your free account in seconds',
  },
  {
    icon: FileEdit,
    title: 'Create Profile',
    description: 'Showcase your skills and portfolio',
  },
  {
    icon: Handshake,
    title: 'Get Matched',
    description: 'Connect with brands that need you',
  },
  {
    icon: Briefcase,
    title: 'Work',
    description: 'Deliver projects and get paid',
  },
] as const

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col bg-black">
      {/* Background: video at z-0, overlay at z-[1] (left-to-right gradient for readability) */}
      <HeroVideo />
      <div
        className="hero-video-overlay absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
      />

      {/* Foreground */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="pt-4 px-4 sm:px-6">
          <Navbar variant="floating" />
        </div>

        <div className="flex-1 flex flex-col items-start justify-center px-6 sm:px-10 md:px-14 lg:px-20 pb-8 pt-4">
          {/* Hero content – no glass box, direct on background */}
          <div className="w-full max-w-3xl flex flex-col items-start gap-8 sm:gap-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white text-left">
              Connect brands with{' '}
              <span className="text-[var(--hero-accent)]">creative talent</span>
            </h1>
            <p
              className="text-[#d1d1d1] text-lg sm:text-xl max-w-[520px] text-left leading-relaxed"
              style={{ maxWidth: '520px' }}
            >
              Find the best photographers, videographers, and content creators for your next campaign. One platform, endless possibilities.
            </p>

            {/* Decorative search showcase – not functional, visual only */}
            <HeroSearchShowcase />

            {/* CTAs – clear hierarchy, subtle hover */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/auth/register"
                className="brand-gradient inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent hover:shadow-[0_0_32px_rgba(145,47,86,0.45)]"
                style={{
                  boxShadow: '0 0 24px rgba(145, 47, 86, 0.35)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 32px rgba(145, 47, 86, 0.45)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(145, 47, 86, 0.35)'
                }}
              >
                Get Started
              </Link>
              <Link
                href="/browse"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white border-2 border-white/30 bg-white/5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:bg-white/10 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Browse Talent
              </Link>
            </div>
          </div>

          {/* Workflow card – glass only here and in navbar */}
          <div className="glass-workflow w-full max-w-4xl mt-12 sm:mt-16 p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WORKFLOW_STEPS.map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex flex-col gap-2"
                >
                  <step.icon className="w-8 h-8 text-[var(--hero-accent)] shrink-0" aria-hidden />
                  <h3 className="font-semibold text-white text-sm sm:text-base">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-snug">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
