'use client'

import { Navigation } from '@/components/dashboard/Navigation'
import { SearchSection } from '@/components/dashboard/SearchSection'
import { DashboardHero } from '@/components/dashboard/DashboardHero'
import { RecommendedJobs } from '@/components/dashboard/RecommendedJobs'
import { ActiveProjects } from '@/components/dashboard/ActiveProjects'
import { EarningsSection } from '@/components/dashboard/EarningsSection'
import { ProfileShowcase } from '@/components/dashboard/ProfileShowcase'
import { ClientReviews } from '@/components/dashboard/ClientReviews'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { FloatingChat } from '@/components/dashboard/FloatingChat'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#361F27] text-white">
      <Navigation />
      <main className="pt-20">
        <SearchSection />
        <DashboardHero />
        <RecommendedJobs />
        <ActiveProjects />
        <EarningsSection />
        <ProfileShowcase />
        <ClientReviews />
      </main>
      <DashboardFooter />
      <FloatingChat />
    </div>
  )
}
