'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineBuildingOffice2, HiOutlineDocumentText, HiOutlineUserGroup,
  HiOutlineEnvelope, HiOutlinePhoto, HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle, HiOutlineChartBar
} from 'react-icons/hi2';

const adminMenu = [
  { icon: HiOutlineChartBar, label: 'داشبورد', id: 'dashboard' },
  { icon: HiOutlineBuildingOffice2, label: 'پروژه‌ها', id: 'projects' },
  { icon: HiOutlineDocumentText, label: 'خدمات', id: 'services' },
  { icon: HiOutlineDocumentText, label: 'وبلاگ', id: 'blog' },
  { icon: HiOutlineUserGroup, label: 'نظرات', id: 'testimonials' },
  { icon: HiOutlineEnvelope, label: 'پیام‌ها', id: 'messages' },
  { icon: HiOutlinePhoto, label: 'مدیریت رسانه', id: 'media' },
  { icon: HiOutlineCog6Tooth, label: 'تنظیمات', id: 'settings' },
];

const statsCards = [
  { label: 'پروژه‌ها', value: '۵۲۰', change: '+۱۲٪', color: 'from-primary to-orange-500' },
  { label: 'خدمات', value: '۶', change: '+۲', color: 'from-blue-500 to-cyan-500' },
  { label: 'پیام‌ها', value: '۱۲۴', change: '+۳۰٪', color: 'from-green-500 to-emerald-500' },
  { label: 'بازدید امروز', value: '۱,۲۴۰', change: '+۱۵٪', color: 'from-purple-500 to-pink-500' },
];

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-4" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <span className="text-4xl">🏗️</span>
            <h2 className="text-2xl font-bold text-white mt-4">پنل مدیریت</h2>
            <p className="text-gray-400 text-sm mt-1">ساختمان‌سازی لوکس</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">ایمیل</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary transition-colors outline-none"
                placeholder="admin@luxuryconst.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">رمز عبور</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary transition-colors outline-none"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center mt-6">
              ورود به پنل مدیریت
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-72 bg-white/5 backdrop-blur-xl border-l border-white/10 p-6 fixed right-0 top-0 bottom-0 z-30 overflow-y-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-3xl">🏗️</span>
          <div>
            <h3 className="text-white font-bold">پنل مدیریت</h3>
            <p className="text-gray-500 text-xs">مدیریت محتوا</p>
          </div>
        </div>

        <nav className="space-y-2">
          {adminMenu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  activeSection === item.id
                    ? 'bg-primary text-dark font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="text-xl" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-8"
        >
          <HiOutlineArrowRightOnRectangle className="text-xl" />
          <span className="text-sm">خروج</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-72 p-8">
        {/* Dashboard */}
        {activeSection === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">داشبورد</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
                  <div className="relative z-10">
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                    <span className="text-green-400 text-sm">{stat.change} نسبت به ماه قبل</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">دسترسی سریع</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['افزودن پروژه', 'ایجاد مطلب', 'مدیریت رسانه', 'تنظیمات سئو'].map((action) => (
                  <button
                    key={action}
                    className="p-4 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 text-gray-300 hover:text-primary transition-all text-sm"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other sections placeholder */}
        {activeSection !== 'dashboard' && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <span className="text-6xl block mb-4">🚧</span>
              <h3 className="text-2xl font-bold text-white mb-2">
                بخش {adminMenu.find(m => m.id === activeSection)?.label}
              </h3>
              <p className="text-gray-400">در حال توسعه</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
