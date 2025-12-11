import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../constants';
import GlassCard from './ui/GlassCard';
import { Quote, Star } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
       <div className="container mx-auto px-6">
          <Reveal width="100%">
            <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-12">What People Say</h2>
          </Reveal>
          
          {/* 
             CRITICAL FIX: 
             Replaced fixed height container with CSS Grid Stack.
             All items sit in col 1 / row 1.
             The container naturally expands to fit the tallest/active item.
          */}
          <div className="grid grid-cols-1 relative max-w-4xl mx-auto items-center">
             {TESTIMONIALS.map((t, idx) => (
               <div 
                 key={t.id}
                 className={`col-start-1 row-start-1 w-full transition-all duration-700 ease-in-out transform ${
                   idx === activeIndex 
                    ? 'opacity-100 translate-x-0 scale-100 z-10 relative' 
                    : 'opacity-0 translate-x-12 scale-95 z-0 pointer-events-none absolute inset-0'
                 }`}
               >
                 {/* Only the active card pushes the layout height if needed, others are absolute */}
                 <div className={idx === activeIndex ? 'block' : 'hidden md:block'}>
                    <GlassCard className="relative p-8 md:p-10 border-[var(--primary)] border-opacity-20 mt-6 mx-2">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--primary-fg)] shadow-lg shadow-cyan-500/40 z-20">
                           <Quote size={20} fill="currentColor" />
                        </div>
                        
                        <div className="flex flex-col items-center text-center pt-6">
                          <p className="text-[var(--text-primary)] text-lg md:text-xl italic leading-relaxed mb-8">
                              "{t.quote}"
                          </p>
                          <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill={i < (t.rating || 5) ? "#eab308" : "transparent"} className={i < (t.rating || 5) ? "text-yellow-500" : "text-gray-600"} />
                            ))}
                          </div>
                          <h4 className="font-bold text-[var(--text-primary)] text-xl">{t.name}</h4>
                          <p className="text-sm font-semibold text-[var(--primary)]">{t.role}</p>
                        </div>
                    </GlassCard>
                 </div>
               </div>
             ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-10 bg-[var(--primary)]' : 'w-2 bg-[var(--text-secondary)] opacity-50'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
       </div>
    </section>
  );
};

export default Testimonials;