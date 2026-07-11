'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projectsData } from '@/data/company';

const categories = ['همه', 'ویلا', 'آپارتمان', 'آشپزخانه', 'اداری', 'تجاری'];
const emojis = ['🏡', '🏢', '🍳', '🏢', '🏪', '🚿'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const filtered = activeCategory === 'همه' ? projectsData : projectsData.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen pt-28 pb-20" style={{ background: '#0A0A0A' }} dir="rtl">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="section-tag justify-center mx-auto">نمونه کارها</div>
          <h1 className="heading-serif text-5xl md:text-7xl text-white mb-4">
            پروژه‌های <span className="text-gold-gradient">ما</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto">هر پروژه داستانی از خلاقیت، تخصص و تعهد است</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === c ? 'bg-gold text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
            >{c}</button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((project, index) => (
              <motion.div key={project.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
              >
                <div className="card-luxury group">
                  <div className="relative h-56 bg-gradient-to-br from-white/[0.01] to-white/[0.03] overflow-hidden">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(201,168,76,0.04) 1px, transparent 0)', backgroundSize: '25px 25px' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-20 group-hover:scale-125 group-hover:opacity-30 transition-all duration-700">{emojis[index % emojis.length]}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/60 text-white/80 backdrop-blur-sm border border-white/10">{project.category}</span>
                    </div>
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                      <Link href={`/portfolio/${project.id}`} className="btn-luxury text-sm !px-5 !py-2.5">مشاهده</Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-white/30 mb-2">
                      <span>{project.location}</span><span>{project.budget}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">{project.name}</h3>
                    <p className="text-white/30 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-14 border-t border-white/5">
            {[
              { n: '۵۲۰+', l: 'پروژه' }, { n: '۱۵+', l: 'سال تجربه' },
              { n: '۴۸۰+', l: 'مشتری' }, { n: '۲۸', l: 'شهر' },
            ].map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gold mb-1">{s.n}</div>
                <div className="text-sm text-white/30">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
