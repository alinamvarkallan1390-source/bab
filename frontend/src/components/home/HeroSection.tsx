'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  // Building reveal animation
  const buildingVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const windowVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 1.5 + i * 0.03, duration: 0.3 }
    })
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden"
      style={{ background: '#0A0A0F' }}
    >
      {/* Background layers */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale }}>
        {/* Dark base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0A0A0F]/95 to-[#0A0A0F]" />
        
        {/* Gold glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C8A45C]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#C8A45C]/2 rounded-full blur-[100px]" />
        
        {/* Blueprint grid */}
        <div className="absolute inset-0 blueprint-grid" />
        
        {/* Gold horizontal accent lines */}
        <div className="absolute top-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45C]/20 to-transparent" />
        <div className="absolute top-[85%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45C]/20 to-transparent" />
      </motion.div>

      {/* 3D Building SVG */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-[0.04] pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.04, 0.01]) }}
      >
        <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Building structure */}
          <rect x="200" y="50" width="400" height="500" stroke="#C8A45C" strokeWidth="0.5" />
          <rect x="220" y="70" width="80" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="320" y="70" width="80" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="420" y="70" width="80" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="520" y="70" width="60" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="220" y="170" width="80" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="320" y="170" width="80" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="420" y="170" width="80" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="520" y="170" width="60" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="220" y="270" width="80" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="320" y="270" width="80" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="420" y="270" width="80" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="520" y="270" width="60" height="80" stroke="#C8A45C" strokeWidth="0.3" />
          <rect x="250" y="370" width="160" height="130" stroke="#C8A45C" strokeWidth="0.5" />
          <rect x="420" y="370" width="160" height="130" stroke="#C8A45C" strokeWidth="0.5" />
          {/* Roof */}
          <polygon points="200,50 400,10 600,50" stroke="#C8A45C" strokeWidth="0.5" fill="none" />
          {/* Crane */}
          <line x1="650" y1="50" x2="650" y2="10" stroke="#C8A45C" strokeWidth="0.3" />
          <line x1="650" y1="10" x2="720" y2="10" stroke="#C8A45C" strokeWidth="0.3" />
          <line x1="720" y1="10" x2="720" y2="40" stroke="#C8A45C" strokeWidth="0.3" />
          <circle cx="720" cy="45" r="3" stroke="#C8A45C" strokeWidth="0.3" />
        </svg>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-[#C8A45C] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 50],
              opacity: [0, 0.4, 0],
              x: [0, (Math.random() - 0.5) * 20],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 lg:px-12 text-center"
        style={{ y: textY, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#C8A45C]/20 bg-[#C8A45C]/5 text-[#C8A45C] text-sm font-medium mb-10 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#C8A45C] animate-pulse" />
          بیش از ۵۲۰ پروژه موفق در سراسر کشور
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] mb-8"
        >
          <span className="block">معماری</span>
          <span className="block mt-2">
            <span className="text-gold">فردا</span>
          </span>
          <span className="block mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white/40">
            امروز ساخته می‌شود
          </span>
        </motion.h1>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent mx-auto mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          از طراحی تا اجرا، همراه شما در هر قدم از مسیر ساخت و ساز لوکس.
          ما فضاهای رویایی شما را به واقعیت تبدیل می‌کنیم.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/portfolio" className="btn-gold text-lg group">
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            مشاهده پروژه‌ها
          </Link>
          <Link href="/contact" className="btn-outline text-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            مشاوره رایگان
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] text-white/20 tracking-[0.2em] font-light">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#C8A45C]/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
