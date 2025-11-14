import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Home, Info, Settings, MapPin, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-2xl border-b border-border/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-playfair font-bold">
              <span className="gradient-text">Bahar Al Zafran</span>
            </h1>
            <p className="text-xs text-secondary arabic-text mt-1">
              مطحنة و اعشاب بحرالزعفران
            </p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-3">
              <button
                onClick={() => scrollToSection('home')}
                className="text-foreground px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full backdrop-blur-xl bg-background/40 border border-border/30 shadow-sm hover:bg-background/60 hover:shadow-md hover:border-border/50"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-foreground px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full backdrop-blur-xl bg-background/40 border border-border/30 shadow-sm hover:bg-background/60 hover:shadow-md hover:border-border/50"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-foreground px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full backdrop-blur-xl bg-background/40 border border-border/30 shadow-sm hover:bg-background/60 hover:shadow-md hover:border-border/50"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-foreground px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full backdrop-blur-xl bg-background/40 border border-border/30 shadow-sm hover:bg-background/60 hover:shadow-md hover:border-border/50"
              >
                Contact
              </button>
              <button
                onClick={() => {
                  const headings = Array.from(document.querySelectorAll('h3'));
                  const element = headings.find(h => h.textContent?.includes('Ready to Experience Authentic Spices?'));
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="text-foreground px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full backdrop-blur-xl bg-background/40 border border-border/30 shadow-sm hover:bg-background/60 hover:shadow-md hover:border-border/50 inline-flex items-center justify-center"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center">
            <Button
              onClick={() => scrollToSection('contact')}
              className="backdrop-blur-xl bg-primary/90 hover:bg-primary text-primary-foreground flex items-center gap-2 rounded-full border border-primary/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
          </div>
          
          {/* Tablet Contact Button - Compact */}
          <div className="hidden md:flex lg:hidden items-center">
            <Button
              onClick={() => scrollToSection('contact')}
              size="sm"
              className="backdrop-blur-xl bg-primary/90 hover:bg-primary text-primary-foreground flex items-center gap-1 rounded-full border border-primary/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Call
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-foreground hover:text-primary hover:bg-background/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300 backdrop-blur-xl bg-background/40 border border-border/30"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile menu - Slide in from right */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full backdrop-blur-2xl bg-background/95 border-l border-border/30 shadow-2xl flex flex-col">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-4 border-b border-border/30">
            <h2 className="text-xl font-playfair font-bold gradient-text">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-background/60 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile menu items */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 flex items-center gap-3 ${
                  activeSection === 'home'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-foreground hover:bg-background/60 border border-transparent'
                }`}
              >
                <Home className="w-5 h-5" />
                Home
              </button>

              <button
                onClick={() => scrollToSection('about')}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 flex items-center gap-3 ${
                  activeSection === 'about'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-foreground hover:bg-background/60 border border-transparent'
                }`}
              >
                <Info className="w-5 h-5" />
                About Us
              </button>

              <button
                onClick={() => scrollToSection('services')}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 flex items-center gap-3 ${
                  activeSection === 'services'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-foreground hover:bg-background/60 border border-transparent'
                }`}
              >
                <Settings className="w-5 h-5" />
                Services
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 flex items-center gap-3 ${
                  activeSection === 'contact'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-foreground hover:bg-background/60 border border-transparent'
                }`}
              >
                <Phone className="w-5 h-5" />
                Contact
              </button>

              <button
                onClick={() => {
                  const headings = Array.from(document.querySelectorAll('h3'));
                  const element = headings.find(h => h.textContent?.includes('Ready to Experience Authentic Spices?'));
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 flex items-center gap-3 text-foreground hover:bg-background/60 border border-transparent"
              >
                <MapPin className="w-5 h-5" />
                Location
              </button>
            </div>
          </div>

          {/* Mobile menu footer */}
          <div className="p-4 border-t border-border/30">
            <Button
              onClick={() => scrollToSection('contact')}
              className="w-full backdrop-blur-xl bg-primary/90 hover:bg-primary text-primary-foreground rounded-full shadow-lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
