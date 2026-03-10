import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const SplitSection = () => {
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
    <section ref={sectionRef} className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* All Cars */}
        <div 
          className={`relative h-[500px] md:h-[600px] overflow-hidden group cursor-pointer transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=1200&q=80)' 
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
            <h3 className="text-4xl md:text-5xl font-light tracking-wide text-white mb-4">
              ALL CARS
            </h3>
            <p className="text-white/70 text-sm tracking-wide max-w-md mb-8">
              We create unique masterpieces that defy convention.
            </p>
            <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white transition-all duration-300">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Rims */}
        <div 
          className={`relative h-[500px] md:h-[600px] overflow-hidden group cursor-pointer transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1555215695-3004980adade?w=1200&q=80)' 
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
            <h3 className="text-4xl md:text-5xl font-light tracking-wide text-white mb-4">
              RIMS
            </h3>
            <p className="text-white/70 text-sm tracking-wide max-w-md mb-8">
              Each rim has its own story. Match it with your unique style.
            </p>
            <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white transition-all duration-300">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitSection;
