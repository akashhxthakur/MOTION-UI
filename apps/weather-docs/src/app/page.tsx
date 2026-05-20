import { Hero } from '@/components/sections/Hero';
import { FeatureBento } from '@/components/sections/FeatureBento';
import { InteractiveDemo } from '@/components/sections/InteractiveDemo';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { CodeWalkthrough } from '@/components/sections/CodeWalkthrough';
import { MobilePatterns } from '@/components/sections/MobilePatterns';
import { ComponentShowcase } from '@/components/sections/ComponentShowcase';
import { StatsBanner } from '@/components/sections/StatsBanner';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureBento />
      <InteractiveDemo />
      <MobilePatterns />
      <HowItWorks />
      <CodeWalkthrough />
      <ComponentShowcase />
      <StatsBanner />
      <CTASection />
    </>
  );
}
