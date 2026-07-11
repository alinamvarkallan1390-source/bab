'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { faqData } from '@/data/company';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="section-padding" style={{ background: '#0A0A0A' }} dir="rtl">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div className="section-tag">سوالات متداول</div>
            <h2 className="section-title">پاسخ به <span className="text-gold-gradient">سوالات</span> شما</h2>
            <p className="section-desc mb-8">اگر سوال دیگری دارید، خوشحال می‌شویم با ما تماس بگیرید.</p>
            <a href="/contact" className="btn-luxury">تماس با ما</a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="space-y-3">
            {faqData.map((faq, index) => (
              <motion.div key={faq.id} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.05 }}>
                <div className={`rounded-2xl overflow-hidden transition-all duration-300 border ${openId === faq.id ? 'border-gold/20 bg-gold/[0.02]' : 'border-white/[0.06]'}`}>
                  <button onClick={() => setOpenId(openId === faq.id ? null : faq.id)} className="w-full flex items-center justify-between p-5 text-right gap-4">
                    <span className={`text-sm font-bold ${openId === faq.id ? 'text-gold' : 'text-white/80'}`}>{faq.question}</span>
                    <svg className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180 text-gold' : 'text-white/20'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="px-5 pb-5 text-white/40 text-sm leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
