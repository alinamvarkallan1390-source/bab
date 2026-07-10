'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/contexts/LoadingContext';

export default function LoadingScreen() {
  const { isLoading, setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timer = setInterval(() => {
      if (!mounted) return;
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const increment = Math.random() * 8 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 150);
    return () => { mounted = false; clearInterval(timer); };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setShowContent(false), 500);
      const t2 = setTimeout(() => setIsLoading(false), 1000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [progress, setIsLoading]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Building Icon Container */}
          <div className="relative">
            {/* Outer Ring */}
            <motion.div
              className="w-28 h-28 rounded-full border border-[#C8A45C]/20 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-20 h-20 rounded-full border border-[#C8A45C]/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A45C]/20 to-transparent flex items-center justify-center">
                  <span className="text-3xl">🏗️</span>
                </div>
              </div>
            </motion.div>
            
            {/* Glow */}
            <div className="absolute inset-0 bg-[#C8A45C]/5 blur-3xl rounded-full" />
          </div>

          {/* Company Name */}
          <div className="text-center">
            <motion.h1
              className="text-3xl font-black text-white tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              ساختمان‌سازی
            </motion.h1>
            <motion.p
              className="text-[#C8A45C] text-lg font-light mt-1 tracking-[0.2em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              L U X E
            </motion.p>
          </div>

          {/* Progress */}
          <div className="w-72">
            <div className="flex justify-between text-xs text-white/30 mb-3 font-light tracking-wider">
              <span>در حال بارگذاری</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #C8A45C, #E8D5A8, #C8A45C)',
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Loading text cycling */}
          <motion.p
            className="text-white/20 text-xs font-light tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {progress < 30 ? 'طراحی معماری...' : 
             progress < 60 ? 'اجرای سازه...' : 
             progress < 90 ? 'نازک‌کاری و دکوراسیون...' : 
             'آماده تحویل...'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
