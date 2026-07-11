'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { navItems } from '@/data/company';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-[#00ffff]/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center text-sm shadow-lg" style={{ boxShadow: '0 0 15px rgba(0,255,255,0.2)' }}>
                🏗️
              </div>
              <div>
                <span className="text-white font-black text-sm tracking-wide">ساختمان‌سازی</span>
                <span className="block text-[8px] text-cyan-400 tracking-[0.3em] font-medium leading-none" style={{ textShadow: '0 0 10px rgba(0,255,255,0.3)' }}>N E O N</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <Link key={item.href} href={item.href}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                  {item.label}
                </Link>
              ))}
              <Link href="/contact"
                className="mr-3 px-5 py-2 rounded-lg text-sm font-bold text-black transition-all"
                style={{
                  background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                  boxShadow: '0 0 20px rgba(0,255,255,0.2)'
                }}
              >
                مشاوره رایگان
              </Link>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2 relative z-50" aria-label="منو">
              {isMobileMenuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-[#050505]/98 backdrop-blur-2xl" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-5 p-8">
              {navItems.map((item, index) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
                  <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-500 hover:text-white text-xl font-bold transition-all block text-center py-2">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-neon mt-4">مشاوره رایگان</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
