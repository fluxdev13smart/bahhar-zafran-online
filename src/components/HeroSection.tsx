import React from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import SplitText from '@/components/SplitText';
import { Button } from '@/components/ui/button';

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
};

interface HeroSectionProps {
  titleAnimationReady?: boolean;
}

const HeroSection = ({ titleAnimationReady = true }: HeroSectionProps) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section
      id="home"
      ref={ref as React.RefObject<HTMLElement>}
      className="hero-section relative flex items-end overflow-hidden z-10"
    >
      <img src="/exterior.webp" alt="Bahar Al Zafran spice shop storefront in Dubai" className="hero-image absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      <div className="hero-overlay absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pb-10 pt-36 sm:pb-14">
        <div className={`hero-copy reveal ${isVisible ? 'reveal-in' : ''}`}>
          <div className="flex flex-col items-start">
            <div className="relative z-20 mb-3 inline-flex items-center gap-2 hero-location rounded-full px-4 py-2 text-xs sm:text-sm">
              <MapPin className="w-3.5 h-3.5" />
              Dubai, United Arab Emirates
            </div>

            <SplitText
              tag="h1"
              text="Bahar Al Zafran"
              className="hero-title max-w-full font-playfair font-bold display-tight text-primary"
              delay={45}
              duration={0.8}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 42, rotateX: -35 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              threshold={0.1}
              rootMargin="0px"
              textAlign="left"
              enabled={titleAnimationReady}
            />
          </div>

          <div className="mt-3 font-noto-kufi text-base sm:text-2xl text-foreground/80 max-w-2xl">
            مطحنة و اعشاب بحرالزعفران ش.ذ.م.م
          </div>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            A traditional supermarket and stone grinding mill. Saffron, herbs, spices and
            pure oils — ground fresh, the way it has always been done.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button
              onClick={() => scrollToSection('products')}
              className="press inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-primary-foreground"
              size="lg"
            >
              Explore products <ArrowUpRight />
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline" size="lg" className="press hero-location inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-foreground hover:border-primary/40"
            >
              Visit our store
            </Button>
          </div>

          <dl className="hero-facts mt-10 grid grid-cols-3 gap-3 sm:gap-8 max-w-xl pt-6">
            {[
              { k: '25+', v: 'Years milling' },
              { k: '1000+', v: 'Families served' },
              { k: '6am–11:30pm', v: 'Open daily' },
            ].map((s) => (
              <div key={s.k} className="min-w-0">
                <dt className="text-lg sm:text-xl font-semibold tabular-nums">{s.k}</dt>
                <dd className="mt-1 text-[11px] sm:text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
