'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineEye } from 'react-icons/hi';
import { projectsData } from '@/data/company';

const allCategories = ['همه', ...Array.from(new Set(projectsData.map(p => p.category)))];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('همه');

  const filteredProjects = activeCategory === 'همه'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

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
            نمونه <span className="text-gradient">کارها</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            مجموعه‌ای از پروژه‌های موفق ما
          </motion.p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-lightgray">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-dark shadow-lg shadow-primary/25'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="card bg-white overflow-hidden">
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-30">🏗️</span>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-dark hover:scale-110 transition-transform"
                      >
                        <HiOutlineEye className="text-2xl" />
                      </Link>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1.5 rounded-lg bg-dark/80 backdrop-blur-sm text-white text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{project.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{project.location}</span>
                      <span>{project.budget}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
