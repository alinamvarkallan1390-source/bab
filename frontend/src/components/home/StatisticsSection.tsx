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
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="text-center p-8 rounded-2xl border border-white/[0.04] bg-white/[0.02] hover:border-gold/20 hover:bg-gold/[0.02] transition-all duration-500 group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-500">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black text-white mb-1">
                  <CountUp target={stat.value} isInView={isInView} />
                  <span className="text-gold">{stat.suffix}</span>
                </div>
                <div className="w-6 h-[1px] bg-gold/40 mx-auto my-3" />
                <p className="text-white/30 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
