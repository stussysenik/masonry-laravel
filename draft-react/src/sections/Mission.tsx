import { useEffect, useRef, useState } from 'react';

const Mission = () => {
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
    <section 
      ref={sectionRef} 
      className="relative bg-black py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.1) 10px,
              rgba(255,255,255,0.1) 20px
            )`
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 
          className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-white leading-tight mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          OUR MISSION GOES BEYOND TUNING.<br />
          WE CREATE UNIQUE MASTERPIECES<br />
          THAT DEFY CONVENTION.
        </h2>
        
        <div 
          className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="#about"
            className="btn-outline text-white border-white/30 hover:bg-white/10"
          >
            ABOUT US
          </a>
          <a
            href="#models"
            className="btn-primary text-white bg-white/20 border-white/40 hover:bg-white/30"
          >
            ALL MODELS
          </a>
        </div>
      </div>
    </section>
  );
};

export default Mission;
