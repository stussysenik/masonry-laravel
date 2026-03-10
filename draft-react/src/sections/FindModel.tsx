import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const brands = ['SELECT BRAND', 'Lamborghini', 'Ferrari', 'Rolls-Royce', 'Bentley', 'Mercedes', 'BMW', 'Audi'];
const models = ['SELECT MODEL', 'Urus', 'Huracan', 'Aventador', 'Revuelto', '488 GTB', 'F8 Tributo', 'SF90'];

const FindModel = () => {
  const [selectedBrand, setSelectedBrand] = useState('SELECT BRAND');
  const [selectedModel, setSelectedModel] = useState('SELECT MODEL');
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <section className="relative bg-black py-20 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-white mb-4">FIND YOUR DREAM MODEL</h2>
          <p className="text-white/60 text-sm tracking-wide">
            Choose options from below and find your customization
          </p>
        </div>

        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Brand Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsBrandOpen(!isBrandOpen);
                setIsModelOpen(false);
              }}
              className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/20 text-white text-sm tracking-widest uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <span className={selectedBrand === 'SELECT BRAND' ? 'text-white/50' : 'text-white'}>
                {selectedBrand}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isBrandOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isBrandOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-black/95 border border-white/20 z-50 animate-fade-in">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setIsBrandOpen(false);
                    }}
                    className="w-full px-6 py-3 text-left text-sm tracking-widest uppercase text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Model Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsModelOpen(!isModelOpen);
                setIsBrandOpen(false);
              }}
              className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/20 text-white text-sm tracking-widest uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <span className={selectedModel === 'SELECT MODEL' ? 'text-white/50' : 'text-white'}>
                {selectedModel}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isModelOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isModelOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-black/95 border border-white/20 z-50 animate-fade-in">
                {models.map((model) => (
                  <button
                    key={model}
                    onClick={() => {
                      setSelectedModel(model);
                      setIsModelOpen(false);
                    }}
                    className="w-full px-6 py-3 text-left text-sm tracking-widest uppercase text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {model}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border border-white/30 text-white text-sm tracking-widest uppercase hover:bg-white/20 hover:border-white/50 transition-all duration-300">
            <Search className="w-4 h-4" />
            SEARCH
          </button>
        </div>
      </div>
    </section>
  );
};

export default FindModel;
