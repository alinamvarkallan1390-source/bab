'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import StatisticsSection from '@/components/home/StatisticsSection';
import ServicesSection from '@/components/home/ServicesSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import ContactCTA from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactCTA />
    </main>
  );
}
