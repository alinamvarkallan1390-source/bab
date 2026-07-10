'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center overflow-hidden" style={{ background: '#0B0B0B' }}>
      {/* Background layers */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-[#0B0B0B] to-transparent" />
        
        {/* Decorative orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-[#D4A843]/5" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full border border-[#D4A843]/8" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full border border-[#D4A843]/10" />
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? '#D4A843' : 'rgba(255,255,255,0.2)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40 - Math.random() * 60],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div className="relative z-10 w-full" style={{ y: textY, opacity }}>
        <div className="section-container">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#D4A843] text-xs font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] animate-pulse" />
              بیش از ۱۵ سال تجربه درخشان
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.85] mb-6"
            >
              <span className="block">معماری</span>
              <span className="block mt-1">
                <span className="gold-text">فردا</span>
              </span>
              <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/30">
                امروز ساخته می‌شود
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] bg-gradient-to-r from-[#D4A843] via-[#F0D68A] to-[#B8922E] origin-right mb-8"
              style={{ width: '120px' }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base md:text-lg text-white/40 max-w-xl leading-relaxed mb-12 font-light"
            >
              از طراحی تا اجرا، همراه شما در هر قدم از مسیر ساخت و ساز لوکس.
              ما فضاهای رویایی شما را به واقعیت تبدیل می‌کنیم.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link href="/portfolio" className="btn-primary-custom text-base">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                مشاهده پروژه‌ها
              </Link>
              <Link href="/contact" className="btn-outline-custom text-base">
                مشاوره رایگان
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 tracking-[0.2em]">SCROLL</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4A843]/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
