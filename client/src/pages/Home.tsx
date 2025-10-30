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
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <TalentsSection />
      <SquadsSection />
      <ImpactModelSection />
      <TestimonialsSection />
      <UniversityPartnersSection />
      <StatsSection />
      <FAQSection />
      <CTASection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
