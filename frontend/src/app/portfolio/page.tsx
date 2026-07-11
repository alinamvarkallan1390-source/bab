'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NeonBackground from '@/components/portfolio/NeonBackground';
import { projectsData } from '@/data/company';

const categories = ['همه', 'ویلا', 'آپارتمان', 'آشپزخانه', 'اداری', 'تجاری'];
const emojis = ['🏡', '🏢', '🍳', '🏢', '🏪', '🚿'];

function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-500">
        {/* Neon glow on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 via-fuchsia-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:via-fuchsia-500/20 group-hover:to-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
        
        {/* Image area */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(0,255,255,0.05) 0%, transparent 60%)'
          }} />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-7xl opacity-30 group-hover:scale-125 group-hover:opacity-50 transition-all duration-700"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {emojis[index % emojis.length]}
            </motion.span>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider border"
              style={{
                background: 'rgba(0,255,255,0.05)',
                borderColor: 'rgba(0,255,255,0.2)',
                color: '#00ffff',
                boxShadow: '0 0 10px rgba(0,255,255,0.1)'
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <Link href={`/portfolio/${project.id}`}
              className="relative px-6 py-3 rounded-xl font-bold text-sm tracking-wider overflow-hidden group/btn"
              style={{ background: 'linear-gradient(135deg, #00ffff, #ff00ff)', color: '#000' }}
            >
              <span className="relative z-10">مشاهده پروژه</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <div className="flex items-center justify-between text-xs mb-3" style={{ color: 'rgba(0,255,255,0.5)' }}>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </span>
            <span>{project.completionDate}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-400 transition-all duration-300">
            {project.name}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Budget */}
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs" style={{ color: 'rgba(255,0,255,0.5)' }}>{project.budget}</span>
            <span className="text-xs text-gray-600">مشاهده جزئیات →</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const [isHovering, setIsHovering] = useState(false);
  const headerRef = useRef(null);

  const filtered = activeCategory === 'همه'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <main className="relative min-h-screen" style={{ background: '#050505' }} dir="rtl">
      {/* 3D Neon Background */}
      <div className="fixed inset-0 z-0">
        <NeonBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Glowing badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] mb-8"
                style={{
                  border: '1px solid rgba(0,255,255,0.2)',
                  background: 'rgba(0,255,255,0.03)',
                  color: '#00ffff',
                  boxShadow: '0 0 20px rgba(0,255,255,0.05)'
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00ffff', boxShadow: '0 0 6px #00ffff' }} />
                پورتفولیو دیجیتال
              </motion.div>

              {/* Main title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6"
                style={{
                  background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00ffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                }}
              >
                پروژه‌های
                <br />
                <span className="text-white" style={{ WebkitTextFillColor: 'white' }}>ما</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-500 max-w-xl mx-auto mb-12"
              >
                هر پروژه یک داستان منحصر به فرد از خلاقیت و تخصص است
              </motion.p>

              {/* Category filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-3 mb-16"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 overflow-hidden"
                    style={{
                      background: activeCategory === cat
                        ? 'linear-gradient(135deg, #00ffff, #ff00ff)'
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${activeCategory === cat ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                      color: activeCategory === cat ? '#000' : '#666',
                      boxShadow: activeCategory === cat ? '0 0 20px rgba(0,255,255,0.2)' : 'none'
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              <AnimatePresence mode="wait">
                {filtered.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-t border-white/5 relative">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,255,255,0.02) 0%, transparent 60%)'
          }} />
          <div className="section-container relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '۵۲۰+', label: 'پروژه', color: '#00ffff' },
                { number: '۱۵+', label: 'سال تجربه', color: '#ff00ff' },
                { number: '۴۸۰+', label: 'مشتری', color: '#00ffff' },
                { number: '۲۸', label: 'شهر', color: '#ff00ff' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div className="text-4xl md:text-5xl font-black mb-2 transition-all duration-300 group-hover:scale-110"
                    style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}40` }}>
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
