'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(201,168,76,0.04) 0%, transparent 60%)'
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        
        {/* Decorative circles */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.02]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.03]" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 w-full" style={{ opacity }}>
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-tag justify-center mx-auto mb-6"
              style={{ fontSize: '10px' }}
            >
              پیشرو در معماری لوکس
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="heading-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-8"
            >
              <span className="block">معماری</span>
              <span className="block mt-2 gold-divider mx-auto" />
              <span className="block mt-2 italic font-normal">فردا</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/40 max-w-xl mx-auto mb-12 leading-relaxed font-light"
            >
              از طراحی تا اجرا. ما فضاهای رویایی شما را با بالاترین<br />
              استانداردهای جهانی به واقعیت تبدیل می‌کنیم.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/portfolio" className="btn-luxury">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                پروژه‌های ما
              </Link>
              <Link href="/contact" className="btn-outline-luxury">
                مشاوره رایگان
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2">
          <span className="text-[8px] text-white/20 tracking-[0.3em]">SCROLL</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gold/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
