import React, { useEffect } from 'react';
import Hero from '../../components/home/Hero';
import ServicesOverview from '../../components/home/ServicesOverview';
import ProcessSection from '../../components/home/ProcessSection';
import FeaturedWork from '../../components/home/FeaturedWork';
import FinalCTA from '../../components/home/FinalCTA';

export default function Home() {
  useEffect(() => {
    document.title = 'Ethixweb India | Digital Operations, Web Platforms & Automation';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-charcoal-950 text-white min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Engineering Process & Working Standard */}
      <ProcessSection />

      {/* Featured Concept Architectures */}
      <FeaturedWork />

      {/* Final Actionable CTA Banner */}
      <FinalCTA />
    </div>
  );
}
