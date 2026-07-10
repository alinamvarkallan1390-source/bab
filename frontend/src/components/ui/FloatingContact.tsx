'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { companyInfo } from '@/data/company';

const items = [
  { icon: '💬', href: `https://wa.me/${companyInfo.whatsapp}`, label: 'واتساپ' },
  { icon: '✈️', href: `https://t.me/${companyInfo.telegram.replace('@', '')}`, label: 'تلگرام' },
  { icon: '📞', href: `tel:${companyInfo.phone}`, label: 'تماس' },
];

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {items.map(item => (
        <motion.a
          key={item.label}
          href={item.href}
          target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#D4A843] flex items-center justify-center text-lg shadow-lg hover:shadow-[#D4A843]/30 hover:scale-110 transition-all"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          title={item.label}
        >
          {item.icon}
        </motion.a>
      ))}
    </div>
  );
}
