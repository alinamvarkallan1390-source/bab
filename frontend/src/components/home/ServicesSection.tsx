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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-16">
          <div className="section-tag">خدمات</div>
          <h2 className="section-title">خدمات <span className="text-gold-gradient">تخصصی</span></h2>
          <p className="section-desc">از طراحی تا اجرا، همه خدمات مورد نیاز شما در یک مجموعه</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesData.map((service, index) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.08, duration: 0.5 }}>
              <div className="card-luxury p-8 h-full flex flex-col relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-2xl mb-6 group-hover:bg-gold/10 transition-all">{service.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-white/30">
                      <span className="w-1 h-1 rounded-full bg-gold/60" />{f}
                    </div>
                  ))}
                </div>
                <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-gold group/link mt-auto">
                  <span>جزئیات بیشتر</span>
                  <svg className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
