'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
import { faqData } from '@/data/company';

function FAQItem({ faq, isOpen, onClick }: { faq: typeof faqData[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      layout
      className={`border rounded-2xl overflow-hidden transition-all ${
        isOpen ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-right"
      >
        <span className="font-medium text-secondary">{faq.question}</span>
        <HiChevronDown
          className={`text-xl text-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
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
            <p className="px-6 pb-6 text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
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
    <section ref={ref} className="section-padding bg-lightgray" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-primary text-5xl mb-6">
              <HiOutlineQuestionMarkCircle />
            </div>
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">
              سوالات متداول
            </span>
            <h2 className="section-title mt-2 mb-6">
              پاسخ به <span className="text-gradient">سوالات</span> شما
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              اگر سوال دیگری دارید، خوشحال می‌شویم با ما تماس بگیرید.
            </p>
            <a href="/contact" className="btn-primary">
              تماس با ما
            </a>
          </motion.div>

          {/* Right - FAQ List */}
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
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openId === faq.id}
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
