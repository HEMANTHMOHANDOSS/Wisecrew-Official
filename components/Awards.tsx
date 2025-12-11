import React, { useState, useEffect } from 'react';
import { AWARDEES } from '../constants';
import GlassCard from './ui/GlassCard';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const Awards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % AWARDEES.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + AWARDEES.length) % AWARDEES.length);
  };

  // Auto slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="awards" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal width="100%">
          <div className="flex flex-col items-center mb-12">
             <div className="p-4 bg-yellow-500/10 rounded-full text-yellow-500 mb-4 border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
               <Award size={32} />
             </div>
             <h2 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] text-center leading-snug">Wisecrew Best Teacher Awards 2025</h2>
          </div>
        </Reveal>

        <Reveal width="100%" className="relative max-w-5xl mx-auto">
           {/* Carousel Container */}
           <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out" 
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                 {AWARDEES.map((awardee) => (
                    <div key={awardee.id} className="w-full flex-shrink-0 px-2 md:px-4">
                       <GlassCard className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-10 bg-gradient-to-br from-[var(--glass-bg)] to-transparent border-[var(--glass-border)]">
                          {/* Image Section */}
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full"></div>
                            <img 
                              src={awardee.image} 
                              alt={awardee.name} 
                              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-yellow-500/50 shadow-2xl mx-auto"
                            />
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border-2 border-[var(--bg-primary)] whitespace-nowrap">
                              WINNER
                            </div>
                          </div>
                          
                          {/* Content Section */}
                          <div className="text-center md:text-left flex-1 min-w-0 w-full mt-4 md:mt-0">
                             <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-1 break-words leading-tight">{awardee.name}</h3>
                             <p className="text-[var(--primary)] font-medium mb-4 md:mb-6 text-base md:text-lg">{awardee.role}</p>
                             <div className="w-16 md:w-20 h-1 bg-yellow-500 mx-auto md:mx-0 mb-4 md:mb-6 rounded-full opacity-50"></div>
                             <p className="text-[var(--text-secondary)] italic text-lg md:text-xl leading-relaxed break-words">"{awardee.description}"</p>
                          </div>
                       </GlassCard>
                    </div>
                 ))}
              </div>
           </div>

           {/* Desktop Controls (Sides) - Hidden on Mobile */}
           <button 
             onClick={prevSlide}
             className="hidden md:block absolute top-1/2 -left-4 lg:-left-12 -translate-y-1/2 p-4 rounded-full glass-panel text-[var(--text-primary)] hover:bg-[var(--glass-border)] transition-colors z-10"
             aria-label="Previous Slide"
           >
             <ChevronLeft size={24} />
           </button>
           <button 
             onClick={nextSlide}
             className="hidden md:block absolute top-1/2 -right-4 lg:-right-12 -translate-y-1/2 p-4 rounded-full glass-panel text-[var(--text-primary)] hover:bg-[var(--glass-border)] transition-colors z-10"
             aria-label="Next Slide"
           >
             <ChevronRight size={24} />
           </button>

           {/* Mobile Controls & Indicators (Bottom) */}
           <div className="flex flex-col items-center gap-6 mt-8">
              {/* Mobile Arrow Buttons */}
              <div className="flex md:hidden gap-6">
                 <button onClick={prevSlide} className="p-3 rounded-full glass-panel text-[var(--text-primary)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)]">
                    <ChevronLeft size={24} />
                 </button>
                 <button onClick={nextSlide} className="p-3 rounded-full glass-panel text-[var(--text-primary)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)]">
                    <ChevronRight size={24} />
                 </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2">
                 {AWARDEES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-yellow-500' : 'w-2 bg-[var(--text-secondary)] opacity-30'}`}
                      aria-label={`Go to slide ${idx+1}`}
                    />
                 ))}
              </div>
           </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Awards;