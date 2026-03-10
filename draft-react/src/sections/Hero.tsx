import { useState, useEffect, useCallback } from 'react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'KOENIGSEGG JESKO',
    subtitle: 'BY MANSORY',
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=1920&q=80',
  },
  {
    id: 2,
    title: 'THE PIRELLI 42',
    subtitle: 'MANSORY',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1920&q=80',
  },
  {
    id: 3,
    title: 'MANSORY CULLINAN',
    subtitle: 'BLACK BADGE',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1920&q=80',
  },
  {
    id: 4,
    title: 'MANSORY REVUELTO',
    subtitle: 'TORNADO',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [currentSlide, isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-slower ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-20">
        <div className="max-w-4xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute'
              }`}
            >
              {index === currentSlide && (
                <>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-white mb-2 animate-fade-in-up">
                    {slide.title}
                  </h1>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {slide.subtitle}
                  </h2>
                  <button className="btn-primary animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    DISCOVER NOW
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-[2px] transition-all duration-500 ${
              index === currentSlide
                ? 'w-12 bg-white'
                : 'w-6 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] tracking-widest uppercase rotate-90 origin-center translate-y-8">
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-white animate-[slide_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
