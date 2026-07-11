'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { projectsData } from '@/data/company';

const cats = ['همه', 'ویلا', 'آپارتمان', 'آشپزخانه', 'اداری', 'تجاری'];
const icons = ['🏡', '🏢', '🍳', '🏢', '🏪', '🚿'];

export default function PortfolioSection() {
  const [activeCat, setActiveCat] = useState('همه');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = activeCat === 'همه' ? projectsData : projectsData.filter(p => p.category === activeCat);

  return (
    <section ref={ref} className="section-padding" style={{ background: '#0A0A0A' }} dir="rtl">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14">
          <div className="section-tag">نمونه کارها</div>
          <h2 className="section-title">پروژه‌های <span className="text-gold-gradient">اخیر</span></h2>
          <p className="section-desc">مجموعه‌ای از پروژه‌های موفق ما در سراسر کشور</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="flex flex-wrap gap-2 mb-10">
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCat === c ? 'bg-gold text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.08, duration: 0.5 }}>
              <div className="card-luxury group">
                <div className="relative h-60 bg-gradient-to-br from-white/[0.01] to-white/[0.03] overflow-hidden">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(201,168,76,0.04) 1px, transparent 0)', backgroundSize: '25px 25px' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl opacity-20 group-hover:scale-125 group-hover:opacity-30 transition-all duration-700">{icons[index % icons.length]}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/60 text-white/80 backdrop-blur-sm border border-white/10">{project.category}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                    <Link href={`/portfolio/${project.id}`} className="btn-luxury text-sm !px-5 !py-2.5">مشاهده پروژه</Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-white/30 mb-2">
                    <span>{project.location}</span>
                    <span>{project.budget}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">{project.name}</h3>
                  <p className="text-white/30 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="text-center mt-12">
          <Link href="/portfolio" className="btn-luxury">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
            </svg>
            همه پروژه‌ها
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
