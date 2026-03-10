import { useEffect, useRef, useState } from 'react';

const Atelier = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div 
          className={`relative h-[400px] lg:h-[500px] overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}
        >
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
            alt="Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent lg:hidden" />
        </div>

        {/* Content */}
        <div 
          className={`flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-0 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            ATELIER
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-md mb-10">
            We are here to cater to your expectations and tailor our services to fit your requirements. 
            If you have any questions or special requests, we are available to assist you.
          </p>
          
          <a
            href="#atelier"
            className="btn-outline text-white border-white/30 hover:bg-white/10 w-fit"
          >
            DISCOVER
          </a>
        </div>
      </div>
    </section>
  );
};

export default Atelier;
