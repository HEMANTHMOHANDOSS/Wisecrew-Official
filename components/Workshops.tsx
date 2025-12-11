import React from 'react';
import GlassCard from './ui/GlassCard';
import { Calendar, Video, ArrowRight } from 'lucide-react';
import { WORKSHOPS } from '../constants';
import { Reveal } from './ui/Reveal';

const Workshops: React.FC = () => {
  return (
    <section className="py-24 bg-[var(--glass-bg)]">
       <div className="container mx-auto px-6">
          <Reveal width="100%">
            {/* Fixed Heading Alignment: Centered to match other sections */}
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">Workshops & Events</h2>
               <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                 Join our upcoming sessions to upgrade your skills.
               </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {WORKSHOPS.map((workshop, idx) => (
              <Reveal key={workshop.id} delay={idx * 150} width="100%">
                <GlassCard className={`border-l-4 ${workshop.status === 'Upcoming' ? 'border-l-purple-500' : 'border-l-slate-500'}`}>
                   {/* Flex Col on Mobile, Row on Desktop */}
                   <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                      
                      {/* Date Box */}
                      <div className={`flex-shrink-0 w-full md:w-20 h-20 rounded-2xl flex md:flex-col flex-row items-center justify-center gap-2 md:gap-0 border ${workshop.status === 'Upcoming' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-slate-700/20 text-slate-400 border-slate-600/30'}`}>
                         <span className="text-sm md:text-xs font-bold uppercase">{workshop.date.split(' ')[0]}</span>
                         <span className="text-2xl md:text-3xl font-bold">{workshop.date.split(' ')[1].replace(',','')}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow w-full text-left min-w-0">
                         <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2 break-words">{workshop.title}</h3>
                         <div className="flex flex-wrap items-center justify-start gap-4 text-sm text-[var(--text-secondary)] mb-3">
                            <span className="flex items-center gap-1"><Video size={14} /> {workshop.mode}</span>
                            <span className="flex items-center gap-1"><Calendar size={14} /> {workshop.date}</span>
                            {workshop.status === 'Completed' && <span className="px-2 py-0.5 rounded bg-slate-700 text-xs text-white">Completed</span>}
                         </div>
                         <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {workshop.description}
                         </p>
                      </div>

                      {/* Button */}
                      <div className="w-full md:w-auto mt-2 md:mt-0">
                        {workshop.status === 'Upcoming' ? (
                          <button className="w-full md:w-auto px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 whitespace-nowrap">
                             Register Now <ArrowRight size={16}/>
                          </button>
                        ) : (
                          <button className="w-full md:w-auto px-6 py-3 rounded-lg border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap">
                            View Summary
                          </button>
                        )}
                      </div>
                   </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-8">
             <p className="text-[var(--text-secondary)] text-sm animate-pulse">More events updating soon...</p>
          </div>
       </div>
    </section>
  );
};

export default Workshops;