import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'ساختمان‌سازی لوکس | طراحی، ساخت و بازسازی ساختمان',
  description: 'شرکت ساختمان‌سازی لوکس با بیش از ۱۵ سال تجربه در زمینه طراحی، ساخت و بازسازی ساختمان‌های لوکس. ارائه خدمات معماری، طراحی داخلی و نما.',
  keywords: ['ساختمان‌سازی', 'بازسازی ساختمان', 'طراحی داخلی', 'معماری', 'ویلا', 'آپارتمان', 'نوسازی', 'دکوراسیون'],
  openGraph: {
    title: 'ساختمان‌سازی لوکس',
    description: 'معماری فردا، امروز ساخته می‌شود',
    locale: 'fa_IR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'schema.org': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ConstructionBusiness',
      'name': 'ساختمان‌سازی لوکس',
      'description': 'شرکت ساختمانی لوکس',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Tehran',
        'addressCountry': 'IR',
      },
      'telephone': '021-12345678',
      'email': 'info@luxuryconst.com',
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#F5A623" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
