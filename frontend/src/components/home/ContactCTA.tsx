'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#0B0B0B' }} dir="rtl">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A843]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A843]/15 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A843]/3 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="section-label justify-center">ارتباط با ما</div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
            آماده شروع <span className="gold-text">پروژه</span> خود هستید؟
          </h2>
          <p className="text-white/40 text-base md:text-lg mb-10 leading-relaxed">
            با ما تماس بگیرید و مشاوره رایگان دریافت کنید. تیم متخصص ما آماده پاسخگویی است.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary-custom">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              درخواست مشاوره رایگان
            </Link>
            <a href="tel:02112345678" className="btn-outline-custom">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              تماس تلفنی
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
