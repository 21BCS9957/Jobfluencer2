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
  { label: 'Total Ad Spend', value: 185000, prefix: '₹', icon: LineChart, color: 'text-zinc-100' },
  { label: 'Active Campaigns', value: 4, icon: Megaphone, color: 'text-indigo-400' },
  { label: 'Influencers Engaged', value: 27, icon: Users, color: 'text-zinc-300' },
  { label: 'Avg. Engagement Rate', value: 18, prefix: '', icon: Target, color: 'text-zinc-300' },
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
    color: 'from-indigo-500 to-cyan-400',
  },
  {
    name: 'YouTube Reviews – Flagship Launch',
    objective: 'Consideration',
    platform: 'YouTube',
    budget: '₹1,20,000',
    spent: 72000,
    progress: 60,
    status: 'Live',
    color: 'from-zinc-100 to-zinc-400',
  },
  {
    name: 'UGC Content Bank – Always On',
    objective: 'Content',
    platform: 'Multi-platform',
    budget: '₹45,000',
    spent: 24000,
    progress: 52,
    status: 'In review',
    color: 'from-zinc-500 to-zinc-700',
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
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
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
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 font-medium mb-2">
                BRAND SIDE · CAMPAIGN CONTROL
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-3 text-white">
                Run creator campaigns<br className="hidden sm:block" /> like a performance marketer.
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
                Create briefs in minutes, pick the right influencers, and track performance –
                all in the same Job Fluencer workspace your creators already use.
              </p>
            </motion.div>
            <div className="relative flex-1 min-h-[260px] sm:min-h-[340px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-col shadow-2xl shadow-black/50">
              <HeroVideo />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
                aria-hidden
              />
              <div className="relative z-10 flex flex-1 min-h-0 flex-col justify-between pt-8 px-8 sm:pt-10 sm:px-10 pb-3 sm:pb-4">
                <div className="space-y-4 max-w-xl pt-2 sm:pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
                    QUICK ACTION
                  </p>
                  <p className="text-xl font-medium text-white">Create a new campaign</p>
                  <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
                    Start with a ready-made workflow – we auto-structure the brief, deliverables,
                    and payment milestones for you.
                  </p>
                </div>
                <div className="flex justify-start">
                  <AnimatedButton variant="primary" className="whitespace-nowrap bg-white text-black hover:bg-zinc-200">
                    <Plus className="w-4 h-4 mr-2 inline-block align-middle" />
                    <span className="align-middle font-medium">New campaign</span>
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
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
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-white">Active campaigns</h2>
              <p className="text-sm text-zinc-400">
                Live creator work, budgets, and pacing – in one glance.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 text-xs sm:text-sm px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] transition-colors text-white font-medium">
              <Filter className="w-4 h-4" />
              Filter & sort
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {activeCampaigns.map((campaign) => (
              <GlassCard key={campaign.name} className="h-full flex flex-col justify-between bg-black/40 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15] transition-colors">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        {campaign.platform}
                      </p>
                      <h3 className="text-sm sm:text-base font-medium mt-1 text-zinc-100">{campaign.name}</h3>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide border ${
                        campaign.status === 'Live'
                          ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400">{campaign.objective} · <span className="text-zinc-200">{campaign.budget}</span> budget</p>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5 font-medium">
                      <span>Budget used</span>
                      <span className="text-zinc-200">{campaign.progress}% · ₹{campaign.spent.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${campaign.color}`}
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-zinc-400 group cursor-pointer hover:text-white transition-colors">
                  <span>View deliverables & creators</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white group-hover:text-indigo-400 transition-colors">
                    Open board
                    <span className="inline-block w-4 h-4 rounded-full bg-white/[0.05] group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                      <span className="inline-block border-l border-t border-current w-1.5 h-1.5 rotate-135 translate-x-[-1px]" />
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
                <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-white">Start from a template</h2>
                <p className="text-sm text-zinc-400">
                  Use the same flows we run for brands on the home page.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {campaignTemplates.map((template) => (
                <GlassCard key={template.label} className="h-full flex flex-col justify-between bg-black/40 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15] transition-colors">
                  <div className="space-y-3">
                    <span className="inline-flex px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-medium tracking-wide uppercase text-zinc-300">
                      {template.badge}
                    </span>
                    <h3 className="text-sm sm:text-base font-medium text-white">{template.label}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{template.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {template.chips.map((chip) => (
                        <span
                          key={chip}
                          className="px-2 py-1 rounded-full bg-zinc-900 text-[10px] text-zinc-300 border border-white/[0.04]"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5">
                    <AnimatedButton variant="secondary" fullWidth className="bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.08]">
                      Use this flow
                    </AnimatedButton>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Influencer pipeline */}
          <GlassCard className="space-y-4 bg-black/40 backdrop-blur-xl border border-white/[0.08]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-medium text-white">Influencer pipeline</h2>
                <p className="text-xs text-zinc-400">
                  Where each creator sits across all live campaigns.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {pipeline.map((row) => (
                <div
                  key={row.creator}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-white/[0.04] px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-100 truncate">{row.creator}</p>
                    <p className="text-[11px] text-zinc-500">{row.platform}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] font-medium text-zinc-300">{row.fee}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-900 text-zinc-400 border border-white/[0.04]">
                      {row.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full text-xs text-center font-medium text-zinc-400 hover:text-white transition-colors mt-2">
              View full creator list &rarr;
            </button>
          </GlassCard>
        </section>
      </main>

      <DashboardFooter />
      <FloatingChat />
    </div>
  )
}

