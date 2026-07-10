'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { projectsData } from '@/data/company';

const categories = ['همه', 'ویلا', 'آپارتمان', 'آشپزخانه', 'اداری', 'تجاری'];
const emojis = ['🏡', '🏢', '🏢', '🍳', '🏪', '🚿'];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = activeCategory === 'همه'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section ref={ref} className="section-padding" style={{ background: '#0B0B0B' }} dir="rtl">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="section-label">نمونه کارها</div>
          <h2 className="section-title-custom">
            پروژه‌های <span className="gold-text">اخیر</span>
          </h2>
          <p className="section-desc">
            مجموعه‌ای از پروژه‌های موفق ما در سراسر کشور
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#D4A843] text-black'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group"
            >
              <div className="card-premium overflow-hidden">
                {/* Image area */}
                <div className="relative h-56 bg-gradient-to-br from-white/[0.02] to-white/[0.05] overflow-hidden">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(212,168,67,0.05) 1px, transparent 0)',
                    backgroundSize: '25px 25px'
                  }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500">
                      {emojis[index % emojis.length]}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-lg bg-black/60 text-white/80 text-xs font-medium backdrop-blur-sm border border-white/10">
                      {project.category}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/portfolio/${project.id}`} className="btn-primary-custom text-sm !px-5 !py-2.5">
                      مشاهده
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-white/30 mb-2">
                    <span>{project.location}</span>
                    <span>{project.completionDate}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4A843] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-white/30 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/portfolio" className="btn-outline-custom">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
            </svg>
            مشاهده همه پروژه‌ها
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
