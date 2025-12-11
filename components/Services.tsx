import React from 'react';
import { SERVICES } from '../constants';
import GlassCard from './ui/GlassCard';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import SectionDivider from './ui/SectionDivider';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 relative bg-[var(--bg-secondary)]">
      <SectionDivider position="top" variant="tilt" className="opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <Reveal>
             <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
               Enterprise-Grade <br/>
               <span className="text-[var(--text-secondary)]">IT Solutions</span>
             </h2>
           </Reveal>
           <Reveal delay={100}>
             <p className="text-[var(--text-secondary)] max-w-md text-lg text-right md:text-left">
               We deliver end-to-end digital transformation services tailored for scalability and performance.
             </p>
           </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index * 100} className="h-full" width="100%">
              <GlassCard 
                className="group h-full p-8 flex flex-col justify-between bg-[var(--bg-primary)] hover:bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--primary)]/30 transition-all duration-500"
                hoverEffect={false}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300 shadow-lg">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{service.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--glass-border)] group-hover:border-[var(--glass-border)]/50">
                  <span className="text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors">Explore Solution</span>
                  <div className="p-2 rounded-full bg-white/5 text-[var(--text-primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all transform group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;