'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { servicesData } from '@/data/company';

const icons = ['🏛️', '🔨', '🏗️', '🌳', '🪑', '🍳'];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding" style={{ background: '#F8F6F3' }} dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A45C] font-semibold text-sm tracking-[0.2em] uppercase">خدمات ما</span>
          <div className="gold-divider mt-4" />
          <h2 className="section-title mt-4">
            خدمات <span className="text-gold">حرفه‌ای</span> ساختمانی
          </h2>
          <p className="section-subtitle">
            از طراحی تا اجرا، همه خدمات مورد نیاز شما برای خلق فضایی لوکس و منحصر به فرد
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="luxury-card p-10 h-full relative overflow-hidden">
                {/* Gold accent top */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="text-5xl mb-8 relative">
                  <motion.span
                    className="inline-block"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.span>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-[#1A1A2E] group-hover:text-[#C8A45C] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C8A45C]" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href={`/services`}
                  className="inline-flex items-center gap-2 text-[#C8A45C] font-bold text-sm group/link"
                >
                  <span className="border-b border-transparent group-hover/link:border-[#C8A45C] transition-all">
                    جزئیات بیشتر
                  </span>
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
