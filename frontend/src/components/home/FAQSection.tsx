'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { faqData } from '@/data/company';

function FAQItem({ faq, isOpen, onClick }: { faq: typeof faqData[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      layout
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen ? 'bg-[#C8A45C]/5 border-[#C8A45C]/30' : 'bg-white border-gray-100 hover:border-gray-200'
      } border`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-right gap-4"
      >
        <span className={`font-bold text-sm ${isOpen ? 'text-[#C8A45C]' : 'text-[#1A1A2E]'}`}>
          {faq.question}
        </span>
        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C8A45C]' : 'text-gray-300'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="section-padding" style={{ background: '#F8F6F3' }} dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#C8A45C]/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#C8A45C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <span className="text-[#C8A45C] font-semibold text-sm tracking-[0.2em] uppercase">سوالات متداول</span>
            <div className="gold-divider mt-4" />
            <h2 className="section-title mt-4">
              پاسخ به <span className="text-gold">سوالات</span> شما
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
              اگر سوال دیگری دارید، خوشحال می‌شویم با ما تماس بگیرید. تیم پشتیبانی ما ۲۴ ساعته آماده پاسخگویی است.
            </p>
            <a href="/contact" className="btn-gold">تماس با ما</a>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <FAQItem faq={faq} isOpen={openId === faq.id} onClick={() => setOpenId(openId === faq.id ? null : faq.id)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
