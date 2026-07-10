'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export default function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" dir="rtl" style={{ background: '#0A0A0F' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45C]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45C]/20 to-transparent" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#C8A45C]/3 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-[10%] w-32 h-32 border border-[#C8A45C]/10 rounded-full" />
        <div className="absolute bottom-1/4 right-[15%] w-24 h-24 border border-[#C8A45C]/10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-[#C8A45C] font-semibold text-sm tracking-[0.2em] uppercase">ارتباط با ما</span>
          <div className="gold-divider mt-4" />
          <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6 leading-tight">
            آماده شروع <span className="text-gold">پروژه</span> خود هستید؟
          </h2>
          <p className="text-white/40 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
            با ما تماس بگیرید و مشاوره رایگان دریافت کنید. تیم متخصص ما آماده پاسخگویی و همراهی شما در تمام مراحل است.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-gold text-lg group">
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              درخواست مشاوره رایگان
            </Link>
            <a href="tel:02112345678" className="btn-outline text-lg">
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
