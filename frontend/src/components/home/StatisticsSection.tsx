'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { companyInfo } from '@/data/company';
import CountUp from './CountUp';

const stats = [
  { icon: '🏗️', value: companyInfo.stats.yearsExperience, suffix: '+', label: 'سال تجربه' },
  { icon: '✅', value: companyInfo.stats.completedProjects, suffix: '+', label: 'پروژه موفق' },
  { icon: '❤️', value: companyInfo.stats.happyClients, suffix: '+', label: 'مشتری راضی' },
  { icon: '📍', value: companyInfo.stats.citiesServed, suffix: '+', label: 'شهر تحت پوشش' },
];

export default function StatisticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: '#0B0B0B' }}>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A843]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A843]/20 to-transparent" />

      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-[#D4A843]/20 transition-all duration-500 text-center">
                <div className="text-3xl mb-5">
                  <span className="inline-block group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </span>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  <CountUp target={stat.value} isInView={isInView} />
                  <span className="text-[#D4A843]">{stat.suffix}</span>
                </div>
                <div className="w-6 h-[2px] bg-[#D4A843]/50 mx-auto my-3" />
                <p className="text-white/30 text-sm font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
