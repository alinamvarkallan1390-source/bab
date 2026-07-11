import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'اِتِرنال | استودیو معماری و ساخت',
  description: 'استودیو معماری، طراحی و ساخت پروژه‌های شاخص و فضاهای ماندگار؛ از کانسپت تا اجرای کامل.',
  keywords: ['معماری لوکس', 'ساخت ویلا', 'طراحی معماری', 'طراحی داخلی', 'ساختمان لوکس'],
  openGraph: {
    title: 'اِتِرنال | فرم، فراتر از تصور',
    description: 'معماری، طراحی و ساخت فضاهایی فراتر از زمان',
    locale: 'fa_IR', type: 'website', siteName: 'اِتِرنال',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head><meta name="theme-color" content="#080807" /><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" /></head>
      <body><ClientLayout>{children}</ClientLayout></body>
    </html>
  );
}
