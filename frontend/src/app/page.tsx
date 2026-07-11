'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const BuildingScene = dynamic(() => import('@/components/three/BuildingScene'), { ssr: false });

const services = [
  { no: '01', title: 'معماری و طراحی', en: 'ARCHITECTURE', text: 'کانسپت‌های جسورانه، نقشه‌های دقیق و طراحی‌هایی که از زمان خود جلوترند.' },
  { no: '02', title: 'ساخت یکپارچه', en: 'CONSTRUCTION', text: 'مدیریت کامل اجرا با تیم‌های تخصصی، فناوری روز و کنترل کیفیت بی‌وقفه.' },
  { no: '03', title: 'فضای داخلی', en: 'INTERIORS', text: 'فضاهای شخصی‌سازی‌شده با متریال کمیاب، نورپردازی هنرمندانه و جزئیات بی‌نقص.' },
];

const projects = [
  { name: 'خانه‌ی اُریب', meta: 'لواسان / ۱۴۰۴', className: 'project-one' },
  { name: 'برج مونو', meta: 'تهران / ۱۴۰۳', className: 'project-two' },
  { name: 'ویلای سکوت', meta: 'مازندران / ۱۴۰۴', className: 'project-three' },
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const copyY = useTransform(scrollYProgress, [0, 0.6], [0, -110]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.48], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} className="hero-shell" id="home">
      <div className="hero-sticky">
        <div className="hero-aura" />
        <motion.div className="scene-wrap" style={{ scale: sceneScale }} aria-label="مدل سه‌بعدی تعاملی ساختمان">
          <BuildingScene scrollProgress={scrollYProgress} />
        </motion.div>
        <div className="hero-grid-lines" />
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div className="eyebrow" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <span /> استودیو معماری و ساخت
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            فرم، فراتر<br />از <em>تصور.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.8 }}>
            ما صرفاً ساختمان نمی‌سازیم؛ تجربه‌هایی ماندگار از نور، ماده و فضا خلق می‌کنیم.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
            <Link href="/portfolio" className="button-bronze">مشاهده پروژه‌ها <b>↙</b></Link>
            <Link href="/contact" className="text-link">شروع همکاری <span>←</span></Link>
          </motion.div>
        </motion.div>
        <div className="hero-index"><span>01</span><i /><span>04</span></div>
        <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i><motion.b style={{ width: progressWidth }} /></i></div>
        <div className="interaction-hint"><span className="mouse-icon" /> برای چرخش حرکت دهید</div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="manifesto section-space">
        <div className="container-wide">
          <motion.div className="section-kicker" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>فلسفه‌ی ما / ۰۱</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.9 }}>
            معماری وقتی ماندگار می‌شود که<br />هر خط، <span>دلیلی برای بودن</span> داشته باشد.
          </motion.h2>
          <div className="manifesto-bottom">
            <div className="coordinates">35.7219° N<br />51.3347° E</div>
            <p>از نخستین اسکیس تا آخرین قطعه، زیبایی‌شناسی و مهندسی را به یک زبان مشترک تبدیل می‌کنیم. نتیجه، فضایی است که هم دیده می‌شود و هم احساس.</p>
            <div className="seal"><span>۱۵+</span><small>سال خلق<br />فضاهای ماندگار</small></div>
          </div>
        </div>
      </section>

      <section className="services-new section-space" id="services">
        <div className="container-wide">
          <div className="split-heading">
            <div><div className="section-kicker">تخصص ما / ۰۲</div><h2>از ایده تا<br /><span>اثر نهایی.</span></h2></div>
            <p>یک مسیر یکپارچه برای پروژه‌هایی که هیچ جزئی از آن‌ها معمولی نیست.</p>
          </div>
          <div className="service-list">
            {services.map((item, index) => (
              <motion.article key={item.no} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <span className="service-no">{item.no}</span>
                <div><small>{item.en}</small><h3>{item.title}</h3></div>
                <p>{item.text}</p>
                <Link href="/services" aria-label={item.title}>↙</Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-new section-space" id="projects">
        <div className="container-wide">
          <div className="split-heading projects-heading">
            <div><div className="section-kicker">گزیده پروژه‌ها / ۰۳</div><h2>ساخته‌شده برای<br /><span>ماندن.</span></h2></div>
            <Link className="text-link" href="/portfolio">همه پروژه‌ها <span>←</span></Link>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <motion.article key={project.name} className={project.className} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.8, delay: index * 0.12 }}>
                <div className="project-visual"><div className="abstract-building"><i /><i /><i /><i /><i /></div><span className="project-number">0{index + 1}</span></div>
                <div className="project-info"><h3>{project.name}</h3><span>{project.meta}</span></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="process section-space">
        <div className="container-wide process-grid">
          <div className="process-title"><div className="section-kicker">فرآیند / ۰۴</div><h2>شفاف در مسیر.<br /><span>بی‌نقص در نتیجه.</span></h2></div>
          <div className="steps">
            {['کشف و شناخت', 'کانسپت و طراحی', 'مهندسی و اجرا', 'تحویل و همراهی'].map((name, index) => <div key={name}><b>0{index + 1}</b><span>{name}</span><i /></div>)}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-orbit" />
        <div className="container-wide">
          <div className="section-kicker">پروژه بعدی / ۰۵</div>
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>بیایید چیزی<br /><em>بی‌سابقه</em> بسازیم.</motion.h2>
          <Link href="/contact" className="round-link">شروع گفتگو <span>↙</span></Link>
        </div>
      </section>
    </main>
  );
}
