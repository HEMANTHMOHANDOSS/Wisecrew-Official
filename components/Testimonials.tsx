
import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../constants';
import GlassCard from './ui/GlassCard';
import { Quote, Star, Hexagon, Circle, Gem, Monitor } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-[#020617]">
       {/* Background decorative elements */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="container mx-auto px-6 relative z-10">
          <Reveal width="100%">
            <div className="flex flex-col items-center text-center mb-20">
                {/* 1. Pill Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-lg hover:bg-white/10 transition-colors cursor-default">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-300 tracking-wider uppercase">Testimonial</span>
                </div>

                {/* 2. Headline */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                    Customer Reviews About <br className="hidden md:block"/>
                    <span className="text-slate-500">Work, Usability and Design.</span>
                </h2>

                {/* 3. Subtext */}
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                    Hear from our happy clients! See how we’ve helped them achieve their goals and create lasting impact.
                </p>

                {/* 4. Client Logos (Simulating the visual style) */}
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-12">
                    
                    {/* Logo 1: Rectangular Glass Style */}
                    <div className="group relative w-40 h-24 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300">
                        <Monitor size={28} className="text-slate-400 mb-2 group-hover:text-blue-400 transition-colors" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">OPERA'TRI</span>
                    </div>

                    {/* Logo 2: Central Highlight (Circular) */}
                    <div className="group relative w-32 h-32 rounded-full p-[1px] bg-gradient-to-b from-white/20 to-transparent cursor-pointer hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden">
                             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             {/* Decorative ring */}
                             <div className="w-24 h-24 border border-dashed border-white/20 rounded-full absolute animate-[spin_10s_linear_infinite]"></div>
                             <Gem size={32} className="text-white mb-1 z-10" />
                             <span className="text-[10px] font-bold text-white z-10 tracking-widest bg-white/10 px-2 py-0.5 rounded mt-1">PROPRETE</span>
                        </div>
                    </div>

                    {/* Logo 3: Circular Glass */}
                    <div className="group relative w-24 h-24 bg-white/5 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all duration-300 shadow-lg">
                        <span className="font-bold text-2xl text-slate-400 group-hover:text-white font-serif italic">LER</span>
                    </div>
                </div>

                {/* 5. Contact Button */}
                <button 
                    onClick={scrollToContact}
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1 mb-20"
                >
                    Contact Us
                </button>
            </div>
          </Reveal>
          
          {/* Carousel Implementation */}
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
                 <div className={idx === activeIndex ? 'block' : 'hidden md:block'}>
                    <GlassCard className="relative p-8 md:p-12 border-[var(--primary)] border-opacity-20 mx-2 bg-[#0a0a0a]/80 backdrop-blur-xl group hover:border-blue-500/50 transition-colors">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-500/20 z-20 group-hover:scale-110 transition-transform">
                           <Quote size={24} fill="currentColor" />
                        </div>
                        
                        <div className="flex flex-col items-center text-center pt-8">
                          <p className="text-slate-200 text-lg md:text-2xl font-light leading-relaxed mb-8 italic">
                              "{t.quote}"
                          </p>
                          <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={18} fill={i < (t.rating || 5) ? "#eab308" : "transparent"} className={i < (t.rating || 5) ? "text-yellow-500" : "text-gray-700"} />
                            ))}
                          </div>
                          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full mb-4"></div>
                          <h4 className="font-bold text-white text-xl">{t.name}</h4>
                          <p className="text-sm font-medium text-blue-400 uppercase tracking-wider">{t.role}</p>
                        </div>
                    </GlassCard>
                 </div>
               </div>
             ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-10 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
       </div>
    </section>
  );
};

export default Testimonials;
