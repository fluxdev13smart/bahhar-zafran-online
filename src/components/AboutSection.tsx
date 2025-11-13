
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-earth-50 to-saffron-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-earth-800 mb-4">
            About Us
          </h2>
          <div className="text-2xl font-amiri text-saffron-700 mb-6 arabic-text">
            من نحن
          </div>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            A legacy of quality and tradition in the heart of Dubai
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in">
            <Card className="overflow-hidden shadow-xl border-saffron-200">
              <div className="h-80 bg-cover bg-center" style={{
                backgroundImage: 'url("https://i.imgur.com/9YaTWxk.png")'
              }}></div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-3xl font-playfair font-semibold text-earth-800 mb-4">
              Our Heritage
            </h3>
            <p className="text-lg text-earth-700 leading-relaxed">
              For generations, Bahar Al Zafran has been synonymous with quality and authenticity in Dubai's spice trade. 
              Our traditional supermarket and grinding mill has served countless families, bringing them the finest saffron, 
              herbs, and spices from around the world.
            </p>
            <p className="text-lg text-earth-700 leading-relaxed">
              Located in the bustling heart of Dubai, our store represents a bridge between traditional spice trading 
              and modern convenience. We take pride in our custom grinding services, ensuring that every spice retains 
              its natural essence and potency.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-saffron-100 rounded-lg">
                <div className="text-3xl font-bold text-saffron-700">25+</div>
                <div className="text-sm text-earth-600">Years of Experience</div>
              </div>
              <div className="text-center p-4 bg-earth-100 rounded-lg">
                <div className="text-3xl font-bold text-earth-700">1000+</div>
                <div className="text-sm text-earth-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-white shadow-lg border-saffron-200 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="text-center">
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-saffron-500 rounded-full"></div>
              </div>
              <h4 className="text-xl font-semibold text-earth-800 mb-2">Premium Quality</h4>
              <p className="text-earth-600">
                We source only the finest ingredients from trusted suppliers worldwide, ensuring exceptional quality in every product.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white shadow-lg border-saffron-200 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="text-center">
              <div className="w-16 h-16 bg-spice-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-spice-500 rounded-full"></div>
              </div>
              <h4 className="text-xl font-semibold text-earth-800 mb-2">Traditional Methods</h4>
              <p className="text-earth-600">
                Our time-honored grinding techniques preserve the natural oils and flavors that make our spices exceptional.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-white shadow-lg border-saffron-200 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="text-center">
              <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-earth-500 rounded-full"></div>
              </div>
              <h4 className="text-xl font-semibold text-earth-800 mb-2">Personal Service</h4>
              <p className="text-earth-600">
                Our knowledgeable staff provides personalized recommendations and custom grinding services for every customer.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
