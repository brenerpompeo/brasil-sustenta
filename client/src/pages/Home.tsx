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

export default function Home() {
  return (
    <div className="min-h-screen bg-paper font-body text-ink selection:bg-leaf selection:text-white">
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
