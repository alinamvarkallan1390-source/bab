'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiCheckBadge, HiEye, HiHeart, HiTag } from 'react-icons/hi2';
import { teamMembers, companyInfo } from '@/data/company';

const values = [
  { icon: HiCheckBadge, title: 'کیفیت', description: 'بالاترین استانداردهای کیفیت در تمام پروژه‌ها' },
  { icon: HiHeart, title: 'اعتماد', description: 'ایجاد اعتماد متقابل با شفافیت در تمام مراحل' },
  { icon: HiEye, title: 'خلاقیت', description: 'طراحی منحصر به فرد با نگاه خلاقانه' },
  { icon: HiTag, title: 'تعهد', description: 'تعهد به زمان‌بندی و بودجه پروژه' },
];

export default function AboutPage() {
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
            درباره <span className="text-gradient">ما</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            داستان ما، از یک ایده تا خلق فضاهای رویایی
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold text-sm">داستان ما</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                از <span className="text-gradient">یک رویا</span> تا واقعیت
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  شرکت ساختمان‌سازی لوکس در سال ۱۳۸۸ با هدف ارائه خدمات با کیفیت در صنعت ساختمان تأسیس شد.
                  ما از همان ابتدا متعهد شدیم که استانداردهای جدیدی در طراحی و اجرا ایجاد کنیم.
                </p>
                <p>
                  امروز پس از ۱۵ سال تجربه، مفتخریم که بیش از ۵۲۰ پروژه موفق در سراسر کشور به انجام رسانده‌ایم
                  و توانسته‌ایم اعتماد هزاران مشتری را جلب کنیم.
                </p>
                <p>
                  تیم ما متشکل از مجرب‌ترین مهندسان، معماران و طراحان است که هر یک در زمینه خود متخصص هستند.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-dark overflow-hidden flex items-center justify-center">
                <span className="text-9xl opacity-30">🏗️</span>
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-primary text-dark p-4 rounded-2xl shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-3xl font-black">{companyInfo.stats.yearsExperience}+</span>
                <span className="text-sm block">سال تجربه</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-lightgray">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm">ارزش‌های ما</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              ارزش‌هایی که به آنها <span className="text-gradient">متعهد</span> هستیم
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 bg-white rounded-2xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-3xl text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm">تیم ما</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              با <span className="text-gradient">تیم حرفه‌ای</span> ما آشنا شوید
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-primary/20 to-dark mx-auto mb-6 flex items-center justify-center overflow-hidden">
                  <span className="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-300">
                    👷
                  </span>
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-primary font-medium text-sm mt-1">{member.role}</p>
                <p className="text-gray-500 text-sm mt-3">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
