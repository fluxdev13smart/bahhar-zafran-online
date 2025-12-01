
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const ProductsSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const products = [
    {
      title: 'Premium Saffron',
      arabicTitle: 'زعفران فاخر',
      description: 'The finest saffron threads sourced from Kashmir and Iran, known for their intense aroma and deep color.',
      image: 'https://i.herbalreality.com/wp-content/uploads/2022/05/21124107/saffron-Crocus-sativus-wooden-bowl-scaled.jpg',
      features: ['Grade A Quality', 'Hand-picked', 'Lab Tested', 'Authentic Origin']
    },
    {
      title: 'Mixed Herbs & Spices',
      arabicTitle: 'أعشاب وبهارات مختلطة',
      description: 'A curated selection of herbs and spices including cardamom, cinnamon, black pepper, and traditional blends.',
      image: 'https://etimg.etb2bimg.com/photo/110025886.cms',
      features: ['Fresh Ground', 'Custom Blends', 'Traditional Recipes', 'Various Options']
    },
    {
      title: 'Essential Oils',
      arabicTitle: 'زيوت عطرية',
      description: 'Pure essential oils extracted from herbs and spices, perfect for culinary and therapeutic uses.',
      image: 'https://health.osu.edu/-/media/health/images/stories/2018/05/essential-oils.jpg',
      features: ['100% Pure', 'No Additives', 'Food Grade', 'Various Sizes']
    },
    {
      title: 'Custom Grinding',
      arabicTitle: 'طحن مخصص',
      description: 'Professional grinding services for your spices and herbs using traditional stone mills.',
      image: 'https://i5.walmartimages.com/asr/ab7a5623-f78e-4f30-8600-b3c5c87da75f.c8a86ff1220b9de3da80692e95818a9c.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
      features: ['Stone Mill', 'Fresh Grinding', 'Custom Texture', 'Same Day Service']
    }
  ];

  return (
    <section 
      id="products" 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-background relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-earth-800 mb-4">
            Our Products
          </h2>
          <div className="text-2xl font-amiri text-saffron-700 mb-6 arabic-text">
            منتجاتنا
          </div>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            Discover our premium collection of spices, herbs, oils, and grinding services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden shadow-lg border-saffron-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundImage: `url("${product.image}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-earth-800 mb-2">
                  {product.title}
                </h3>
                <div className="text-sm font-amiri text-saffron-700 mb-3 arabic-text">
                  {product.arabicTitle}
                </div>
                <p className="text-earth-600 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-2">
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-earth-700">
                      <div className="w-2 h-2 bg-saffron-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-saffron-500 to-spice-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-playfair font-bold mb-4">
            Special Orders & Custom Requirements
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            We cater to restaurants and special orders with competitive pricing and consistent quality. 
            Contact us for custom orders and special requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">Restaurant Supply</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Special Orders</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Quality Guarantee</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Custom Packaging</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
