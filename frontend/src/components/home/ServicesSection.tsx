'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import { servicesData } from '@/data/company';

const iconMap: { [key: string]: string } = {
  '🏛️': '🏛️',
  '🔨': '🔨',
  '🏗️': '🏗️',
  '🌳': '🌳',
  '🪑': '🪑',
  '🍳': '🍳',
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding bg-lightgray" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">خدمات ما</span>
          <h2 className="section-title mt-2">
            خدمات <span className="text-gradient">حرفه‌ای</span> ساختمانی
          </h2>
          <p className="section-subtitle">
            از طراحی تا اجرا، همه خدمات مورد نیاز شما برای خلق فضایی لوکس و منحصر به فرد
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card p-8 h-full bg-white relative overflow-hidden">
                {/* Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative z-10 text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Link */}
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
                  >
                    جزئیات بیشتر
                    <HiArrowLeft className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
