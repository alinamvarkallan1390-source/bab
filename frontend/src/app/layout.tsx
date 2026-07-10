import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'ساختمان‌سازی لوکس | طراحی، ساخت و بازسازی ساختمان',
  description: 'شرکت ساختمان‌سازی لوکس با بیش از ۱۵ سال تجربه در زمینه طراحی، ساخت و بازسازی ساختمان‌های لوکس. ارائه خدمات معماری، طراحی داخلی و نما.',
  keywords: ['ساختمان‌سازی', 'بازسازی ساختمان', 'طراحی داخلی', 'معماری', 'ویلا', 'آپارتمان', 'نوسازی', 'دکوراسیون'],
  openGraph: {
    title: 'ساختمان‌سازی لوکس | معماری فردا، امروز ساخته می‌شود',
    description: 'شرکت ساختمانی لوکس با بیش از ۱۵ سال تجربه',
    locale: 'fa_IR',
    type: 'website',
    siteName: 'ساختمان‌سازی لوکس',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏗️</text></svg>" />
        <meta name="theme-color" content="#C8A45C" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
