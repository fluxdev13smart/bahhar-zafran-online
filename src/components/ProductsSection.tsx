import React from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

import { Button } from '@/components/ui/button';
import saffron from '@/assets/saffron.jpg.asset.json';
import spices from '@/assets/spices.jpg.asset.json';
import oils from '@/assets/oils.jpg.asset.json';

const products = [
  {
    title: 'Premium Saffron',
    arabicTitle: 'زعفران فاخر',
    description: 'The finest threads from Kashmir — intense aroma, deep colour, honest grading.',
    image: saffron.url,
    features: ['Grade A quality', 'Hand-picked', 'Lab tested', 'Authentic origin'],
  },
  {
    title: 'Mixed Herbs & Spices',
    arabicTitle: 'أعشاب وبهارات مختلطة',
    description: 'Cardamom, cinnamon, black pepper and traditional house blends, ground fresh.',
    image: spices.url,
    features: ['Fresh ground', 'Custom blends', 'Traditional recipes', 'Many options'],
  },
  {
    title: 'Essential Oils',
    arabicTitle: 'زيوت عطرية',
    description: 'Pure oils extracted from herbs and spices for culinary and therapeutic use.',
    image: oils.url,
    features: ['100% pure', 'No additives', 'Food grade', 'Various sizes'],
  },
  {
    title: 'Custom Grinding',
    arabicTitle: 'طحن مخصص',
    description: 'Bring your own spices and we mill them on traditional stone to your texture.',
    image: '/instore.webp',
    features: ['Stone mill', 'Fresh grinding', 'Custom texture', 'Same-day service'],
  },
];

const ProductsSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="products"
      ref={ref as React.RefObject<HTMLElement>}
      className="market-section relative z-10"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <header className={`reveal ${isVisible ? 'reveal-in' : ''} max-w-2xl`}>
          <p className="section-kicker">The shelves</p>
          <h2 className="mt-3 section-heading font-playfair font-semibold">
            From our shelves
          </h2>
          <div className="mt-3 font-noto-kufi inline-block text-lg text-muted-foreground">منتجاتنا</div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Spices, herbs, oils and milling — a small catalogue, kept excellent.
          </p>
        </header>

        <div className="product-grid mt-10">
          {products.map((product) => (
            <article key={product.title} className={`product-item group reveal ${isVisible ? 'reveal-in' : ''}`}>
              <div className="product-image"><img src={product.image} alt={product.title === 'Custom Grinding' ? 'Spice selection inside the grinding shop' : product.title} className="product-photo" loading="eager" decoding="async" /></div>
              <div className="product-details">
                <div className="flex flex-wrap justify-between items-baseline gap-2"><h3 className="font-playfair text-2xl font-semibold">{product.title}</h3><span className="font-noto-kufi text-sm text-accent" dir="rtl">{product.arabicTitle}</span></div>
                <p className="mt-3 leading-relaxed text-muted-foreground">{product.description}</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">{product.features.map(feature => <li key={feature} className="flex items-center gap-2 text-xs"><Check className="h-3.5 w-3.5 text-accent" />{feature}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
        <div className={`wholesale-band reveal ${isVisible ? 'reveal-in' : ''}`}>
          <div className="max-w-xl"><h3 className="font-playfair text-3xl font-semibold">Special orders & wholesale</h3><p className="mt-3 leading-relaxed text-muted-foreground">We supply restaurants and large kitchens with consistent quality and competitive pricing. Tell us what you need and how you need it ground.</p></div>
          <Button size="lg" className="press rounded-full shrink-0" asChild><a href="https://wa.me/971554747065" target="_blank" rel="noopener noreferrer">Discuss your order <ArrowUpRight /></a></Button>
        </div>
      </div>
    </section>
  );
};
export default ProductsSection;
