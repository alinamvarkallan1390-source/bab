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
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-[#0A0A0F]/90 backdrop-blur-xl py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-gradient-to-b from-black/50 to-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A45C] to-[#A8883E] flex items-center justify-center text-lg shadow-lg group-hover:shadow-[#C8A45C]/30 transition-all">
                🏗️
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-black leading-tight tracking-wide transition-colors ${
                  isScrolled ? 'text-white' : 'text-white'
                }`}>
                  ساختمان‌سازی
                </span>
                <span className="text-[10px] text-[#C8A45C] font-medium tracking-[0.3em]">L U X E</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-all relative group"
                >
                  {item.label}
                  <span className="absolute bottom-1 right-5 left-5 h-[2px] bg-[#C8A45C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                </Link>
              ))}
              <Link
                href="/contact"
                className="mr-4 px-6 py-2.5 bg-gradient-to-r from-[#C8A45C] to-[#A8883E] text-[#0A0A0F] text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-[#C8A45C]/25 transition-all"
              >
                مشاوره رایگان
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 relative z-50"
              aria-label="منو"
            >
              {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#0A0A0F]/95 backdrop-blur-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6 p-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/80 hover:text-white text-2xl font-bold transition-all block text-center py-2"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-gold mt-8"
                >
                  مشاوره رایگان
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
