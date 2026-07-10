'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { HiArrowLeft, HiOutlineEye, HiOutlinePlus } from 'react-icons/hi';
import { projectsData } from '@/data/company';

const categories = ['همه', 'ویلا', 'آپارتمان', 'آشپزخانه', 'اداری', 'تجاری'];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects = activeCategory === 'همه'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section ref={ref} className="section-padding bg-white" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">نمونه کارها</span>
          <h2 className="section-title mt-2">
            پروژه‌های <span className="text-gradient">اخیر</span>
          </h2>
          <p className="section-subtitle">
            مجموعه‌ای از پروژه‌های موفق ما در سراسر کشور
          </p>
        </motion.div>

        {/* Category Filter */}
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
                  ? 'bg-primary text-dark shadow-lg shadow-primary/25'
                  : 'bg-lightgray text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card relative overflow-hidden">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 rounded-lg bg-dark/80 backdrop-blur-sm text-white text-xs font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Link
                      href={`/portfolio/${project.id}`}
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-dark hover:scale-110 transition-transform"
                    >
                      <HiOutlineEye className="text-xl" />
                    </Link>
                    <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all">
                      <HiOutlinePlus className="text-xl" />
                    </button>
                  </div>

                  {/* Placeholder Image with gradient */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30">🏗️</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{project.location}</span>
                    <span>{project.completionDate}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="btn-primary inline-flex items-center gap-2"
          >
            مشاهده همه پروژه‌ها
            <HiArrowLeft />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
