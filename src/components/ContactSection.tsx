import React from 'react';
import { Phone, MapPin, Copy, Clock, Navigation as NavIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const phoneNumbers = [
  { display: '+971 4 285 7715', call: '+971 4 285 7715', whatsapp: null },
  { display: '+971 55 474 7065', call: '+971 55 474 7065', whatsapp: 'https://wa.me/971554747065' },
  { display: '+971 55 907 4779', call: '+971 55 907 4779', whatsapp: 'https://wa.me/971559074779' },
];

const ContactSection = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const handleCallClick = (phoneNumber: string) => window.open(`tel:${phoneNumber}`, '_self');
  const handleWhatsAppClick = (url: string) => window.open(url, '_blank');
  const handleCopyClick = (phoneNumber: string) => {
    navigator.clipboard.writeText(phoneNumber);
    toast({
      title: 'Phone number copied',
      description: `${phoneNumber} is on your clipboard.`,
    });
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative z-10 py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <header className={`reveal ${isVisible ? 'reveal-in' : ''} max-w-2xl`}>
          <p className="text-xs uppercase tracking-[0.22em] text-primary/80">Come by</p>
          <h2 className="mt-3 font-playfair font-bold display-tight text-[clamp(2rem,5.5vw,3.5rem)]">
            Contact us
          </h2>
          <div className="mt-3 font-noto-kufi inline-block text-lg text-muted-foreground font-noto-kufi">اتصل بنا</div>
        </header>

        <div className="mt-14 grid lg:grid-cols-[1fr_1.1fr] gap-5 items-start">
          <div className="space-y-5">
            <div className={`reveal ${isVisible ? 'reveal-in' : ''} glass rounded-[1.75rem] p-7`}>
              <h3 className="flex items-center gap-3 font-playfair text-xl font-semibold">
                <Phone className="w-5 h-5 text-primary" />
                Call us
              </h3>
              <ul className="mt-6 space-y-3">
                {phoneNumbers.map((phone) => (
                  <li
                    key={phone.display}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-secondary/40 px-4 py-3"
                  >
                    <span className="text-sm sm:text-base tabular-nums text-foreground/90">
                      {phone.display}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyClick(phone.display)}
                        aria-label={`Copy ${phone.display}`}
                        className="press inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/80 hover:text-primary"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      {phone.whatsapp && (
                        <button
                          className="whatsapp-btn"
                          aria-label={`WhatsApp ${phone.display}`}
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
                      <button
                        onClick={() => handleCallClick(phone.call)}
                        className="press rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground"
                        style={{ background: 'var(--gradient-gold)' }}
                      >
                        Call
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`reveal ${isVisible ? 'reveal-in' : ''} glass rounded-[1.75rem] p-7`}
              style={{ transitionDelay: '80ms' }}
            >
              <h3 className="flex items-center gap-3 font-playfair text-xl font-semibold">
                <MapPin className="w-5 h-5 text-primary" />
                Visit our store
              </h3>
              <address className="mt-5 not-italic text-muted-foreground leading-relaxed">
                Bahar Alzafaran Grinding Shop
                <br />
                Dubai, United Arab Emirates
              </address>
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 px-4 py-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/85">Open daily · 6:00 AM – 11:30 PM</span>
              </div>
            </div>

            <div
              className={`reveal ${isVisible ? 'reveal-in' : ''} glass rounded-[1.75rem] p-7`}
              style={{ transitionDelay: '140ms' }}
            >
              <h3 className="font-playfair text-xl font-semibold">Why choose us</h3>
              <ul className="mt-5 grid sm:grid-cols-2 gap-3">
                {[
                  'Premium quality spices and herbs',
                  'Traditional stone grinding',
                  'Expert consultation',
                  'Competitive prices',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`reveal ${isVisible ? 'reveal-in' : ''} lg:sticky lg:top-28`}
            style={{ transitionDelay: '120ms' }}
          >
            <div className="glass rounded-[2rem] overflow-hidden p-2">
              <iframe
                title="Bahar Al Zafran location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d104520.32142778013!2d55.3156343!3d25.2256447!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f675f5a7eb597%3A0x7766958fd13126d0!2zQkFIQVIgQUxaQUZBUkFOIEdSSU5ESU5HIFNIT1Ag2YXYt9it2YbYqSDZiCDYo9i52LTYp9ioINio2K3Ysdin2YTYsti52YHYsdin2YY!5e1!3m2!1sen!2sae!4v1748177558623!5m2!1sen!2sae"
                width="100%"
                height="520"
                style={{ border: 0, borderRadius: '1.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div
          className={`reveal ${isVisible ? 'reveal-in' : ''} glass-strong mt-8 rounded-[2rem] p-8 sm:p-12 text-center relative overflow-hidden`}
          style={{ transitionDelay: '180ms' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'var(--gradient-veil)' }}
          />
          <div className="relative">
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold">
              Ready to Experience Authentic Spices?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
              Come in, smell everything, and let us grind it fresh while you wait.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => handleCallClick(phoneNumbers[0].call)}
                className="press inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-primary-foreground"
                style={{ background: 'var(--gradient-gold)', boxShadow: 'var(--shadow-glow)' }}
              >
                <Phone className="w-4 h-4" />
                Call now
              </button>
              <button
                onClick={() => window.open('https://maps.app.goo.gl/2r8qcDyauneKaFi47', '_blank')}
                className="press glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold hover:border-primary/40"
              >
                <NavIcon className="w-4 h-4 text-primary" />
                Get directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
