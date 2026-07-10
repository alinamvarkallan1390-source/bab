'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';
import { FaInstagram, FaTelegram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
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
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #F5A623 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 border-b border-white/10"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              عضویت در <span className="text-primary">خبرنامه</span>
            </h3>
            <p className="text-gray-400 mb-8">
              با عضویت در خبرنامه، از آخرین پروژه‌ها و تخفیف‌های ویژه مطلع شوید.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                {subscribed ? 'عضویت شما ثبت شد ✓' : 'عضویت'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16"
        >
          {/* Company Info */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">🏗️</span>
              <div>
                <h4 className="text-lg font-bold">ساختمان‌سازی لوکس</h4>
                <p className="text-xs text-primary">بیش از ۱۵ سال تجربه</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {companyInfo.description}
            </p>
            <div className="flex gap-3">
              <a href={`https://instagram.com/${companyInfo.instagram.replace('@', '')}`}
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition-all"
              >
                <FaInstagram />
              </a>
              <a href={`https://t.me/${companyInfo.telegram.replace('@', '')}`}
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition-all"
              >
                <FaTelegram />
              </a>
              <a href={`https://wa.me/${companyInfo.whatsapp}`}
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition-all"
              >
                <FaWhatsapp />
              </a>
              <a href="https://linkedin.com"
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary hover:bg-primary hover:text-dark transition-all"
              >
                <FaLinkedin />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-bold mb-6">لینک‌های سریع</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-bold mb-6">خدمات</h4>
            <ul className="space-y-3">
              {['طراحی داخلی', 'بازسازی ساختمان', 'طراحی نما', 'ساخت ویلا', 'دکوراسیون', 'نوسازی آشپزخانه'].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-bold mb-6">اطلاعات تماس</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <HiPhone className="text-primary text-xl mt-1 flex-shrink-0" />
                <span dir="ltr">{companyInfo.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <HiMail className="text-primary text-xl mt-1 flex-shrink-0" />
                <span>{companyInfo.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <HiLocationMarker className="text-primary text-xl mt-1 flex-shrink-0" />
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <HiClock className="text-primary text-xl mt-1 flex-shrink-0" />
                <span>{companyInfo.workingHours}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Map */}
        <div className="pb-8">
          <div className="rounded-2xl overflow-hidden h-64 bg-white/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d51.4343!3d35.7525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ1JzA5LjAiTiA1McKwMjYnMDMuNSJF!5e0!3m2!1sfa!2s!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعیت شرکت"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} تمامی حقوق برای <span className="text-primary">ساختمان‌سازی لوکس</span> محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
