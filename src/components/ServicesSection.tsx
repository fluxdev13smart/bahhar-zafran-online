import React from 'react';
import { Wheat, ChefHat, Truck, Scale } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const services = [
  {
    title: 'Custom Spice Grinding',
    arabicTitle: 'طحن البهارات المخصص',
    description: 'Stone milling that preserves natural oils and flavour, at the texture you ask for.',
    features: ['Stone mill technology', 'Various textures', 'Same-day service', 'Bulk processing'],
    icon: Wheat,
  },
  {
    title: 'Spice Consultation',
    arabicTitle: 'استشارات البهارات',
    description: 'Advice on selection, pairing, storage and quality from people who handle it daily.',
    features: ['Recipe recommendations', 'Spice pairing', 'Quality assessment', 'Storage tips'],
    icon: ChefHat,
  },
  {
    title: 'Wholesale Supply',
    arabicTitle: 'التوريد بالجملة',
    description: 'Bulk supply for restaurants, hotels and commercial kitchens across Dubai.',
    features: ['Competitive pricing', 'Regular delivery', 'Quality guarantee', 'Custom packaging'],
    icon: Truck,
  },
  {
    title: 'Custom Blending',
    arabicTitle: 'خلط مخصص',
    description: 'Develop your own signature blend with precise, repeatable measurements.',
    features: ['Recipe development', 'Precise measurements', 'Consistent quality'],
    icon: Scale,
  },
];

const steps = [
  { n: '01', t: 'Selection', d: 'Choose your spices and the texture you want' },
  { n: '02', t: 'Preparation', d: 'Cleaning and sorting before the mill' },
  { n: '03', t: 'Grinding', d: 'Traditional stone milling, slow and cool' },
  { n: '04', t: 'Packaging', d: 'Sealed fresh with a final quality check' },
];

const ServicesSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative z-10 py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <header className={`reveal ${isVisible ? 'reveal-in' : ''} max-w-2xl`}>
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">What we do</p>
          <h2 className="mt-3 font-playfair font-bold display-tight text-[clamp(2rem,5.5vw,3.5rem)]">
            Our services
          </h2>
          <div className="mt-3 font-noto-kufi text-lg text-muted-foreground arabic-text">خدماتنا</div>
        </header>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <article
              key={service.title}
              className={`reveal ${isVisible ? 'reveal-in' : ''} lift glass rounded-[1.75rem] p-7 sm:p-8 h-full`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                  <service.icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-playfair text-xl font-semibold">{service.title}</h3>
                  <div className="font-noto-kufi text-sm text-muted-foreground arabic-text">
                    {service.arabicTitle}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] text-foreground/80"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div
          className={`reveal ${isVisible ? 'reveal-in' : ''} glass-strong mt-8 rounded-[2rem] p-8 sm:p-12`}
          style={{ transitionDelay: '300ms' }}
        >
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold">Our grinding process</h3>
          <p className="mt-3 max-w-xl text-muted-foreground">
            The traditional craft, held to modern standards.
          </p>

          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <li key={s.n} className="relative pl-5 border-l border-primary/25">
                <span className="text-sm font-semibold text-primary tabular-nums">{s.n}</span>
                <h4 className="mt-2 font-semibold">{s.t}</h4>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
