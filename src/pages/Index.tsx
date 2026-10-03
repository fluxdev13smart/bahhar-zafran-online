import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProductsSection from '@/components/ProductsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <footer className="relative z-10 border-t border-border py-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-playfair text-2xl font-bold gold-text">Bahar Al Zafran</h2>
              <div className="mt-1 font-noto-kufi text-sm text-muted-foreground arabic-text">
                مطحنة و اعشاب بحرالزعفران ش.ذ.م.م
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Traditional supermarket & grinding mill · Dubai, UAE
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground tabular-nums">
              <span>+971 4 285 7715</span>
              <span>+971 55 474 7065</span>
              <span>+971 55 907 4779</span>
            </div>
          </div>
          <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bahar Al Zafran. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
