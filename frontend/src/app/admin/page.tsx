'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API = '/api';
      const res = await axios.post(`${API}/auth/login`, form);
      if (res.data.success) {
        setUserData(res.data.data.user);
        setIsLoggedIn(true);
      }
    } catch (err: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(err) ? err.response?.data?.message : undefined;
      setError(message || 'خطا در ورود');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0B0B0B' }} dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4A843] to-[#B8922E] flex items-center justify-center text-2xl mx-auto mb-6">🏗️</div>
            <h2 className="text-2xl font-black text-white">پنل مدیریت</h2>
            <p className="text-white/30 text-sm mt-2">ساختمان‌سازی لوکس</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs text-white/40 mb-2 font-medium">ایمیل</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#D4A843]/50 transition-all outline-none text-sm"
                placeholder="admin@luxuryconst.com" required />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-2 font-medium">رمز عبور</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#D4A843]/50 transition-all outline-none text-sm"
                placeholder="••••••••" required />
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs text-center">
                ❌ {error}
              </motion.p>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-l from-[#D4A843] to-[#B8922E] text-black font-bold text-sm hover:shadow-lg hover:shadow-[#D4A843]/20 transition-all disabled:opacity-50">
              {loading ? 'در حال ورود...' : 'ورود به پنل مدیریت'}
            </button>

            <div className="text-center text-white/20 text-xs mt-4">
              <p>دمو: admin@luxuryconst.com / admin123</p>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0B0B0B' }} dir="rtl">
      <div className="flex">
        <aside className="w-72 bg-white/[0.02] border-l border-white/[0.06] p-6 fixed right-0 top-0 bottom-0 overflow-y-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="text-white font-bold text-sm">پنل مدیریت</h3>
              <p className="text-white/30 text-xs">خوش آمدی، {userData?.name}</p>
            </div>
          </div>
          {[
            { icon: '📊', label: 'داشبورد' },
            { icon: '🏗️', label: 'پروژه‌ها' },
            { icon: '📄', label: 'خدمات' },
            { icon: '✍️', label: 'وبلاگ' },
            { icon: '💬', label: 'نظرات' },
            { icon: '✉️', label: 'پیام‌ها' },
            { icon: '⚙️', label: 'تنظیمات' },
          ].map(item => (
            <button key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm mb-1">
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <button onClick={() => { setIsLoggedIn(false); setUserData(null); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/50 hover:text-red-400 hover:bg-red-500/5 transition-all text-sm mt-8">
            <span>🚪</span> خروج
          </button>
        </aside>

        <main className="flex-1 mr-72 p-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-white">داشبورد</h2>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/40 text-xs">متصل به API</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'پروژه‌ها', value: '۵۲۰', change: '+۱۲٪', color: 'from-[#D4A843] to-[#B8922E]' },
              { label: 'خدمات', value: '۶', change: '+۲', color: 'from-blue-500 to-blue-600' },
              { label: 'پیام‌ها', value: '۱۲۴', change: '+۳۰٪', color: 'from-green-500 to-green-600' },
              { label: 'بازدید', value: '۱,۲۴۰', change: '+۱۵٪', color: 'from-purple-500 to-purple-600' },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
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
