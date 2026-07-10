'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';

export default function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" dir="rtl">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark to-dark">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, #F5A623 0%, transparent 50%)'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            آماده شروع <span className="text-gradient">پروژه</span> خود هستید؟
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            با ما تماس بگیرید و مشاوره رایگان دریافت کنید. تیم متخصص ما آماده پاسخگویی به شماست.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-primary text-lg group"
            >
              درخواست مشاوره رایگان
              <HiArrowLeft className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:02112345678"
              className="btn-secondary text-lg"
            >
              تماس تلفنی
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
