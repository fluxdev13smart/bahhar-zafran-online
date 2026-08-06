import React, { useEffect, useState } from 'react';
import { Phone, Home, Info, Package, Settings, MapPin } from 'lucide-react';

const links = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: Info },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'services', label: 'Services', icon: Settings },
  { id: 'contact', label: 'Contact', icon: Phone },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav
          className={`pointer-events-auto mt-3 flex items-center justify-between gap-3 rounded-full pl-5 pr-2 py-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? 'glass-strong' : 'glass'
          }`}
        >
          <button
            onClick={() => scrollToSection('home')}
            className="press text-left leading-tight"
            aria-label="Bahar Al Zafran — back to top"
          >
            <span className="block font-playfair text-base sm:text-lg font-bold gold-text">
              Bahar Al Zafran
            </span>
            <span className="block font-noto-kufi text-[10px] text-muted-foreground arabic-text">
              مطحنة و اعشاب بحرالزعفران
            </span>
          </button>

          {/* Desktop segmented control */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-border bg-background/40 p-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`press relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-primary-foreground'
                    : 'text-foreground/75 hover:text-foreground'
                }`}
              >
                {activeSection === link.id && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--gradient-gold)' }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open('tel:+971 4 285 7715', '_self')}
              className="press hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground"
              style={{ background: 'var(--gradient-gold)' }}
            >
              <Phone className="w-4 h-4" />
              Call
            </button>

            {/* Mobile menu toggle */}
            <label className="hamburger md:hidden pr-1" aria-label="Toggle menu">
              <input
                type="checkbox"
                checked={isMenuOpen}
                onChange={() => setIsMenuOpen(!isMenuOpen)}
              />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                />
                <path className="line" d="M7 16 27 16" />
              </svg>
            </label>
          </div>
        </nav>

        {/* Mobile sheet */}
        <div
          className={`pointer-events-auto md:hidden origin-top transform-gpu overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMenuOpen
              ? 'opacity-100 translate-y-0 scale-100 mt-3'
              : 'opacity-0 -translate-y-2 scale-[0.97] mt-0 pointer-events-none'
          }`}
          style={{ maxHeight: isMenuOpen ? '30rem' : '0rem' }}
          aria-hidden={!isMenuOpen}
        >
          <ul className="glass-strong rounded-[1.75rem] p-2">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`press flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-medium transition-colors duration-300 ${
                    activeSection === link.id
                      ? 'text-primary-foreground'
                      : 'text-foreground/85 hover:bg-background/40'
                  }`}
                  style={
                    activeSection === link.id
                      ? { background: 'var(--gradient-gold)' }
                      : undefined
                  }
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() =>
                  window.open('https://maps.app.goo.gl/2r8qcDyauneKaFi47', '_blank')
                }
                className="press flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-medium text-foreground/85 hover:bg-background/40"
              >
                <MapPin className="w-5 h-5" />
                Directions
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
