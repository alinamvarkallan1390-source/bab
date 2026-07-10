'use client';

import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import LoadingScreen from '@/components/animations/LoadingScreen';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import FloatingContact from '@/components/ui/FloatingContact';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <ThemeProvider>
        <LoadingScreen />
        <div id="app-content">
          <CustomCursor />
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingContact />
        </div>
      </ThemeProvider>
    </LoadingProvider>
  );
}
