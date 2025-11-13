
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Wheat, ChefHat, Truck, Scale } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const ServicesSection = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const services = [
    {
      title: 'Custom Spice Grinding',
      arabicTitle: 'طحن البهارات المخصص',
      description: 'Professional grinding services using traditional stone mills to preserve natural oils and flavors.',
      features: ['Stone Mill Technology', 'Various Textures', 'Same-Day Service', 'Bulk Processing'],
      icon: Wheat
    },
    {
      title: 'Spice Consultation',
      arabicTitle: 'استشارات البهارات',
      description: 'Expert advice on spice selection, usage, and storage from our experienced team.',
      features: ['Recipe Recommendations', 'Spice Pairing', 'Quality Assessment', 'Storage Tips'],
      icon: ChefHat
    },
    {
      title: 'Wholesale Supply',
      arabicTitle: 'التوريد بالجملة',
      description: 'Bulk supply services for restaurants, hotels, and commercial kitchens.',
      features: ['Competitive Pricing', 'Regular Delivery', 'Quality Guarantee', 'Custom Packaging'],
      icon: Truck
    },
    {
      title: 'Custom Blending',
      arabicTitle: 'خلط مخصص',
      description: 'Create your own signature spice blends with our custom mixing services.',
      features: ['Recipe Development', 'Precise Measurements', 'Consistent Quality'],
      icon: Scale
    }
  ];

  return (
    <section 
      id="services" 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-background relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-earth-800 mb-4">
            Our Services
          </h2>
          <div className="text-2xl font-amiri text-saffron-700 mb-6 arabic-text">
            خدماتنا
          </div>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            Professional services designed to meet all your spice and grinding needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-saffron-200"
            >
            <CardContent className="p-6 text-center h-full flex flex-col">
                <div className="text-saffron-600 mb-4 flex justify-center">
                  <service.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-earth-800 mb-2">
                  {service.title}
                </h3>
                <div className="text-sm font-amiri text-saffron-700 mb-4 arabic-text">
                  {service.arabicTitle}
                </div>
                <p className="text-earth-600 text-sm mb-6 flex-grow">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center text-xs text-earth-700">
                      <div className="w-1.5 h-1.5 bg-saffron-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-r from-earth-100 to-saffron-100 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-playfair font-bold text-earth-800 mb-4">
              Our Grinding Process
            </h3>
            <p className="text-lg text-earth-600 max-w-2xl mx-auto">
              Experience the traditional art of spice grinding with modern quality standards
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-earth-800 mb-2">Selection</h4>
              <p className="text-sm text-earth-600">Choose your spices and desired texture</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-spice-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-earth-800 mb-2">Preparation</h4>
              <p className="text-sm text-earth-600">Clean and prepare spices for grinding</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-earth-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-earth-800 mb-2">Grinding</h4>
              <p className="text-sm text-earth-600">Traditional stone mill grinding process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h4 className="font-semibold text-earth-800 mb-2">Packaging</h4>
              <p className="text-sm text-earth-600">Fresh packaging and quality assurance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
