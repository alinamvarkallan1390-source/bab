'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { companyInfo } from '@/data/company';

const contacts = [
  { icon: '💬', href: `https://wa.me/${companyInfo.whatsapp}`, color: 'from-green-500 to-green-600', label: 'واتساپ' },
  { icon: '✈️', href: `https://t.me/${companyInfo.telegram.replace('@', '')}`, color: 'from-blue-500 to-blue-600', label: 'تلگرام' },
  { icon: '📞', href: `tel:${companyInfo.phone}`, color: 'from-[#C8A45C] to-[#A8883E]', label: 'تماس' },
];

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {contacts.map((contact) => (
        <motion.a
          key={contact.label}
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all`}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          title={contact.label}
        >
          <span className="text-xl">{contact.icon}</span>
        </motion.a>
      ))}
    </div>
  );
}
