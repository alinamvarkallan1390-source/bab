'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0A0A0F' }} dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-2xl"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8A45C] to-[#A8883E] flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg">🏗️</div>
            <h2 className="text-2xl font-black text-white">پنل مدیریت</h2>
            <p className="text-white/30 text-sm mt-2">ساختمان‌سازی لوکس</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-5">
            <div>
              <label className="block text-xs text-white/40 mb-2 font-medium">ایمیل</label>
              <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#C8A45C]/50 transition-all outline-none text-sm"
                placeholder="admin@luxuryconst.com" />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-2 font-medium">رمز عبور</label>
              <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#C8A45C]/50 transition-all outline-none text-sm"
                placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full btn-gold justify-center mt-4">ورود به پنل مدیریت</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0F' }} dir="rtl">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white/[0.02] border-l border-white/[0.06] p-6 fixed right-0 top-0 bottom-0 overflow-y-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="text-white font-bold text-sm">پنل مدیریت</h3>
              <p className="text-white/30 text-xs">مدیریت محتوا</p>
            </div>
          </div>
          {[
            { icon: '📊', label: 'داشبورد', id: 'dashboard' },
            { icon: '🏗️', label: 'پروژه‌ها', id: 'projects' },
            { icon: '📄', label: 'خدمات', id: 'services' },
            { icon: '✍️', label: 'وبلاگ', id: 'blog' },
            { icon: '💬', label: 'نظرات', id: 'testimonials' },
            { icon: '✉️', label: 'پیام‌ها', id: 'messages' },
            { icon: '🖼️', label: 'رسانه', id: 'media' },
            { icon: '⚙️', label: 'تنظیمات', id: 'settings' },
          ].map(item => (
            <button key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm mb-1">
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <button onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/50 hover:text-red-400 hover:bg-red-500/5 transition-all text-sm mt-8">
            <span>🚪</span> خروج
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 mr-72 p-8">
          <h2 className="text-3xl font-black text-white mb-8">داشبورد</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'پروژه‌ها', value: '۵۲۰', change: '+۱۲٪', color: 'from-[#C8A45C] to-[#A8883E]' },
              { label: 'خدمات', value: '۶', change: '+۲', color: 'from-blue-500 to-blue-600' },
              { label: 'پیام‌ها', value: '۱۲۴', change: '+۳۰٪', color: 'from-green-500 to-green-600' },
              { label: 'بازدید امروز', value: '۱,۲۴۰', change: '+۱۵٪', color: 'from-purple-500 to-purple-600' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06]">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                <div className="relative z-10">
                  <p className="text-white/40 text-sm">{stat.label}</p>
                  <p className="text-3xl font-black text-white mt-2">{stat.value}</p>
                  <span className="text-green-400/80 text-xs">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
