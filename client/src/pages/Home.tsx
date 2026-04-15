import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import TalentsSection from '@/components/TalentsSection';
import SquadsSection from '@/components/SquadsSection';
import ImpactModelSection from '@/components/ImpactModelSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import UniversityPartnersSection from '@/components/UniversityPartnersSection';
import StatsSection from '@/components/StatsSection';
import RegionalMap from '@/components/RegionalMap';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ODSSection from '@/components/ODSSection';

import { SEO } from '@/components/SEO';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <SEO 
        title="Brasil Sustenta - Squads universitarios para desafios ESG com matching por IA"
        description="Conecte empresas, universidades e talentos em uma plataforma AI-first para transformar desafios ESG em squads, entregas auditaveis e impacto mensuravel."
      />
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <TalentsSection />
      <SquadsSection />
      <ImpactModelSection />
      <ODSSection />
      <TestimonialsSection />
      <UniversityPartnersSection />
      <StatsSection />
      <RegionalMap />
      <FAQSection />
      <CTASection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
