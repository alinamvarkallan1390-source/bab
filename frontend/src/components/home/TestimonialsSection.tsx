'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { testimonialsData } from '@/data/company';

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: '#0F0F0F' }} dir="rtl">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14">
          <div className="section-tag">نظرات مشتریان</div>
          <h2 className="section-title">آنچه <span className="text-gold-gradient">مشتریان</span> می‌گویند</h2>
        </motion.div>

        <Swiper modules={[Autoplay, Pagination]} spaceBetween={20} slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, bulletActiveClass: '!bg-gold', bulletClass: 'swiper-pagination-bullet !bg-white/20 !opacity-100' }}
          className="pb-14"
        >
          {testimonialsData.map(t => (
            <SwiperSlide key={t.id}>
              <div className="card-luxury p-8 h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar key={i} className={`text-base ${i < t.rating ? 'text-gold' : 'text-white/10'}`} />
                  ))}
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-8 italic">&ldquo;{t.comment}&rdquo;</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/5 flex items-center justify-center border border-gold/20">
                    <span className="text-gold font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/20 text-xs">مشتری</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
