'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

const ProjectRoomScene = dynamic(() => import('@/components/three/ProjectRoomScene'), { ssr:false });

const projects = [
 {id:'01',name:'ویلای اُریب',en:'OBLIQUE HOUSE',type:'ویلا',location:'لواسان',year:'۱۴۰۴',area:'۸۴۰ مترمربع',status:'اجرا شده',desc:'خانه‌ای روی شیب طبیعی زمین؛ جایی که بتن، چوب و منظره در یک قاب پیوسته به هم می‌رسند.',tone:'warm'},
 {id:'02',name:'پنت‌هاوس نوآر',en:'NOIR PENTHOUSE',type:'مسکونی',location:'الهیه',year:'۱۴۰۴',area:'۴۶۰ مترمربع',status:'اجرا شده',desc:'بازتعریف زندگی شهری با سطوح تیره، نور کنترل‌شده و چشم‌اندازی بی‌مرز از تهران.',tone:'noir'},
 {id:'03',name:'آتلیه‌ی خط',en:'LINE ATELIER',type:'اداری',location:'سعادت‌آباد',year:'۱۴۰۳',area:'۱۲۰۰ مترمربع',status:'منتخب مسابقه',desc:'یک فضای کار منعطف که مرز میان تمرکز، تعامل و خلاقیت را از بین می‌برد.',tone:'stone'},
 {id:'04',name:'خانه‌ی مونو',en:'MONO RESIDENCE',type:'مسکونی',location:'نیاوران',year:'۱۴۰۳',area:'۳۲۰ مترمربع',status:'اجرا شده',desc:'فضایی یکپارچه با جزئیات مینیمال؛ طراحی شده حول سکوت، نور و تناسب.',tone:'copper'},
 {id:'05',name:'دفتر اُربیت',en:'ORBIT HQ',type:'اداری',location:'جردن',year:'۱۴۰۲',area:'۲۴۰۰ مترمربع',status:'اجرا شده',desc:'دفتر مرکزی آینده‌نگر با گردش آزاد، اتاق‌های شفاف و هویت متریال قدرتمند.',tone:'steel'},
 {id:'06',name:'سوئیت ترا',en:'TERRA SUITE',type:'هتلی',location:'کیش',year:'۱۴۰۴',area:'۶۸۰ مترمربع',status:'در حال اجرا',desc:'سوئیتی آرام و حسی با الهام از رنگ خاک، بافت سنگ و نور گرم جنوب.',tone:'terra'},
];
const categories=['همه','ویلا','مسکونی','اداری','هتلی'];

export default function PortfolioPage(){
 const [category,setCategory]=useState('همه'); const [selected,setSelected]=useState(0);
 const filtered=useMemo(()=>projects.map((p,index)=>({...p,index})).filter(p=>category==='همه'||p.type===category),[category]);
 const project=projects[selected];
 return <main className="portfolio-page" dir="rtl">
   <section className="portfolio-hero">
    <div className="portfolio-noise"/><div className="portfolio-copy container-wide">
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="section-kicker">آرشیو پروژه‌ها / ۲۰۲۶</motion.div>
      <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.9}}>فضاهایی برای<br/><em>زیستن.</em></motion.h1>
      <p>هر پروژه نتیجه‌ی گفت‌وگویی دقیق میان انسان، سایت و ماده است.</p>
    </div>
    <div className="portfolio-scroll">EXPLORE THE ARCHIVE <i/></div>
   </section>

   <section className="project-experience">
    <div className="project-stage">
      <div className="stage-canvas"><AnimatePresence mode="wait"><motion.div key={selected} initial={{opacity:0,scale:1.035}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:.65}}><ProjectRoomScene project={selected}/></motion.div></AnimatePresence></div>
      <div className="stage-vignette"/>
      <div className="stage-top"><span>INTERACTIVE INTERIOR</span><span className="live-dot">LIVE 3D</span></div>
      <AnimatePresence mode="wait"><motion.div key={selected} className="stage-info" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}}>
        <span>{project.id} / {project.en}</span><h2>{project.name}</h2><p>{project.desc}</p>
        <div className="project-specs"><div><small>موقعیت</small><b>{project.location}</b></div><div><small>مساحت</small><b>{project.area}</b></div><div><small>سال</small><b>{project.year}</b></div></div>
      </motion.div></AnimatePresence>
      <div className="stage-controls"><button onClick={()=>setSelected((selected+projects.length-1)%projects.length)}>→</button><span>{String(selected+1).padStart(2,'0')} <i/> {String(projects.length).padStart(2,'0')}</span><button onClick={()=>setSelected((selected+1)%projects.length)}>←</button></div>
      <div className="drag-hint"><i/> با موس در فضا حرکت کنید</div>
    </div>
   </section>

   <section className="project-archive section-space"><div className="container-wide">
    <div className="archive-head"><div><div className="section-kicker">فهرست کامل / ۰۲</div><h2>پروژه‌های<br/><span>منتخب.</span></h2></div><div className="archive-filters">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'active':''}>{c}</button>)}</div></div>
    <motion.div layout className="archive-grid"><AnimatePresence>{filtered.map((p,order)=><motion.button layout key={p.id} className={`archive-card ${p.tone}`} onClick={()=>{setSelected(p.index);window.scrollTo({top:window.innerHeight*.9,behavior:'smooth'})}} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.94}} transition={{delay:order*.05}}>
      <div className="mini-room"><div className="mini-wall"/><div className="mini-window"/><div className="mini-sofa"><i/><i/><i/></div><div className="mini-light"/><span>{p.id}</span><b>مشاهده سه‌بعدی ↙</b></div>
      <div className="archive-meta"><div><small>{p.en}</small><h3>{p.name}</h3></div><div><span>{p.type}</span><span>{p.location}، {p.year}</span></div></div>
    </motion.button>)}</AnimatePresence></motion.div>
   </div></section>

   <section className="portfolio-cta"><div className="container-wide"><p>پروژه‌ی بعدی می‌تواند متعلق به شما باشد.</p><h2>یک ایده دارید؟<br/><em>با هم واقعی‌اش کنیم.</em></h2><Link href="/contact" className="round-link">شروع گفتگو <span>↙</span></Link></div></section>
 </main>
}
