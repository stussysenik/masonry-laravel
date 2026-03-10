import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    models: ['Lamborghini', 'Ferrari', 'Rolls-Royce', 'Bentley', 'Mercedes', 'BMW', 'Audi'],
    services: ['Atelier', 'Configurator', 'Rims', 'Boutique', 'Cars for Sale'],
    company: ['About Us', 'News', 'Events', 'Career', 'Contact'],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <a href="#" className="mansory-logo text-white inline-block mb-6">
              MANSORY
            </a>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-8">
              MANSORY is a luxury car customization company that creates unique masterpieces 
              defying convention. We transform the world's finest automobiles into exclusive works of art.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Models Links */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-6">Models</h4>
            <ul className="space-y-3">
              {footerLinks.models.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/50 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/50 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/50 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">
              © 2026 MANSORY. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 text-xs hover:text-white/60 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/40 text-xs hover:text-white/60 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/40 text-xs hover:text-white/60 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
