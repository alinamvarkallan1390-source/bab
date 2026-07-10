'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiPhone, HiChatBubbleLeftRight } from 'react-icons/hi2';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { companyInfo } from '@/data/company';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* WhatsApp */}
      <motion.a
        href={`https://wa.me/${companyInfo.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:shadow-green-500/30 hover:scale-110 transition-all"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        title="واتساپ"
      >
        <FaWhatsapp className="text-2xl" />
      </motion.a>

      {/* Telegram */}
      <motion.a
        href={`https://t.me/${companyInfo.telegram.replace('@', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg hover:shadow-blue-500/30 hover:scale-110 transition-all"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        title="تلگرام"
      >
        <FaTelegram className="text-2xl" />
      </motion.a>

      {/* Phone */}
      <motion.a
        href={`tel:${companyInfo.phone}`}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-dark shadow-lg hover:shadow-primary/30 hover:scale-110 transition-all"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        title="تماس تلفنی"
      >
        <HiPhone className="text-2xl" />
      </motion.a>
    </div>
  );
}
