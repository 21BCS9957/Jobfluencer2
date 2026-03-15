import { HeroSection } from '@/components/landing/HeroSection'
import { TrustMarquee } from '@/components/landing/TrustMarquee'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { ExploreCreatorsSection } from '@/components/landing/ExploreCreatorsSection'
import { WorkflowSection } from '@/components/landing/WorkflowSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { LayeredTextSection } from '@/components/landing/LayeredTextSection'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustMarquee />
      <HowItWorksSection />
      <ExploreCreatorsSection />
      <WorkflowSection />
      <TestimonialsSection />
      <LayeredTextSection />
      <DashboardFooter />
    </>
  )
}
