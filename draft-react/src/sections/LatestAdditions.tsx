import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarCard {
  id: number;
  name: string;
  tags: string[];
  image: string;
}

const carCards: CarCard[] = [
  {
    id: 1,
    name: 'Initiate for Esteban Ocon',
    tags: ['ATELIER', 'ONE OF ONE', 'LATEST ADDITIONS'],
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
  },
  {
    id: 2,
    name: 'Venatus SE',
    tags: ['ATELIER', 'WIDE BODY KIT', 'LATEST ADDITIONS'],
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800&q=80',
  },
  {
    id: 3,
    name: 'MANSORY Equestre',
    tags: ['LATEST ADDITIONS', 'ATELIER', 'SOFT KIT'],
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
  },
  {
    id: 4,
    name: 'MANSORY goes art - Collaboration with pop artist Alec Monopoly',
    tags: ['WIDE BODY KIT', 'LIMITED EDITION', 'LATEST ADDITIONS', 'ATELIER'],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
  },
  {
    id: 5,
    name: 'M5',
    tags: ['LATEST ADDITIONS', 'ATELIER'],
    image: 'https://images.unsplash.com/photo-1555215695-3004980adade?w=800&q=80',
  },
  {
    id: 6,
    name: 'Pugnator Tricolore',
    tags: ['ATELIER', 'LATEST ADDITIONS', 'WIDE BODY KIT', 'LIMITED EDITION'],
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  },
  {
    id: 7,
    name: 'Purosangue',
    tags: ['ATELIER', 'LATEST ADDITIONS'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  },
];

const LatestAdditions = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const cardWidth = 400;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
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
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 lg:px-12 mb-10">
        <h2 className="section-title text-black">LATEST ADDITIONS</h2>
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/5 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/5 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-12 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {carCards.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0 w-[350px] md:w-[400px] group cursor-pointer"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Tags */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[9px] tracking-widest uppercase border border-white/50 bg-black/60 backdrop-blur-sm text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-sm font-medium text-black tracking-wide group-hover:text-black/70 transition-colors line-clamp-2">
              {card.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Bottom Border */}
      <div className="mt-12 mx-6 lg:mx-12 h-[1px] bg-black/20" />
    </section>
  );
};

export default LatestAdditions;
