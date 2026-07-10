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
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: '#0A0A0F' }} dir="rtl">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8A45C]/2 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45C]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45C]/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A45C] font-semibold text-sm tracking-[0.2em] uppercase">نظرات مشتریان</span>
          <div className="gold-divider mt-4" />
          <h2 className="section-title text-white mt-4">
            آنچه <span className="text-gold">مشتریان</span> ما می‌گویند
          </h2>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#C8A45C]', bulletClass: 'swiper-pagination-bullet !bg-white/20 !opacity-100' }}
          className="pb-16"
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm h-full group hover:bg-white/[0.04] hover:border-[#C8A45C]/20 transition-all duration-500"
              >
                {/* Quote mark */}
                <div className="absolute top-6 right-6 text-6xl text-[#C8A45C]/10 font-serif leading-none">&quot;</div>

                {/* Stars */}
                <div className="flex gap-1 mb-6 relative">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar key={i} className={`text-lg ${i < testimonial.rating ? 'text-[#C8A45C]' : 'text-white/10'}`} />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-white/60 leading-relaxed mb-8 text-sm relative">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>

                {/* Customer */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A45C]/30 to-[#C8A45C]/5 flex items-center justify-center border border-[#C8A45C]/20">
                    <span className="text-[#C8A45C] font-bold text-lg">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                    <p className="text-white/30 text-xs">مشتری راضی</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
