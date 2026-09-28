import { HeroSection } from '../components/home/HeroSection'
import { BenefitsSection } from '../components/home/BenefitsSection'
import { HowItWorksSection } from '../components/home/HowItWorksSection'
import { GallerySection } from '../components/home/GallerySection'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { FAQPreviewSection } from '../components/home/FAQPreviewSection'
import { CTASection } from '../components/home/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQPreviewSection />
      <CTASection />
    </>
  )
}
