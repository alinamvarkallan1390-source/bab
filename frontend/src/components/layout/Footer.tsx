'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { companyInfo, navItems } from '@/data/company';
import { staggerContainer, fadeInUp } from '@/lib/utils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: '#0A0A0F' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45C]/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 border-b border-white/5"
        >
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
              عضویت در <span className="text-gold">خبرنامه</span>
            </h3>
            <p className="text-white/30 text-sm mb-8">
              با عضویت در خبرنامه، از آخرین پروژه‌ها و تخفیف‌های ویژه مطلع شوید.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#C8A45C]/50 transition-all text-sm"
                required
              />
              <button type="submit" className="btn-gold !py-4 whitespace-nowrap">
                {subscribed ? 'عضویت شما ثبت شد ✓' : 'عضویت'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Main */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16"
        >
          {/* Company */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A45C] to-[#A8883E] flex items-center justify-center text-sm">🏗️</div>
              <div>
                <h4 className="text-white font-black text-sm tracking-wide">ساختمان‌سازی لوکس</h4>
                <p className="text-[10px] text-[#C8A45C] tracking-[0.3em] font-medium">L U X E</p>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-6">{companyInfo.description}</p>
            <div className="flex gap-3">
              {[
                { icon: '📸', href: '#', label: 'اینستاگرام' },
                { icon: '✈️', href: '#', label: 'تلگرام' },
                { icon: '💬', href: '#', label: 'واتساپ' },
                { icon: '🔗', href: '#', label: 'لینکدین' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm hover:bg-[#C8A45C]/20 hover:text-[#C8A45C] transition-all" title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold mb-6 text-sm">لینک‌های سریع</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/30 hover:text-[#C8A45C] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#C8A45C]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold mb-6 text-sm">خدمات</h4>
            <ul className="space-y-3">
              {['طراحی داخلی', 'بازسازی ساختمان', 'طراحی نما', 'ساخت ویلا', 'دکوراسیون', 'نوسازی آشپزخانه'].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-white/30 hover:text-[#C8A45C] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#C8A45C]" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold mb-6 text-sm">اطلاعات تماس</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/30">
                <span className="text-[#C8A45C]">📞</span>
                <span dir="ltr">{companyInfo.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/30">
                <span className="text-[#C8A45C]">✉️</span>
                <span>{companyInfo.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/30">
                <span className="text-[#C8A45C]">📍</span>
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/30">
                <span className="text-[#C8A45C]">🕐</span>
                <span>{companyInfo.workingHours}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <div className="py-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} تمامی حقوق برای <span className="text-[#C8A45C]">ساختمان‌سازی لوکس</span> محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
