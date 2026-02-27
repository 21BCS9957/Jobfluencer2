'use client'

import { ShieldCheck, Target, Zap, CheckCircle, type LucideIcon } from 'lucide-react'

const BADGES = [
  'Verified Influencer Network',
  'Campaign-Ready Creators',
  'Agency-Grade Matching',
  'Performance-Based Selection',
  'Niche Audience Targeting',
  'Fast Creator Discovery',
  'Pre-Vetted Talent Pool',
  'Brand-Safe Collaborations',
  '48hr Campaign Kickoff',
  'Multi-Industry Creators',
  'Geo-Targeted Influencers',
  'UGC & Ad Specialists',
  'End-to-End Campaign Fit',
  'Scalable Creator Hiring',
  'ROI-Focused Partnerships',
  'Trusted by Growth Teams',
  'Built for Performance Marketing',
] as const

const ICONS: LucideIcon[] = [ShieldCheck, Target, Zap, CheckCircle]

function Badge({ text, iconIndex }: { text: string; iconIndex: number }) {
  const Icon = ICONS[iconIndex % ICONS.length]
  return (
    <span
      className="trust-marquee-badge flex items-center gap-2 flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium text-[var(--brand-text)]"
      style={{
        background: 'rgba(234, 242, 239, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(82, 31, 69, 0.2)',
      }}
    >
      <Icon className="w-4 h-4 shrink-0 text-[var(--brand-primary)]" aria-hidden />
      <span>{text}</span>
    </span>
  )
}

function BadgeList() {
  return (
    <div className="flex items-center gap-6 flex-shrink-0 pr-6">
      {BADGES.map((text, i) => (
        <Badge key={`${text}-${i}`} text={text} iconIndex={i} />
      ))}
    </div>
  )
}

export function TrustMarquee() {
  return (
    <section
      className="w-full overflow-hidden border-t border-[rgba(82,31,69,0.15)]"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, var(--brand-bg-base) 100%)',
      }}
      aria-label="Platform trust highlights"
    >
      <div className="py-6 sm:py-8">
        <div className="overflow-hidden">
          <div className="trust-marquee-track flex w-max will-change-transform">
            <BadgeList />
            <BadgeList />
          </div>
        </div>
      </div>
    </section>
  )
}
