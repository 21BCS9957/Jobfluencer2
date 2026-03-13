'use client'

import { Navigation } from '@/components/dashboard/Navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { FloatingChat } from '@/components/dashboard/FloatingChat'
import { GlassCard } from '@/components/dashboard/GlassCard'
import { AnimatedButton } from '@/components/dashboard/AnimatedButton'
import { EnhancedStatCard } from '@/components/dashboard/EnhancedStatCard'
import { Megaphone, Target, Users, LineChart, Plus, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { HeroVideo } from '@/components/landing/HeroVideo'

const campaignStats = [
  { label: 'Total Ad Spend', value: 185000, prefix: '₹', icon: LineChart, color: 'from-emerald-400 to-teal-500' },
  { label: 'Active Campaigns', value: 4, icon: Megaphone, color: 'from-sky-400 to-indigo-500' },
  { label: 'Influencers Engaged', value: 27, icon: Users, color: 'from-fuchsia-400 to-rose-500' },
  { label: 'Avg. Engagement Rate', value: 18, prefix: '', icon: Target, color: 'from-amber-400 to-orange-500' },
]

const activeCampaigns = [
  {
    name: 'Summer Drop – Instagram Reels',
    objective: 'Awareness',
    platform: 'Instagram',
    budget: '₹80,000',
    spent: 54000,
    progress: 68,
    status: 'Live',
    color: 'from-[var(--brand-primary)] to-[var(--brand-secondary)]',
  },
  {
    name: 'YouTube Reviews – Flagship Launch',
    objective: 'Consideration',
    platform: 'YouTube',
    budget: '₹1,20,000',
    spent: 72000,
    progress: 60,
    status: 'Live',
    color: 'from-sky-500 to-cyan-400',
  },
  {
    name: 'UGC Content Bank – Always On',
    objective: 'Content',
    platform: 'Multi-platform',
    budget: '₹45,000',
    spent: 24000,
    progress: 52,
    status: 'In review',
    color: 'from-emerald-400 to-lime-400',
  },
]

const campaignTemplates = [
  {
    label: 'Instagram Reels Burst',
    description: 'Short, high-frequency reels with 5–15 creators to spike awareness.',
    badge: 'Best for launches',
    chips: ['Reels', '15–30 sec', 'Awareness'],
  },
  {
    label: 'YouTube Deep Dive',
    description: 'Long-form video reviews with 3–5 niche creators who actually convert.',
    badge: 'Performance focused',
    chips: ['YouTube', '8–12 min', 'Review'],
  },
  {
    label: 'Always-on UGC Pack',
    description: 'Monthly bank of raw creator content for your ads & socials.',
    badge: 'For performance teams',
    chips: ['UGC', 'Ad-ready', 'Retainer'],
  },
]

const pipeline = [
  { creator: 'Priya Sharma', platform: 'Instagram', stage: 'Negotiating', fee: '₹45,000' },
  { creator: 'Manav Tech', platform: 'YouTube', stage: 'Shortlisted', fee: '₹65,000' },
  { creator: 'FoodWithAnanya', platform: 'Instagram', stage: 'Contract sent', fee: '₹32,000' },
  { creator: 'FitWithKabir', platform: 'Instagram', stage: 'Live this week', fee: '₹55,000' },
]

export default function HirerDashboardPage() {
  return (
    <div className="min-h-screen bg-[#361F27] text-white">
      <Navigation />

      <main className="pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero + stats */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-pink-200/70 mb-2">
                BRAND SIDE · CAMPAIGN CONTROL
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3">
                Run creator campaigns<br className="hidden sm:block" /> like a performance marketer.
              </h1>
              <p className="text-sm sm:text-base text-pink-100/80 max-w-xl">
                Create briefs in minutes, pick the right influencers, and track performance –
                all in the same Job Fluencer workspace your creators already use.
              </p>
            </motion.div>
            <div className="relative flex-1 overflow-hidden rounded-xl border border-white/15 bg-black/40">
              <HeroVideo />
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#361F27]/92 via-[#361F27]/75 to-[#361F27]/92"
                aria-hidden
              />
              <div className="relative z-10 flex min-h-[260px] sm:min-h-[340px] flex-col justify-between gap-10 p-8 sm:p-10">
                <div className="space-y-4 max-w-xl pt-2 sm:pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-100/80">
                    QUICK ACTION
                  </p>
                  <p className="text-xl font-semibold">Create a new campaign</p>
                  <p className="text-sm text-pink-100/80 max-w-md leading-relaxed">
                    Start with a ready-made workflow – we auto-structure the brief, deliverables,
                    and payment milestones for you.
                  </p>
                </div>
                <div className="flex justify-start pb-2">
                  <AnimatedButton variant="primary" className="whitespace-nowrap">
                    <Plus className="w-4 h-4 mr-2 inline-block align-middle" />
                    <span className="align-middle">New campaign</span>
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-100/80">
              OVERVIEW
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {campaignStats.map((stat, index) => (
                <EnhancedStatCard key={stat.label} {...stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Active campaigns */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">Active campaigns</h2>
              <p className="text-sm text-pink-100/80">
                Live creator work, budgets, and pacing – in one glance.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors">
              <Filter className="w-4 h-4" />
              Filter & sort
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {activeCampaigns.map((campaign) => (
              <GlassCard key={campaign.name} className="h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-100/80">
                        {campaign.platform}
                      </p>
                      <h3 className="text-sm sm:text-base font-semibold mt-1">{campaign.name}</h3>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-semibold tracking-wide ${
                        campaign.status === 'Live'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>

                  <p className="text-xs text-pink-100/80">{campaign.objective} · {campaign.budget} budget</p>

                  {/* Progress bar */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[11px] text-pink-100/80 mb-1">
                      <span>Budget used</span>
                      <span>{campaign.progress}% · ₹{campaign.spent.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#2c1220] overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${campaign.color}`}
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-pink-100/80">
                  <span>View deliverables & creators</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-100">
                    Open board
                    <span className="inline-block w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="inline-block border-l border-t border-current w-2 h-2 rotate-45 translate-x-[1px]" />
                    </span>
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Templates + pipeline */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">Start from a template</h2>
                <p className="text-sm text-pink-100/80">
                  Use the same flows we run for brands on the home page.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {campaignTemplates.map((template) => (
                <GlassCard key={template.label} className="h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="inline-flex px-2 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-semibold tracking-wide uppercase text-pink-100">
                      {template.badge}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold">{template.label}</h3>
                    <p className="text-xs text-pink-100/80">{template.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {template.chips.map((chip) => (
                        <span
                          key={chip}
                          className="px-2 py-1 rounded-full bg-[#2c1220] text-[10px] text-pink-100/90 border border-white/5"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <AnimatedButton variant="secondary" fullWidth>
                      Use this flow
                    </AnimatedButton>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Influencer pipeline */}
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-semibold">Influencer pipeline</h2>
                <p className="text-xs text-pink-100/80">
                  Where each creator sits across all live campaigns.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {pipeline.map((row) => (
                <div
                  key={row.creator}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{row.creator}</p>
                    <p className="text-[11px] text-pink-100/80">{row.platform}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] font-semibold text-pink-100">{row.fee}</span>
                    <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-[#2c1220] text-pink-100/90 border border-white/10">
                      {row.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full text-xs text-center text-pink-100/80 hover:text-white transition-colors mt-1">
              View full creator list
            </button>
          </GlassCard>
        </section>
      </main>

      <DashboardFooter />
      <FloatingChat />
    </div>
  )
}

