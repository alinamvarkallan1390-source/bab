'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiPaperAirplane } from 'react-icons/hi';
import { FaWhatsapp, FaTelegram, FaInstagram } from 'react-icons/fa';
import { companyInfo } from '@/data/company';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="pt-24" dir="rtl">
      {/* Page Header */}
      <section className="relative py-20 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #F5A623 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4"
          >
            تماس با <span className="text-gradient">ما</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            خوشحال می‌شویم نظرات و پیشنهادات شما را بشنویم
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-lightgray">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">ارسال پیام</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">موضوع</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">پیام شما</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  {submitted ? 'پیام شما ارسال شد ✓' : (
                    <>
                      ارسال پیام
                      <HiPaperAirplane />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-8">اطلاعات تماس</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <HiPhone className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">تلفن</h4>
                    <p className="text-gray-600" dir="ltr">{companyInfo.phone}</p>
                    <p className="text-gray-500 text-sm mt-1">اضطراری: {companyInfo.emergencyContact}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <HiMail className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">ایمیل</h4>
                    <p className="text-gray-600">{companyInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <HiLocationMarker className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">آدرس</h4>
                    <p className="text-gray-600">{companyInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <HiClock className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">ساعت کاری</h4>
                    <p className="text-gray-600">{companyInfo.workingHours}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 bg-white rounded-2xl">
                <h4 className="font-semibold mb-4">شبکه‌های اجتماعی</h4>
                <div className="flex gap-3">
                  <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-all flex items-center gap-2 font-medium">
                    <FaWhatsapp /> واتساپ
                  </a>
                  <a href={`https://t.me/${companyInfo.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all flex items-center gap-2 font-medium">
                    <FaTelegram /> تلگرام
                  </a>
                  <a href={`https://instagram.com/${companyInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 transition-all flex items-center gap-2 font-medium">
                    <FaInstagram /> اینستاگرام
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section>
        <div className="h-96 bg-gray-200">
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
      </section>
    </main>
  );
}
