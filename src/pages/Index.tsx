import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProductsSection from '@/components/ProductsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import { useVisitorTracking } from '@/hooks/use-visitor-tracking';

const Index = () => {
  useVisitorTracking();
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-earth-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-playfair font-bold mb-2 gradient-text">
              Bahar Al Zafran
            </h3>
            <div className="text-lg font-amiri text-saffron-300 mb-4 arabic-text">
              مطحنة و اعشاب بحرالزعفران ش.ذ.م.م
            </div>
            <p className="text-earth-300 mb-4">
              Traditional Supermarket & Grinding Mill • Dubai, UAE
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-earth-400">
              <span>+971 4 285 7715</span>
              <span>+971 55 474 7065</span>
              <span>+971 55 907 4779</span>
            </div>
            <div className="mt-6 pt-6 border-t border-earth-700 text-sm text-earth-500">
              © 2024 Bahar Al Zafran. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
