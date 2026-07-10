'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { companyInfo, navItems } from '@/data/company';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 3000); }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: '#0B0B0B' }}>
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A843]/15 to-transparent" />

      <div className="section-container relative z-10">
        {/* Newsletter */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="py-14 border-b border-white/[0.05]">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-2">عضویت در <span className="gold-text">خبرنامه</span></h3>
            <p className="text-white/30 text-xs mb-6">آخرین پروژه‌ها و تخفیف‌های ویژه</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل شما"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#D4A843]/40 transition-all"
                required />
              <button type="submit" className="btn-primary-custom !py-3 !px-5 text-sm whitespace-nowrap">
                {subscribed ? '✓' : 'عضویت'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">🏗️</span>
              <div>
                <p className="text-white font-bold text-xs">ساختمان‌سازی لوکس</p>
                <p className="text-[8px] text-[#D4A843] tracking-[0.3em]">L U X E</p>
              </div>
            </div>
            <p className="text-white/25 text-xs leading-relaxed">{companyInfo.description}</p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs mb-5">لینک‌ها</h4>
            <ul className="space-y-2.5">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/30 hover:text-[#D4A843] transition-colors text-xs">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs mb-5">خدمات</h4>
            <ul className="space-y-2.5">
              {['طراحی داخلی', 'بازسازی', 'طراحی نما', 'ساخت ویلا', 'دکوراسیون'].map(s => (
                <li key={s}>
                  <Link href="/services" className="text-white/30 hover:text-[#D4A843] transition-colors text-xs">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs mb-5">تماس</h4>
            <ul className="space-y-3 text-white/30 text-xs">
              <li><span className="text-[#D4A843] ml-1">📞</span>{companyInfo.phone}</li>
              <li><span className="text-[#D4A843] ml-1">✉️</span>{companyInfo.email}</li>
              <li className="leading-relaxed"><span className="text-[#D4A843] ml-1">📍</span>{companyInfo.address}</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-white/[0.05] text-center">
          <p className="text-white/15 text-xs">© {new Date().getFullYear()} ساختمان‌سازی لوکس</p>
        </div>
      </div>
    </footer>
  );
}
