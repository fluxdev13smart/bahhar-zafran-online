
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://i.imgur.com/UuCQ8Z5.png")'
        }}
      />
      
      {/* Floating Spice Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-saffron-400 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-spice-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-earth-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-shadow-lg">
            Bahar Al Zafran
          </h1>
          <div className="text-2xl md:text-4xl font-noto-kufi mb-8 text-saffron-200 arabic-text">
            مطحنة و اعشاب بحرالزعفران ش.ذ.م.م
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Traditional Supermarket & Grinding Mill in Dubai
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Bringing you the finest saffron, herbs, spices, and oils with authentic grinding services since generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('products')}
              size="lg"
              className="bg-saffron-600 hover:bg-saffron-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Products
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-earth-600 hover:bg-earth-700 text-white border-2 border-earth-500 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Visit Our Store
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
