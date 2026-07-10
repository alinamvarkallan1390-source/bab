'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/contexts/LoadingContext';

export default function LoadingScreen() {
  const { isLoading, setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timer = setInterval(() => {
      if (!mounted) return;
      setProgress(p => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return Math.min(p + (Math.random() * 6 + 1), 100);
      });
    }, 120);
    return () => { mounted = false; clearInterval(timer); };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setShow(false), 400);
      const t2 = setTimeout(() => setIsLoading(false), 900);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [progress, setIsLoading]);

  const tips = [
    'طراحی معماری...',
    'محاسبه سازه...',
    'اجرای نما...',
    'نازک‌کاری...',
    'دکوراسیون داخلی...',
    'آماده تحویل...',
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loading-screen-custom"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4A843] to-[#B8922E] flex items-center justify-center text-3xl shadow-2xl">
              🏗️
            </div>
          </motion.div>

          <h1 className="text-xl font-black text-white tracking-wider">
            ساختمان‌سازی <span className="gold-text">لوکس</span>
          </h1>

          {/* Progress */}
          <div className="w-56">
            <div className="flex justify-between text-xs text-white/20 mb-2">
              <span>{tips[Math.min(Math.floor(progress / 17), tips.length - 1)]}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #D4A843, #F0D68A)',
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
