'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { projectsData } from '@/data/company';

const categories = ['همه', 'ویلا', 'آپارتمان', 'آشپزخانه', 'اداری', 'تجاری'];

const projectImages: Record<number, string> = {
  0: '🏡', 1: '🏢', 2: '🏢', 3: '🍳', 4: '🏪', 5: '🚿'
};
const projectBgColors = [
  'from-amber-900/20 to-amber-950/20',
  'from-blue-900/20 to-blue-950/20',
  'from-emerald-900/20 to-emerald-950/20',
  'from-orange-900/20 to-orange-950/20',
  'from-purple-900/20 to-purple-950/20',
  'from-cyan-900/20 to-cyan-950/20',
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects = activeCategory === 'همه'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section ref={ref} className="section-padding bg-white" dir="rtl">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#C8A45C] font-semibold text-sm tracking-[0.2em] uppercase">نمونه کارها</span>
          <div className="gold-divider mt-4" />
          <h2 className="section-title mt-4">
            پروژه‌های <span className="text-gold">اخیر</span>
          </h2>
          <p className="section-subtitle">
            مجموعه‌ای از پروژه‌های موفق ما در سراسر کشور
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#C8A45C] text-[#0A0A0F] shadow-lg shadow-[#C8A45C]/20'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="luxury-card overflow-hidden">
                {/* Image placeholder with gradient */}
                <div className={`relative h-64 bg-gradient-to-br ${projectBgColors[index % projectBgColors.length]} overflow-hidden`}>
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(200,164,92,0.3) 1px, transparent 0)',
                    backgroundSize: '30px 30px'
                  }} />
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-7xl opacity-30 group-hover:opacity-40 transition-all duration-500"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {projectImages[index] || '🏗️'}
                    </motion.span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-5 right-5">
                    <span className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm text-white/90 text-xs font-medium border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <Link
                      href={`/portfolio/${project.id}`}
                      className="btn-gold text-sm !px-6 !py-3"
                    >
                      مشاهده پروژه
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {project.location}
                    </span>
                    <span>{project.completionDate}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 group-hover:text-[#C8A45C] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link href="/portfolio" className="btn-gold text-lg inline-flex items-center gap-3">
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
