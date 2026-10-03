import React from 'react';
import { Sparkles, Wheat, HandHeart } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const pillars = [
  {
    icon: Sparkles,
    title: 'Premium quality',
    body: 'Sourced from trusted growers worldwide, graded and checked before it ever reaches a shelf.',
  },
  {
    icon: Wheat,
    title: 'Traditional methods',
    body: 'Stone milling preserves the natural oils and aromatics that industrial grinding burns away.',
  },
  {
    icon: HandHeart,
    title: 'Personal service',
    body: 'Our team advises on blends, textures and storage, and grinds to your exact preference.',
  },
];

const AboutSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative z-10 py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <header className={`reveal ${isVisible ? 'reveal-in' : ''} max-w-2xl`}>
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Our story</p>
          <h2 className="mt-3 font-playfair font-bold display-tight text-[clamp(2rem,5.5vw,3.5rem)]">
            A legacy of spice, in the heart of Dubai
          </h2>
          <div className="mt-3 font-noto-kufi inline-block text-lg text-muted-foreground">من نحن</div>
        </header>

        <div className={`reveal ${isVisible ? 'reveal-in' : ''} mt-14 grid lg:grid-cols-[1.05fr_1fr] gap-8 items-stretch`} style={{ transitionDelay: '80ms' }}>
          <div className="glass rounded-[2rem] overflow-hidden">
            {/* About Image using instore.webp */}
            <div
              className="h-72 sm:h-full min-h-[20rem] bg-cover bg-center"
              style={{ backgroundImage: 'url("/instore.webp")' }}
              role="img"
              aria-label="Inside Bahar Al Zafran store"
            />
          </div>

          <div className="glass rounded-[2rem] p-7 sm:p-10 flex flex-col justify-center">
            <h3 className="font-playfair text-2xl sm:text-3xl font-semibold">Our heritage</h3>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              For generations, Bahar Al Zafran has been a name families trust for saffron, herbs
              and spices. Our supermarket and grinding mill sit at the crossroads of the city's
              oldest spice trade and the way people cook today.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every order can be ground to order on traditional stone mills, so the aroma you open
              at home is the aroma we sealed in the shop.
            </p>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <article
              key={p.title}
              className={`reveal ${isVisible ? 'reveal-in' : ''} lift glass rounded-[1.75rem] p-7`}
              style={{ transitionDelay: `${140 + i * 70}ms` }}
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-primary-foreground"
                style={{ background: 'var(--gradient-gold)' }}
              >
                <p.icon className="w-5 h-5" />
              </span>
              <h4 className="mt-5 text-lg font-semibold">{p.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
