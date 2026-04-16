import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PortalsSection from '@/components/PortalsSection';
import SocialProofSection from '@/components/SocialProofSection';
import RegionalMap from '@/components/RegionalMap';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

import { SEO } from '@/components/SEO';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <SEO
        title="Brasil Sustenta — Squads universitários para desafios ESG com matching por IA"
        description="Conecte empresas, universidades e talentos em uma plataforma AI-first para transformar desafios ESG em squads, entregas auditáveis e impacto mensurável."
      />
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <PortalsSection />
      <SocialProofSection />
      <RegionalMap />
      <CTASection />
      <Footer />
    </div>
  );
}
