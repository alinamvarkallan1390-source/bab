'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiBuildingOffice2, HiCheckBadge, HiHeart, HiMapPin } from 'react-icons/hi2';
import { companyInfo } from '@/data/company';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-white">
      {prefix}{count}{suffix}
    </span>
  );
}

const stats = [
  { icon: HiBuildingOffice2, value: companyInfo.stats.yearsExperience, suffix: '+', label: 'سال تجربه' },
  { icon: HiCheckBadge, value: companyInfo.stats.completedProjects, suffix: '+', label: 'پروژه تکمیل شده' },
  { icon: HiHeart, value: companyInfo.stats.happyClients, suffix: '+', label: 'مشتری راضی' },
  { icon: HiMapPin, value: companyInfo.stats.citiesServed, suffix: '+', label: 'شهر تحت پوشش' },
];

export default function StatisticsSection() {
  return (
    <section className="relative py-20 bg-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, #F5A623 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group hover:bg-primary/5 hover:border-primary/30 transition-all"
              >
                <div className="text-primary text-3xl mb-4 flex justify-center">
                  <Icon className="group-hover:scale-110 transition-transform" />
                </div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-gray-400 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
