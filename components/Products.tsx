import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import GlassCard from './ui/GlassCard';
import { Reveal } from './ui/Reveal';
import { ExternalLink } from 'lucide-react';
import SectionDivider from './ui/SectionDivider';

const Products: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <section id="products" className="py-24 bg-[var(--glass-bg)] relative">
      <SectionDivider position="top" variant="wave" />
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">Our Products</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              Ready-to-deploy software solutions tailored for various industries.
            </p>
          </div>
        </Reveal>

        {/* Filter Pills */}
        <Reveal width="100%" className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setFilter(cat)}
                 className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                   filter === cat 
                   ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105' 
                   : 'glass-panel text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                 }`}
               >
                 {cat}
               </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredProducts.map((product, idx) => (
             <Reveal key={product.id} delay={idx * 100} className="h-full" width="100%">
               <GlassCard className="flex flex-col h-full hover:border-[var(--primary)] border-transparent border">
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-xl font-bold text-[var(--text-primary)]">{product.name}</h3>
                     {product.category && (
                       <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] border border-[var(--primary)] bg-[var(--primary)] bg-opacity-10 px-2 py-1 rounded-md">
                         {product.category}
                       </span>
                     )}
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm mb-8 flex-grow leading-relaxed">{product.description}</p>
                  <button className="group relative w-full py-3 rounded-xl border border-[var(--glass-border)] text-[var(--primary)] font-semibold text-sm hover:bg-[var(--primary)] hover:text-[var(--primary-fg)] transition-all flex items-center justify-center gap-2 overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">View Demo <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                    <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
                  </button>
               </GlassCard>
             </Reveal>
           ))}
        </div>
      </div>
      
      <SectionDivider position="bottom" variant="curve" />
    </section>
  );
};

export default Products;