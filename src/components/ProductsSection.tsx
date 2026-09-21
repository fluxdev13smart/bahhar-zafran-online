import React from 'react';
import { Check } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const products = [
  {
    title: 'Premium Saffron',
    arabicTitle: 'زعفران فاخر',
    description: 'The finest threads from Kashmir — intense aroma, deep colour, honest grading.',
    image: 'https://i.herbalreality.com/wp-content/uploads/2022/05/21124107/saffron-Crocus-sativus-wooden-bowl-scaled.jpg',
    features: ['Grade A quality', 'Hand-picked', 'Lab tested', 'Authentic origin'],
  },
  {
    title: 'Mixed Herbs & Spices',
    arabicTitle: 'أعشاب وبهارات مختلطة',
    description: 'Cardamom, cinnamon, black pepper and traditional house blends, ground fresh.',
    image: 'https://etimg.etb2bimg.com/photo/110025886.cms',
    features: ['Fresh ground', 'Custom blends', 'Traditional recipes', 'Many options'],
  },
  {
    title: 'Essential Oils',
    arabicTitle: 'زيوت عطرية',
    description: 'Pure oils extracted from herbs and spices for culinary and therapeutic use.',
    image: 'https://health.osu.edu/-/media/health/images/stories/2018/05/essential-oils.jpg',
    features: ['100% pure', 'No additives', 'Food grade', 'Various sizes'],
  },
  {
    title: 'Custom Grinding',
    arabicTitle: 'طحن مخصص',
    description: 'Bring your own spices and we mill them on traditional stone to your texture.',
    image: 'https://i5.walmartimages.com/asr/ab7a5623-f78e-4f30-8600-b3c5c87da75f.c8a86ff1220b9de3da80692e95818a9c.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
    features: ['Stone mill', 'Fresh grinding', 'Custom texture', 'Same-day service'],
  },
];

const ProductsSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="products"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative z-10 py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <header className={`reveal ${isVisible ? 'reveal-in' : ''} max-w-2xl`}>
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">The shelves</p>
          <h2 className="mt-3 font-playfair font-bold display-tight text-[clamp(2rem,5.5vw,3.5rem)]">
            Our products
          </h2>
          <div className="mt-3 font-noto-kufi inline-block text-lg text-muted-foreground font-noto-kufi">منتجاتنا</div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Spices, herbs, oils and milling — a small catalogue, kept excellent.
          </p>
        </header>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {products.map((product, i) => (
            <article
              key={product.title}
              className={`reveal ${isVisible ? 'reveal-in' : ''} lift glass group rounded-[2rem] overflow-hidden`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  style={{ backgroundImage: `url("${product.image}")` }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 30%, hsl(24 28% 5% / 0.85) 100%)',
                  }}
                />
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="font-playfair text-2xl font-semibold text-primary-foreground drop-shadow-md">{product.title}</h3>
                  <div className="font-noto-kufi text-sm text-primary/85 arabic-text">
                    {product.arabicTitle}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-foreground/85">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`reveal ${isVisible ? 'reveal-in' : ''} glass-strong mt-8 rounded-[2rem] p-8 sm:p-12 relative overflow-hidden`}
          style={{ transitionDelay: '320ms' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'var(--gradient-veil)' }}
          />
          <div className="relative max-w-2xl">
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold">
              Special orders & wholesale
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We supply restaurants and large kitchens with consistent quality and competitive
              pricing. Tell us what you need and how you need it ground.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Restaurant supply', 'Special orders', 'Quality guarantee', 'Custom packaging'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs text-primary"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
