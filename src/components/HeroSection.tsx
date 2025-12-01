import React from 'react';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const HeroSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative min-h-screen pt-20 flex items-center justify-center overflow-hidden z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://i.imgur.com/UuCQ8Z5.png")'
        }}
      />
      
      {/* Floating Spice Elements with enhanced animations */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-saffron-400 rounded-full opacity-20 animate-float-slow blur-sm"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-spice-500 rounded-full opacity-20 animate-float-slow blur-sm" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-earth-400 rounded-full opacity-20 animate-float-slow blur-sm" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-10 w-8 h-8 bg-saffron-300 rounded-full opacity-15 animate-float-slow blur-sm" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-14 h-14 bg-spice-400 rounded-full opacity-15 animate-float-slow blur-sm" style={{ animationDelay: '2.5s' }}></div>
      
      {/* Content with staggered animations */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-4 sm:mb-6 text-shadow-lg animate-fade-in-up">
            Bahar Al Zafran
          </h1>
          <div className="text-xl sm:text-2xl md:text-4xl font-noto-kufi mb-6 sm:mb-8 text-saffron-200 arabic-text animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            مطحنة و اعشاب بحرالزعفران ش.ذ.م.م
          </div>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
            Traditional Supermarket & Grinding Mill in Dubai
          </p>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-gray-300 max-w-2xl mx-auto px-2 animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
            Bringing you the finest saffron, herbs, spices, and oils with authentic grinding services since generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-2 animate-fade-in-up" style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}>
            <Button
              onClick={() => scrollToSection('products')}
              size="lg"
              className="bg-saffron-600 hover:bg-saffron-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-[popOut_0.6s_ease-out] md:animate-none"
            >
              Explore Our Products
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-earth-600/90 hover:bg-earth-700 text-white border-2 border-earth-500/50 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-[popOut_0.8s_ease-out] md:animate-none backdrop-blur-sm"
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
