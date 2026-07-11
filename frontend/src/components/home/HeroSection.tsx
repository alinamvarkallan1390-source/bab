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

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center overflow-hidden" style={{ background: '#050505' }}>
      {/* Neon grid background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 neon-grid-bg opacity-50" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(0,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 30% 60%, rgba(255,0,255,0.03) 0%, transparent 50%)'
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
        
        {/* Animated neon circles */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            border: '1px solid rgba(0,255,255,0.04)',
            boxShadow: '0 0 80px rgba(0,255,255,0.02)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            border: '1px solid rgba(255,0,255,0.04)',
            boxShadow: '0 0 60px rgba(255,0,255,0.02)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              background: i % 2 === 0 ? '#00ffff' : '#ff00ff',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: i % 2 === 0 ? '0 0 6px #00ffff' : '0 0 6px #ff00ff',
            }}
            animate={{
              y: [0, -30 - Math.random() * 60],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div className="relative z-10 w-full" style={{ opacity }}>
        <div className="section-container">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider mb-8"
              style={{
                border: '1px solid rgba(0,255,255,0.15)',
                background: 'rgba(0,255,255,0.03)',
                color: '#00ffff',
                boxShadow: '0 0 15px rgba(0,255,255,0.05)'
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00ffff', boxShadow: '0 0 6px #00ffff' }} />
              بیش از ۵۲۰ پروژه موفق
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-6"
            >
              <span className="block">معماری</span>
              <span className="block mt-1">
                <span className="neon-text">فردا</span>
              </span>
              <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl font-light text-gray-600">
                امروز ساخته می‌شود
              </span>
            </motion.h1>

            {/* Neon divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] origin-right mb-8"
              style={{
                width: '120px',
                background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                boxShadow: '0 0 10px rgba(0,255,255,0.2)'
              }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed mb-12 font-light"
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
              <Link href="/portfolio" className="btn-neon text-base">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                مشاهده پروژه‌ها
              </Link>
              <Link href="/contact" className="btn-neon-outline text-base">
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
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em]" style={{ color: 'rgba(0,255,255,0.3)' }}>SCROLL</span>
          <div className="w-[1px] h-8" style={{ background: 'linear-gradient(to bottom, rgba(0,255,255,0.4), transparent)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
