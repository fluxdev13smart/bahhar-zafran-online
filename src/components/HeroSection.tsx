import React from 'react';
import { ArrowDown, MapPin } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
};

const HeroSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section
      id="home"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-[100svh] flex items-end overflow-hidden z-10"
    >
      {/* Background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: 'url("https://i.imgur.com/UuCQ8Z5.png")' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(24 28% 5% / 0.72) 0%, hsl(24 28% 5% / 0.45) 40%, hsl(24 28% 5% / 0.96) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'var(--gradient-veil)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pb-20 pt-36 sm:pb-28">
        <div className={`reveal ${isVisible ? 'reveal-in' : ''}`}>
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm text-primary/90">
            <MapPin className="w-3.5 h-3.5" />
            Dubai, United Arab Emirates
          </div>

          <h1 className="mt-6 font-playfair font-bold display-tight text-[clamp(2.75rem,9vw,6.5rem)]">
            <span className="gold-text">Bahar Al Zafran</span>
          </h1>

          <div className="mt-3 font-noto-kufi text-[clamp(1.05rem,3.4vw,2rem)] text-foreground/80 arabic-text max-w-2xl ml-auto sm:ml-0 sm:mr-auto sm:text-left sm:[direction:rtl]">
            مطحنة و اعشاب بحرالزعفران ش.ذ.م.م
          </div>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            A traditional supermarket and stone grinding mill. Saffron, herbs, spices and
            pure oils — ground fresh, the way it has always been done.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:items-center">
            <button
              onClick={() => scrollToSection('products')}
              className="press inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-primary-foreground"
              style={{ background: 'var(--gradient-gold)', boxShadow: 'var(--shadow-glow)' }}
            >
              Explore products
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="press glass inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-foreground hover:border-primary/40"
            >
              Visit our store
            </button>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
            {[
              { k: '25+', v: 'Years milling' },
              { k: '1000+', v: 'Families served' },
              { k: '6am–11:30pm', v: 'Open daily' },
            ].map((s) => (
              <div key={s.k} className="glass rounded-2xl px-3 py-4 sm:px-5">
                <dt className="text-lg sm:text-2xl font-semibold text-primary tracking-tight">{s.k}</dt>
                <dd className="mt-1 text-[11px] sm:text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about section"
        className="press absolute bottom-6 left-1/2 -translate-x-1/2 z-10 glass rounded-full p-2.5 text-primary/80"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
