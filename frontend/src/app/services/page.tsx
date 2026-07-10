'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { servicesData } from '@/data/company';
import ContactCTA from '@/components/home/ContactCTA';

export default function ServicesPage() {
  return (
    <main className="pt-24" dir="rtl">
      {/* Page Header */}
      <section className="relative py-20 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(45deg, #F5A623 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4"
          >
            خدمات <span className="text-gradient">ما</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            ارائه طیف کاملی از خدمات ساختمانی با بالاترین استانداردهای کیفیت
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-lightgray">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="card p-8 bg-white h-full">
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-3 mb-6">
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
