import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Home, Info, ShoppingBag, Settings, MapPin, Package } from 'lucide-react';

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
                className="text-foreground px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full backdrop-blur-xl bg-background/40 border border-border/30 shadow-sm hover:bg-background/60 hover:shadow-md hover:border-border/50 flex items-center gap-2"
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
            <label className="hamburger">
              <input 
                type="checkbox" 
                checked={isMenuOpen}
                onChange={() => setIsMenuOpen(!isMenuOpen)}
              />
              <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-50 p-4">
            <div id="navbody" className="backdrop-blur-2xl bg-background/20 border border-border/30 rounded-2xl shadow-xl">
              <form>
                <ul className="ul">
                  <input 
                    checked={activeSection === 'home'}
                    name="rad" 
                    className="radio" 
                    id="choose1" 
                    type="radio" 
                    onChange={() => scrollToSection('home')}
                  />
                  <label htmlFor="choose1">
                    <li className="li">
                      <div className="svg">
                        <Home className="w-5 h-5" />
                        <span className="text">Home</span>
                      </div>
                    </li>
                  </label>
                  
                  <input 
                    checked={activeSection === 'about'}
                    className="radio" 
                    name="rad" 
                    id="choose2" 
                    type="radio"
                    onChange={() => scrollToSection('about')}
                  />
                  <label htmlFor="choose2">
                    <li className="li">
                      <div className="svg">
                        <Info className="w-5 h-5" />
                        <span className="text">About</span>
                      </div>
                    </li>
                  </label>
                  
                  <input 
                    checked={activeSection === 'services'}
                    className="radio" 
                    name="rad" 
                    id="choose3" 
                    type="radio"
                    onChange={() => scrollToSection('services')}
                  />
                  <label htmlFor="choose3">
                    <li className="li">
                      <div className="svg">
                        <Settings className="w-5 h-5" />
                        <span className="text">Services</span>
                      </div>
                    </li>
                  </label>
                  
                  <input 
                    checked={activeSection === 'contact'}
                    className="radio" 
                    name="rad" 
                    id="choose4" 
                    type="radio"
                    onChange={() => scrollToSection('contact')}
                  />
                  <label htmlFor="choose4">
                    <li className="li">
                      <div className="svg">
                        <Phone className="w-5 h-5" />
                        <span className="text">Contact</span>
                      </div>
                    </li>
                  </label>
                  
                  <input 
                    checked={activeSection === 'location'}
                    className="radio" 
                    name="rad" 
                    id="choose5" 
                    type="radio"
                    onChange={() => {
                      const headings = Array.from(document.querySelectorAll('h3'));
                      const element = headings.find(h => h.textContent?.includes('Ready to Experience Authentic Spices?'));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                      setActiveSection('location');
                      setIsMenuOpen(false);
                    }}
                  />
                  <label htmlFor="choose5">
                    <li className="li">
                      <div className="svg">
                        <MapPin className="w-5 h-5" />
                        <span className="text">Location</span>
                      </div>
                    </li>
                  </label>
                </ul>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
