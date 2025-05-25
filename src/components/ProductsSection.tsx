
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ProductsSection = () => {
  const products = [
    {
      title: 'Premium Saffron',
      arabicTitle: 'زعفران فاخر',
      description: 'The finest saffron threads sourced from Kashmir and Iran, known for their intense aroma and deep color.',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: ['Grade A Quality', 'Hand-picked', 'Lab Tested', 'Authentic Origin']
    },
    {
      title: 'Mixed Herbs & Spices',
      arabicTitle: 'أعشاب وبهارات مختلطة',
      description: 'A curated selection of herbs and spices including cardamom, cinnamon, black pepper, and traditional blends.',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: ['Fresh Ground', 'Custom Blends', 'Traditional Recipes', 'Bulk Options']
    },
    {
      title: 'Essential Oils',
      arabicTitle: 'زيوت عطرية',
      description: 'Pure essential oils extracted from herbs and spices, perfect for culinary and therapeutic uses.',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: ['100% Pure', 'No Additives', 'Food Grade', 'Various Sizes']
    },
    {
      title: 'Custom Grinding',
      arabicTitle: 'طحن مخصص',
      description: 'Professional grinding services for your spices and herbs using traditional stone mills.',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      features: ['Stone Mill', 'Fresh Grinding', 'Custom Texture', 'Same Day Service']
    }
  ];

  return (
    <section id="products" className="py-20 bg-white">
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
            Special Orders & Bulk Purchases
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            We cater to restaurants, hotels, and wholesale buyers with competitive pricing and consistent quality. 
            Contact us for custom orders and bulk requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">Restaurant Supply</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Hotel Catering</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Wholesale Rates</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Custom Packaging</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
