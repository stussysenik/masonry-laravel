import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InstaItem {
  id: number;
  image: string;
  handle: string;
}

const instaItems: InstaItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=400&q=80',
    handle: '@MANSORY',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80',
    handle: '@MANSORY',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&q=80',
    handle: '@MANSORY',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&q=80',
    handle: '@MANSORY',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1555215695-3004980adade?w=400&q=80',
    handle: '@MANSORY',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80',
    handle: '@MANSORY',
  },
];

const FollowUs = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
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

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const itemWidth = 300;
    const gap = 16;
    const scrollAmount = itemWidth + gap;
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    
    let newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(maxScroll, scrollPosition + scrollAmount);
    
    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  return (
    <section ref={sectionRef} className="relative bg-black py-20 overflow-hidden">
      {/* Header */}
      <div 
        className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="section-title text-white">FOLLOW US</h2>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-16"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {instaItems.map((item, index) => (
            <a
              key={item.id}
              href="#"
              className={`flex-shrink-0 w-[280px] md:w-[300px] group relative aspect-square overflow-hidden transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                scrollSnapAlign: 'start',
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <img
                src={item.image}
                alt={`Instagram post ${item.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm tracking-widest">{item.handle}</span>
              </div>
              
              {/* Handle Label */}
              <div className="absolute top-4 left-4 text-white/70 text-[10px] tracking-widest">
                {item.handle}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FollowUs;
