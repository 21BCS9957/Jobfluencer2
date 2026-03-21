'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/dashboard/Navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { FloatingChat } from '@/components/dashboard/FloatingChat'
import { GlassCard } from '@/components/dashboard/GlassCard'
import { AnimatedButton } from '@/components/dashboard/AnimatedButton'
import { EnhancedStatCard } from '@/components/dashboard/EnhancedStatCard'
import { Megaphone, Target, Users, LineChart, Plus, Loader2, Sparkles, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { getClientDashboardData } from '@/actions/dashboard.actions'

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

export default function ClientDashboardPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [clientData, setClientData] = useState<any>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!loading && profile?.bio) {
      try {
        const bioData = JSON.parse(profile.bio)
        setClientData(bioData)
      } catch {
        setClientData({ description: profile.bio })
      }
    }
  }, [profile, loading])

  useEffect(() => {
    async function fetchDashboardData() {
      if (!loading && user) {
        setDataLoading(true)
        const result = await getClientDashboardData()
        if (result.data) {
          setDashboardData(result.data)
        }
        setDataLoading(false)
      }
    }
    fetchDashboardData()
  }, [user, loading])

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-[#361F27] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  const fullName = profile?.full_name || 'User'
  const companyName = clientData?.company_name || 'Your Company'
  const industry = clientData?.industry

  const stats = dashboardData?.stats || {
    totalSpent: 0,
    activeProjectsCount: 0,
    providersEngaged: 0,
    totalProjects: 0,
  }

  const campaignStats = [
    { label: 'Total Ad Spend', value: stats.totalSpent, prefix: '₹', icon: LineChart, color: 'from-emerald-400 to-teal-500' },
    { label: 'Active Campaigns', value: stats.activeProjectsCount, icon: Megaphone, color: 'from-sky-400 to-indigo-500' },
    { label: 'Influencers Engaged', value: stats.providersEngaged, icon: Users, color: 'from-fuchsia-400 to-rose-500' },
    { label: 'Total Projects', value: stats.totalProjects, icon: Target, color: 'from-amber-400 to-orange-500' },
  ]

  const activeProjects = dashboardData?.activeProjects || []
  const activeBookings = dashboardData?.activeBookings || []
  const hasActiveCampaigns = activeProjects.length > 0

  return (
    <div className="min-h-screen bg-[#361F27] text-white">
      <Navigation />

      <main className="pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero + stats */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-pink-200/70 mb-2">
                BRAND SIDE · CAMPAIGN CONTROL
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3">
                Welcome back, {fullName}!
              </h1>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg font-semibold">{companyName}</span>
                {industry && (
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
                    {industry}
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-pink-100/80 max-w-xl">
                Create briefs in minutes, pick the right influencers, and track performance –
                all in the same Job Fluencer workspace your creators already use.
              </p>
            </motion.div>

            <GlassCard className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-100/80 mb-1">
                  QUICK ACTION
                </p>
                <p className="text-lg font-semibold mb-2">
                  {hasActiveCampaigns ? 'Create another campaign' : 'Create your first campaign'}
                </p>
                <p className="text-sm text-pink-100/80 max-w-md">
                  Start with a ready-made workflow – we auto-structure the brief, deliverables,
                  and payment milestones for you.
                </p>
              </div>
              <AnimatedButton 
                variant="primary" 
                className="whitespace-nowrap"
                onClick={() => router.push('/client/post-project')}
              >
                <Plus className="w-4 h-4 mr-2 inline-block align-middle" />
                <span className="align-middle">Post Campaign</span>
              </AnimatedButton>
            </GlassCard>
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
                {hasActiveCampaigns 
                  ? 'Live creator work, budgets, and pacing – in one glance.'
                  : 'No active campaigns yet. Create your first one to get started!'}
              </p>
            </div>
          </div>

          {hasActiveCampaigns ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {activeProjects.map((project: any) => {
                const projectBookings = activeBookings.filter((b: any) => b.project_id === project.id)
                const totalBudget = project.budget_max || project.budget_min || 0
                const spent = projectBookings.reduce((sum: number, b: any) => 
                  sum + (parseFloat(b.total_amount?.toString() || '0')), 0
                )
                const progress = totalBudget > 0 ? Math.round((spent / totalBudget) * 100) : 0

                return (
                  <GlassCard key={project.id} className="h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-100/80">
                            {project.category.replace('_', ' ')}
                          </p>
                          <h3 className="text-sm sm:text-base font-semibold mt-1">{project.title}</h3>
                        </div>
                        <span className="px-2 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                          {project.status}
                        </span>
                      </div>

                      <p className="text-xs text-pink-100/80">
                        {project.location || 'Remote'} · ₹{totalBudget.toLocaleString()} budget
                      </p>

                      {totalBudget > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-[11px] text-pink-100/80 mb-1">
                            <span>Budget used</span>
                            <span>{progress}% · ₹{spent.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-[#2c1220] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-orange-600 to-pink-500"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <AnimatedButton 
                        variant="secondary" 
                        fullWidth
                        onClick={() => router.push(`/client/my-projects`)}
                      >
                        View Details
                      </AnimatedButton>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          ) : (
            <GlassCard className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-pink-200/60" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">No active campaigns yet</h3>
                  <p className="text-sm text-pink-100/80 max-w-md mx-auto mb-6">
                    Get started by creating your first campaign. We'll help you find the perfect creators
                    and manage everything from brief to delivery.
                  </p>
                  <AnimatedButton 
                    variant="primary"
                    onClick={() => router.push('/client/post-project')}
                  >
                    <Plus className="w-4 h-4 mr-2 inline-block align-middle" />
                    <span className="align-middle">Create First Campaign</span>
                  </AnimatedButton>
                </div>
              </div>
            </GlassCard>
          )}
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
                    <AnimatedButton 
                      variant="secondary" 
                      fullWidth
                      onClick={() => router.push('/client/post-project')}
                    >
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
                  Active collaborations across all campaigns.
                </p>
              </div>
            </div>

            {activeBookings.length > 0 ? (
              <div className="space-y-3">
                {activeBookings.slice(0, 4).map((booking: any) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2.5"
                  >
                    <div className="min-w-0 flex items-center gap-2">
                      {booking.provider?.avatar_url && (
                        <img 
                          src={booking.provider.avatar_url} 
                          alt={booking.provider.full_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="text-sm font-semibold truncate">
                          {booking.provider?.full_name || 'Provider'}
                        </p>
                        <p className="text-[11px] text-pink-100/80">
                          {booking.project?.title || 'Project'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-semibold text-pink-100">
                        ₹{parseFloat(booking.total_amount || '0').toLocaleString()}
                      </span>
                      <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-[#2c1220] text-pink-100/90 border border-white/10">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
                {activeBookings.length > 4 && (
                  <button 
                    onClick={() => router.push('/client/bookings')}
                    className="w-full text-xs text-center text-pink-100/80 hover:text-white transition-colors mt-1"
                  >
                    View all {activeBookings.length} collaborations
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-pink-200/60" />
                </div>
                <p className="text-sm text-pink-100/80">
                  No active collaborations yet
                </p>
              </div>
            )}
          </GlassCard>
        </section>
      </main>

      <DashboardFooter />
      <FloatingChat />
    </div>
  )
}
