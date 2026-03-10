import { useEffect, useRef, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'MANSORY CARBONADO X',
    date: 'FEBRUARY 13, 2026',
    category: 'NEWS',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
  },
  {
    id: 2,
    title: 'THE FERRARI PUROSANGUE SOFT KIT',
    date: 'FEBRUARY 11, 2026',
    category: 'NEWS',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  },
];

const NewsEvents = () => {
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
      className="relative bg-[#7a8a99] py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 
            className={`section-title text-white transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            NEWS & EVENTS
          </h2>
          
          <a
            href="#news"
            className={`btn-outline text-white border-white/50 hover:bg-white/10 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            SEE ALL
          </a>
        </div>

        {/* Featured News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {newsItems.map((item, index) => (
            <a
              key={item.id}
              href="#"
              className={`group block transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index + 1) * 0.15}s` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/20 mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <span className="px-3 py-1 text-[10px] tracking-widest uppercase border border-white/50 text-white">
                  {item.category}
                </span>
                <span className="text-xs tracking-widest text-white/70">
                  {item.date}
                </span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-white group-hover:text-white/80 transition-colors">
                {item.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
