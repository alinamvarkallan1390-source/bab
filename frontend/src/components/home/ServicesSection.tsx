'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { servicesData } from '@/data/company';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding" style={{ background: '#0F0F0F' }} dir="rtl">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="section-label">خدمات ما</div>
          <h2 className="section-title-custom">
            خدمات <span className="gold-text">حرفه‌ای</span> ساختمانی
          </h2>
          <p className="section-desc">
            از طراحی تا اجرا، همه خدمات مورد نیاز شما برای خلق فضایی لوکس و منحصر به فرد
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group"
            >
              <div className="card-premium p-8 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-[#D4A843]/10 group-hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4A843] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2.5 mb-6">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-white/30">
                      <span className="w-1 h-1 rounded-full bg-[#D4A843]" />
                      {f}
                    </div>
                  ))}
                </div>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#D4A843] group/link"
                >
                  <span>جزئیات بیشتر</span>
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
