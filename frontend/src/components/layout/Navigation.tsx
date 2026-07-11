'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const items = [
  { label: 'پروژه‌ها', href: '/portfolio' },
  { label: 'خدمات', href: '/services' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس', href: '/contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`main-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <Link href="/" className="brand" aria-label="صفحه اصلی"><span className="brand-mark"><i /><i /></span><span><b>اِتِرنال</b><small>ETERNAL / ARCHITECTS</small></span></Link>
      <nav>{items.map(item => <Link className={pathname === item.href ? 'active' : ''} key={item.href} href={item.href}>{item.label}</Link>)}</nav>
      <Link href="/contact" className="nav-cta"><span>درخواست مشاوره</span><b>↙</b></Link>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="منو"><i /><i /></button>
      <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>{items.map((item, i) => <motion.div key={item.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .06 }}><Link href={item.href} onClick={() => setOpen(false)}>{item.label}<span>0{i + 1}</span></Link></motion.div>)}</motion.div>}</AnimatePresence>
    </header>
  );
}
