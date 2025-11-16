import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WhatsAppIcon from './WhatsAppIcon';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const ContactSection = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  
  const phoneNumbers = [
    { display: '+971 4 285 7715', call: '+971 4 285 7715', whatsapp: null },
    { display: '+971 55 474 7065', call: '+971 55 474 7065', whatsapp: 'https://wa.me/971554747065' },
    { display: '+971 55 907 4779', call: '+971 55 907 4779', whatsapp: 'https://wa.me/971559074779' }
  ];

  const handleCallClick = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWhatsAppClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleCopyClick = (phoneNumber: string) => {
    navigator.clipboard.writeText(phoneNumber);
    toast({
      title: "Phone number copied!",
      description: `${phoneNumber} has been copied to your clipboard.`,
    });
  };

  return (
    <section 
      id="contact" 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-gradient-to-br from-earth-900 to-saffron-900 text-white relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Contact Us
          </h2>
          <div className="text-2xl font-noto-kufi text-saffron-200 mb-6 arabic-text">
            اتصل بنا
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Visit our store or get in touch for all your spice and grinding needs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-earth-800/30 backdrop-blur border-saffron-300/30">
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-semibold mb-6 flex items-center text-saffron-200">
                  <Phone className="w-6 h-6 mr-3" />
                  Call Us
                </h3>
                <div className="space-y-4">
                  {phoneNumbers.map((phone, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-lg text-gray-300">{phone.display}</span>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleCopyClick(phone.display)}
                          size="sm"
                          className="bg-earth-600 hover:bg-earth-700 text-white border border-earth-500 shadow-md"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        {phone.whatsapp && (
                          <button 
                            className="whatsapp-btn"
                            onClick={() => handleWhatsAppClick(phone.whatsapp!)}
                          >
                            <span className="whatsapp-svgContainer">
                              <svg viewBox="0 0 16 16" className="whatsapp-svgIcon">
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                              </svg>
                            </span>
                            <span className="whatsapp-BG"></span>
                          </button>
                        )}
                        <Button
                          onClick={() => handleCallClick(phone.call)}
                          size="sm"
                          className="bg-saffron-600 hover:bg-saffron-700 text-white font-semibold shadow-md"
                        >
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-earth-800/30 backdrop-blur border-saffron-300/30">
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-semibold mb-6 flex items-center text-saffron-200">
                  <MapPin className="w-6 h-6 mr-3" />
                  Visit Our Store
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-saffron-200 mb-2">Address:</h4>
                    <p className="text-gray-300">
                      BAHAR ALZAFARAN GRINDING SHOP<br />
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-saffron-200 mb-2">Business Hours:</h4>
                    <div className="text-gray-300 space-y-1">
                      <p>Daily: 6:00 AM - 11:30 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-saffron-300/30">
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-semibold mb-4 text-saffron-200">
                  Why Choose Us?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-saffron-400 rounded-full mr-3"></div>
                    Premium quality spices and herbs
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-saffron-400 rounded-full mr-3"></div>
                    Traditional stone grinding methods
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-saffron-400 rounded-full mr-3"></div>
                    Expert consultation and advice
                  </div>
                  <div className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-saffron-400 rounded-full mr-3"></div>
                    Competitive prices
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-8">
            <Card className="overflow-hidden bg-white/10 backdrop-blur border-saffron-300/30">
              <CardContent className="p-0">
                <div className="relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d104520.32142778013!2d55.3156343!3d25.2256447!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f675f5a7eb597%3A0x7766958fd13126d0!2zQkFIQVIgQUxaQUZBUkFOIEdSSU5ESU5HIFNIT1Ag2YXYt9it2YbYqSDZiCDYo9i52LTYp9ioINio2K3Ysdin2YTYsti52YHYsdin2YY!5e1!3m2!1sen!2sae!4v1748177558623!5m2!1sen!2sae" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-8 border border-saffron-300/30">
          <h3 className="text-3xl font-playfair font-bold mb-4 text-saffron-200">
            Ready to Experience Authentic Spices?
          </h3>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Visit our store today and discover the difference that traditional quality makes. 
            Our team is ready to help you find the perfect spices for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => handleCallClick(phoneNumbers[0].call)}
              size="lg"
              className="bg-saffron-600 hover:bg-saffron-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
            
            <div className="map-btn-wrapper" onClick={() => window.open('https://maps.app.goo.gl/2r8qcDyauneKaFi47', '_blank')}>
              <svg height="0" width="0">
                <filter id="land">
                  <feTurbulence
                    result="turb"
                    numOctaves="7"
                    baseFrequency="0.006"
                    type="fractalNoise"
                  />
                  <feDisplacementMap
                    yChannelSelector="G"
                    xChannelSelector="R"
                    scale="700"
                    in="SourceGraphic"
                    in2="turb"
                  />
                </filter>
              </svg>

              <div className="map-btn">View on Map</div>

              <div className="pinpoint"></div>
              <div className="map-container">
                <div className="map fold-1"></div>
                <div className="map fold-2"></div>
                <div className="map fold-3"></div>
                <div className="map fold-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
