'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const BuildingScene = dynamic(() => import('@/components/three/BuildingScene'), { ssr: false });
const ProjectRoomScene = dynamic(() => import('@/components/three/ProjectRoomScene'), { ssr: false });
const ServiceBlueprintScene = dynamic(() => import('@/components/three/ServiceBlueprintScene'), { ssr: false });

const services = [
  { no: '01', title: 'معماری', en: 'ARCHITECTURE', lead: 'از زمین خام تا یک فرم ماندگار.', text: 'تحلیل سایت، کانسپت، طراحی فاز یک و دو و تمام اسناد اجرایی با یک vision یکپارچه.', tags: ['کانسپت', 'BIM', 'مدارک اجرایی'] },
  { no: '02', title: 'طراحی داخلی', en: 'INTERIOR', lead: 'فضایی که دقیقاً شبیه شماست.', text: 'نور، متریال و مبلمان سفارشی در کنار هم قرار می‌گیرند تا تجربه‌ای تکرارنشدنی بسازند.', tags: ['نورپردازی', 'متریال', 'مبلمان سفارشی'] },
  { no: '03', title: 'ساخت و اجرا', en: 'CONSTRUCTION', lead: 'کنترل کامل، از نقشه تا تحویل.', text: 'تیم اجرایی متخصص، کنترل روزانه کیفیت و گزارش شفاف زمان و هزینه در تمام مسیر.', tags: ['مدیریت پیمان', 'کنترل کیفیت', 'ضمانت اجرا'] },
  { no: '04', title: 'بازآفرینی', en: 'RENOVATION', lead: 'زندگی تازه برای ساختمان موجود.', text: 'ظرفیت‌های پنهان بنا را به فضایی معاصر و ارزشمند تبدیل می‌کنیم، بدون پاک کردن خاطره مکان.', tags: ['آسیب‌شناسی', 'تقویت سازه', 'بازطراحی'] },
];

const projects = [
  { id: '01', name: 'ویلای اُریب', en: 'OBLIQUE HOUSE', meta: 'لواسان / ۱۴۰۴', area: '۸۴۰ م²', text: 'خانه‌ای روی شیب طبیعی زمین؛ جایی که بتن، چوب و منظره در یک قاب پیوسته به هم می‌رسند.' },
  { id: '02', name: 'پنت‌هاوس نوآر', en: 'NOIR PENTHOUSE', meta: 'الهیه / ۱۴۰۴', area: '۴۶۰ م²', text: 'زندگی شهری با سطوح تیره، نور کنترل‌شده و چشم‌اندازی بی‌مرز از تهران.' },
  { id: '03', name: 'آتلیه‌ی خط', en: 'LINE ATELIER', meta: 'سعادت‌آباد / ۱۴۰۳', area: '۱۲۰۰ م²', text: 'فضای کاری منعطف که مرز میان تمرکز، تعامل و خلاقیت را از بین می‌برد.' },
  { id: '04', name: 'خانه‌ی مونو', en: 'MONO RESIDENCE', meta: 'نیاوران / ۱۴۰۳', area: '۳۲۰ م²', text: 'فضایی یکپارچه با جزئیات مینیمال؛ طراحی‌شده حول سکوت، نور و تناسب.' },
  { id: '05', name: 'دفتر اُربیت', en: 'ORBIT HQ', meta: 'جردن / ۱۴۰۲', area: '۲۴۰۰ م²', text: 'دفتر مرکزی آینده‌نگر با گردش آزاد، اتاق‌های شفاف و هویت متریال قدرتمند.' },
  { id: '06', name: 'سوئیت ترا', en: 'TERRA SUITE', meta: 'کیش / ۱۴۰۴', area: '۶۸۰ م²', text: 'سوئیتی آرام و حسی با الهام از رنگ خاک، بافت سنگ و نور گرم جنوب.' },
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const copyY = useTransform(scrollYProgress, [0, 0.6], [0, -110]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.48], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  return <section ref={ref} className="hero-shell" id="home"><div className="hero-sticky">
    <div className="hero-aura"/><motion.div className="scene-wrap" style={{scale:sceneScale}} aria-label="مدل سه‌بعدی تعاملی ساختمان"><BuildingScene scrollProgress={scrollYProgress}/></motion.div><div className="hero-grid-lines"/>
    <motion.div className="hero-copy" style={{y:copyY,opacity:copyOpacity}}><motion.div className="eyebrow" initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{delay:.3,duration:.8}}><span/> استودیو معماری و ساخت</motion.div><motion.h1 initial={{opacity:0,y:55}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:1,ease:[.16,1,.3,1]}}>فرم، فراتر<br/>از <em>تصور.</em></motion.h1><motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.65,duration:.8}}>ما صرفاً ساختمان نمی‌سازیم؛ تجربه‌هایی ماندگار از نور، ماده و فضا خلق می‌کنیم.</motion.p><motion.div className="hero-actions" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.85}}><Link href="/portfolio" className="button-bronze">مشاهده پروژه‌ها <b>↙</b></Link><Link href="/contact" className="text-link">شروع همکاری <span>←</span></Link></motion.div></motion.div>
    <div className="hero-index"><span>01</span><i/><span>04</span></div><div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i><motion.b style={{width:progressWidth}}/></i></div><div className="interaction-hint"><span className="mouse-icon"/> برای چرخش حرکت دهید</div>
  </div></section>;
}

function HomeServices() {
  const [active,setActive]=useState(0); const service=services[active];
  return <section className="home-services-v3" id="services"><div className="container-wide home-services-head"><div><div className="section-kicker">تخصص ما / ۰۲</div><h2>یک تیم.<br/><span>تمام مسیر.</span></h2></div><p>طراحی و ساخت را از هم جدا نمی‌کنیم؛ چون بهترین نتیجه زمانی شکل می‌گیرد که همه‌چیز از ابتدا با یک نگاه هدایت شود.</p></div>
   <div className="home-service-stage"><div className="home-service-canvas"><ServiceBlueprintScene/></div><div className="home-service-grid"/><div className="home-service-panel"><AnimatePresence mode="wait"><motion.div key={active} initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-14}}><span>{service.no} / {service.en}</span><h3>{service.title}</h3><h4>{service.lead}</h4><p>{service.text}</p><div>{service.tags.map(tag=><small key={tag}>{tag}</small>)}</div></motion.div></AnimatePresence><Link href="/services">مشاهده تمام خدمات <b>↙</b></Link></div><div className="home-service-tabs">{services.map((s,i)=><button key={s.no} onClick={()=>setActive(i)} className={active===i?'active':''}><span>{s.no}</span><b>{s.title}</b><i/></button>)}</div><div className="home-3d-label"><i/> INTERACTIVE BLUEPRINT</div></div>
  </section>;
}

function HomeProjects() {
  const [active,setActive]=useState(0); const project=projects[active];
  return <section className="home-projects-v3" id="projects"><div className="container-wide home-projects-head"><div><div className="section-kicker">پروژه‌های منتخب / ۰۳</div><h2>وارد فضا<br/><span>شوید.</span></h2></div><p>هر پروژه یک فضای داخلی سه‌بعدی اختصاصی دارد. با موس بچرخانید، از نزدیک ببینید و پروژه بعدی را انتخاب کنید.</p></div>
    <div className="home-room-stage"><div className="home-room-canvas"><AnimatePresence mode="wait"><motion.div key={active} initial={{opacity:0,scale:1.04}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.65}}><ProjectRoomScene project={active}/></motion.div></AnimatePresence></div><div className="home-room-shade"/><div className="room-live"><i/> LIVE 3D INTERIOR</div>
      <AnimatePresence mode="wait"><motion.div className="home-room-info" key={active} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}><span>{project.id} / {project.en}</span><h3>{project.name}</h3><p>{project.text}</p><div><b>{project.meta}</b><b>{project.area}</b></div><Link href="/portfolio">مشاهده پرونده پروژه <i>↙</i></Link></motion.div></AnimatePresence>
      <div className="room-drag"><i/> DRAG TO EXPLORE</div><div className="home-project-tabs">{projects.map((p,i)=><button key={p.id} className={active===i?'active':''} onClick={()=>setActive(i)}><span>{p.id}</span><div><b>{p.name}</b><small>{p.meta}</small></div><i/></button>)}</div>
    </div>
  </section>;
}

export default function HomePage(){return <main><Hero/>
 <section className="manifesto section-space"><div className="container-wide"><motion.div className="section-kicker" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>فلسفه‌ی ما / ۰۱</motion.div><motion.h2 initial={{opacity:0,y:45}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-15%'}} transition={{duration:.9}}>معماری وقتی ماندگار می‌شود که<br/>هر خط، <span>دلیلی برای بودن</span> داشته باشد.</motion.h2><div className="manifesto-bottom"><div className="coordinates">35.7219° N<br/>51.3347° E</div><p>از نخستین اسکیس تا آخرین قطعه، زیبایی‌شناسی و مهندسی را به یک زبان مشترک تبدیل می‌کنیم. نتیجه، فضایی است که هم دیده می‌شود و هم احساس.</p><div className="seal"><span>۱۵+</span><small>سال خلق<br/>فضاهای ماندگار</small></div></div></div></section>
 <HomeServices/><HomeProjects/>
 <section className="process section-space"><div className="container-wide process-grid"><div className="process-title"><div className="section-kicker">فرآیند / ۰۴</div><h2>شفاف در مسیر.<br/><span>بی‌نقص در نتیجه.</span></h2></div><div className="steps">{['کشف و شناخت','کانسپت و طراحی','مهندسی و اجرا','تحویل و همراهی'].map((name,index)=><div key={name}><b>0{index+1}</b><span>{name}</span><i/></div>)}</div></div></section>
 <section className="final-cta"><div className="cta-orbit"/><div className="container-wide"><div className="section-kicker">پروژه بعدی / ۰۵</div><motion.h2 initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>بیایید چیزی<br/><em>بی‌سابقه</em> بسازیم.</motion.h2><Link href="/contact" className="round-link">شروع گفتگو <span>↙</span></Link></div></section>
 </main>}
