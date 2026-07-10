'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/contexts/LoadingContext';

export default function LoadingScreen() {
  const { isLoading, setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const increment = Math.random() * 15 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setShowContent(false);
        setTimeout(() => setIsLoading(false), 500);
      }, 800);
    }
  }, [progress, setIsLoading]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Blueprint Animation */}
          <div className="relative w-32 h-32">
            <motion.div
              className="absolute inset-0 border-2 border-primary/30 rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.rect
                  x="10" y="10" width="80" height="80"
                  fill="none"
                  stroke="#F5A623"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
                <motion.line
                  x1="10" y1="50" x2="90" y2="50"
                  stroke="#F5A623"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <motion.line
                  x1="50" y1="10" x2="50" y2="90"
                  stroke="#F5A623"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </svg>
            </motion.div>

            {/* Building Logo */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
            >
              <span className="text-4xl">🏗️</span>
            </motion.div>
          </div>

          {/* Company Name */}
          <motion.h1
            className="text-2xl font-bold text-white mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            ساختمان‌سازی <span className="text-primary">لوکس</span>
          </motion.h1>

          {/* Progress Bar */}
          <div className="w-64 mt-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>در حال بارگذاری</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Loading Tips */}
          <motion.p
            className="text-gray-500 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            در حال آماده‌سازی تجربه معماری لوکس...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
