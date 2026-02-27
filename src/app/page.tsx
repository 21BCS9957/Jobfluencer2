import { HeroSection } from '@/components/landing/HeroSection'
import { TrustMarquee } from '@/components/landing/TrustMarquee'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { LayeredTextSection } from '@/components/landing/LayeredTextSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustMarquee />
      <HowItWorksSection />
      <LayeredTextSection />
    </>
  )
}
