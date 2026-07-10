'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiCalendarDays, HiClock } from 'react-icons/hi2';

const blogPosts = [
  {
    id: '1',
    title: 'راهنمای کامل بازسازی خانه قدیمی',
    excerpt: 'بازسازی خانه قدیمی می‌تواند چالش‌برانگیز باشد. در این مقاله نکات مهم برای بازسازی موفق را بررسی می‌کنیم.',
    category: 'بازسازی',
    author: 'مهندس علی محمدی',
    date: '۱۴۰۳/۰۴/۱۰',
    readingTime: '۸ دقیقه',
    image: '/images/blog-1.jpg',
  },
  {
    id: '2',
    title: 'ترندهای طراحی داخلی ۲۰۲۴',
    excerpt: 'با جدیدترین ترندهای طراحی داخلی آشنا شوید و خانه خود را مدرن کنید.',
    category: 'طراحی داخلی',
    author: 'مهندس سارا حسینی',
    date: '۱۴۰۳/۰۳/۲۵',
    readingTime: '۶ دقیقه',
    image: '/images/blog-2.jpg',
  },
  {
    id: '3',
    title: 'انتخاب مصالح مناسب برای ساختمان',
    excerpt: 'انتخاب مصالح با کیفیت یکی از مهمترین مراحل ساخت و ساز است. این راهنما به شما کمک می‌کند.',
    category: 'مصالح ساختمانی',
    author: 'مهندس رضا کریمی',
    date: '۱۴۰۳/۰۳/۱۵',
    readingTime: '۱۰ دقیقه',
    image: '/images/blog-3.jpg',
  },
  {
    id: '4',
    title: 'نورپردازی مدرن در معماری داخلی',
    excerpt: 'نورپردازی مناسب می‌تواند فضای خانه شما را متحول کند. با اصول نورپردازی مدرن آشنا شوید.',
    category: 'نورپردازی',
    author: 'مهندس مریم احمدی',
    date: '۱۴۰۳/۰۳/۰۱',
    readingTime: '۵ دقیقه',
    image: '/images/blog-4.jpg',
  },
  {
    id: '5',
    title: 'بازسازی آشپزخانه با بودجه محدود',
    excerpt: 'با بودجه محدود هم می‌توانید آشپزخانه‌ای زیبا و مدرن داشته باشید. این نکات را از دست ندهید.',
    category: 'آشپزخانه',
    author: 'مهندس علی محمدی',
    date: '۱۴۰۳/۰۲/۲۰',
    readingTime: '۷ دقیقه',
    image: '/images/blog-5.jpg',
  },
  {
    id: '6',
    title: 'معماری پایدار و ساختمان‌های سبز',
    excerpt: 'معماری پایدار آینده صنعت ساختمان است. با اصول ساختمان‌های سبز آشنا شوید.',
    category: 'معماری',
    author: 'مهندس سارا حسینی',
    date: '۱۴۰۳/۰۲/۱۰',
    readingTime: '۹ دقیقه',
    image: '/images/blog-6.jpg',
  },
];

const categories = ['همه', 'بازسازی', 'طراحی داخلی', 'معماری', 'مصالح ساختمانی', 'نورپردازی', 'آشپزخانه'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = React.useState('همه');

  const filteredPosts = activeCategory === 'همه'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <main className="pt-24" dir="rtl">
      {/* Page Header */}
      <section className="relative py-20 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #F5A623 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4"
          >
            وبلاگ <span className="text-gradient">تخصصی</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            جدیدترین مقالات و مطالب آموزشی در زمینه ساختمان و معماری
          </motion.p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding bg-lightgray">
        <div className="container mx-auto px-4 md:px-6">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-dark shadow-lg shadow-primary/25'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card bg-white overflow-hidden group"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-30">📝</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-lg bg-dark/80 backdrop-blur-sm text-white text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <HiCalendarDays />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiClock />
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                      {post.author[0]}
                    </span>
                    {post.author}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
