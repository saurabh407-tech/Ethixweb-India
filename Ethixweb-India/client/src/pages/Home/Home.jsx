import React, { useEffect } from 'react';
import Hero from '../../components/home/Hero';
import ServicesOverview from '../../components/home/ServicesOverview';
import ProcessSection from '../../components/home/ProcessSection';
import FeaturedWork from '../../components/home/FeaturedWork';
import WhyEthixweb from '../../components/home/WhyEthixweb';
import FinalCTA from '../../components/home/FinalCTA';

export default function Home() {
  useEffect(() => {
    document.title = 'Ethixweb India | Digital Operations, Web Platforms & Automation';
  }, []);

  return (
    <div className="bg-charcoal-950 text-white">
      {/* Hero Section */}
      <Hero />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Engineering Process & Workflow */}
      <ProcessSection />

      {/* Featured Architecture Blueprints & Concepts */}
      <FeaturedWork />

      {/* Why Choose Ethixweb */}
      <WhyEthixweb />

      {/* Final Actionable CTA Banner */}
      <FinalCTA />
    </div>
  );
}
