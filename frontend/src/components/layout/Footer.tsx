import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-new">
      <div className="container-wide footer-grid">
        <div><Link href="/" className="brand"><span className="brand-mark"><i /><i /></span><span><b>اِتِرنال</b><small>ETERNAL / ARCHITECTS</small></span></Link><p>استودیو معماری، طراحی و ساخت<br />برای فضاهایی فراتر از زمان.</p></div>
        <div><small>دفتر تهران</small><p>الهیه، خیابان فرشته<br />ساختمان شماره ۲۱</p></div>
        <div><small>تماس</small><a href="mailto:studio@eternal.arch">studio@eternal.arch</a><a href="tel:+982122647120">۰۲۱ ۲۲۶۴ ۷۱۲۰</a></div>
        <div><small>شبکه‌ها</small><a href="#">Instagram</a><a href="#">LinkedIn</a></div>
      </div>
      <div className="container-wide copyright"><span>© 2026 ETERNAL ARCHITECTS</span><span>TEHRAN / IRAN</span></div>
    </footer>
  );
}
