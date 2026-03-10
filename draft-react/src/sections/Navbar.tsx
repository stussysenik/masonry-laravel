import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'MODELS', href: '#models' },
    { 
      name: 'CARS FOR SALE', 
      href: '#cars-for-sale',
      dropdown: ['ALL CARS', 'NEW ARRIVALS', 'SPECIAL OFFERS']
    },
    { name: 'RIMS', href: '#rims' },
    { name: 'BOUTIQUE', href: '#boutique' },
    { 
      name: 'CONFIGURATOR', 
      href: '#configurator',
      dropdown: ['CULLINAN II', 'PUROSANGUE']
    },
  ];

  const rightLinks = [
    { name: 'NEWS', href: '#news' },
    { name: 'FIND A DEALER', href: '#dealer' },
    { name: 'CONTACT US', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button 
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="nav-link flex items-center gap-1"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-3 h-3" />}
                </a>
                
                {/* Dropdown */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-0 mt-2 py-2 bg-black/95 backdrop-blur-md border border-white/10 min-w-[160px] animate-fade-in">
                    {link.dropdown.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="dropdown-item block"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <a href="#" className="mansory-logo text-white">
            MANSORY
          </a>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {rightLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Right Placeholder */}
          <div className="lg:hidden w-6" />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-black/95 backdrop-blur-lg transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {[...navLinks, ...rightLinks].map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl tracking-widest uppercase text-white/80 hover:text-white transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
