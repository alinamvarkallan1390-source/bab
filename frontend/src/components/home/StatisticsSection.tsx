'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { companyInfo } from '@/data/company';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const duration = 2000;
      const startTime = Date.now();
      
      const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        setCount(current);
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(update);
    }
  }, [isInView, target, hasAnimated]);

  return <span ref={ref} className="text-5xl md:text-6xl font-black text-white">{count}{suffix}</span>;
}

const stats = [
  { icon: '🏗️', value: companyInfo.stats.yearsExperience, suffix: '+', label: 'سال تجربه' },
  { icon: '✅', value: companyInfo.stats.completedProjects, suffix: '+', label: 'پروژه تکمیل شده' },
  { icon: '❤️', value: companyInfo.stats.happyClients, suffix: '+', label: 'مشتری راضی' },
  { icon: '📍', value: companyInfo.stats.citiesServed, suffix: '+', label: 'شهر تحت پوشش' },
];

export default function StatisticsSection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#0A0A0F' }}>
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 blueprint-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45C]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45C]/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative group"
            >
              <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.04] hover:border-[#C8A45C]/20 transition-all duration-500">
                <div className="text-3xl mb-6">
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    className="inline-block"
                  >
                    {stat.icon}
                  </motion.span>
                </div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="w-8 h-[2px] bg-gradient-to-r from-[#C8A45C] to-transparent mx-auto my-4" />
                <p className="text-white/40 text-sm font-medium tracking-wide">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
