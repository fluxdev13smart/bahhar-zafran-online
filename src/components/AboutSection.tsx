import React from 'react';
import { Leaf, Wheat, HandHeart } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const pillars = [
  {
    icon: Leaf,
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
      className="market-section relative z-10"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <header className={`reveal ${isVisible ? 'reveal-in' : ''} max-w-2xl`}>
          <p className="section-kicker">Our story</p>
          <h2 className="mt-3 section-heading font-playfair font-semibold">
            Rooted in Dubai. Ground in tradition.
          </h2>
          <div className="mt-3 font-noto-kufi inline-block text-lg text-muted-foreground">من نحن</div>
        </header>

        <div className={`reveal ${isVisible ? 'reveal-in' : ''} mt-10 grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-16 items-center`}>
          <img src="/instore.webp" alt="Shelves of herbs and spices inside Bahar Al Zafran" className="story-image" loading="lazy" />
          <div>
            <h3 className="font-playfair text-3xl font-semibold">Our heritage</h3>
            <p className="mt-5 leading-relaxed text-muted-foreground">For generations, Bahar Al Zafran has been a name families trust for saffron, herbs and spices. Our supermarket and grinding mill sit at the crossroads of the city's oldest spice trade and the way people cook today.</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">Every order can be ground to order on traditional stone mills, so the aroma you open at home is the aroma we sealed in the shop.</p>
            <div className="mt-6">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="story-pillar flex gap-4">
                  <pillar.icon className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                  <div><h4 className="font-semibold">{pillar.title}</h4><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
