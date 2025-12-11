import React, { useState } from 'react';
import { INTERNSHIPS } from '../constants';
import GlassCard from './ui/GlassCard';
import { Reveal } from './ui/Reveal';
import { CheckCircle, Clock, Gift, ArrowRight, Laptop, MapPin } from 'lucide-react';
import SectionDivider from './ui/SectionDivider';

interface InternshipsProps {
  onApply: (role: string, type: string) => void;
}

const Internships: React.FC<InternshipsProps> = ({ onApply }) => {
  const [filter, setFilter] = useState<'All' | 'Free' | 'Paid' | 'Online' | 'Offline'>('All');

  const filteredInternships = INTERNSHIPS.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Free') return item.type === 'Free';
    if (filter === 'Paid') return item.type === 'Paid';
    if (filter === 'Online') return item.mode === 'Online';
    if (filter === 'Offline') return item.mode === 'Offline';
    return true;
  });

  return (
    <section id="internships" className="py-24 relative overflow-hidden">
      {/* Dividers */}
      <SectionDivider position="top" variant="tilt" />
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">Internship & Training Programs</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              Kickstart your career with our industry-aligned internship programs. Choose from free or paid options, online or offline.
            </p>
          </div>
        </Reveal>

        {/* Free Internship Highlight */}
        <Reveal width="100%" className="mb-16">
          <GlassCard className="border-[var(--primary)] border-opacity-30 bg-gradient-to-br from-[var(--glass-bg)] to-transparent relative overflow-hidden shadow-2xl shadow-cyan-500/5">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] opacity-10 blur-[80px] rounded-full"></div>
             <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex-1">
                   <div className="inline-block px-3 py-1 rounded-full bg-[var(--primary)] bg-opacity-20 text-[var(--primary)] text-xs font-bold uppercase mb-4 border border-[var(--primary)] border-opacity-30">
                      Featured Program
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">Free Internship Program 🌟</h3>
                   <p className="text-[var(--text-secondary)] mb-6 text-lg">
                      Exclusive opportunity for meritorious students to work on real-world projects without any cost. Limited slots available!
                   </p>
                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <li className="flex items-center text-sm text-[var(--text-secondary)]"><CheckCircle size={18} className="text-green-400 mr-2"/> Real-time Live Projects</li>
                      <li className="flex items-center text-sm text-[var(--text-secondary)]"><CheckCircle size={18} className="text-green-400 mr-2"/> Expert Mentor Support</li>
                      <li className="flex items-center text-sm text-[var(--text-secondary)]"><CheckCircle size={18} className="text-green-400 mr-2"/> Verifiable Certificate</li>
                      <li className="flex items-center text-sm text-[var(--text-secondary)]"><CheckCircle size={18} className="text-green-400 mr-2"/> Placement Assistance</li>
                   </ul>
                </div>
                <div className="w-full md:w-auto">
                   <button 
                      onClick={() => onApply('Free Internship Program', 'Internship')}
                      className="group relative block w-full text-center px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-blue-600 text-[var(--primary-fg)] font-bold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                   >
                      <span className="relative z-10">Apply For Free Slot</span>
                      <div className="absolute inset-0 bg-white/30 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
                   </button>
                </div>
             </div>
          </GlassCard>
        </Reveal>

        {/* Filter Bar */}
        <Reveal width="100%" delay={100} className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Free', 'Paid', 'Online', 'Offline'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === f 
                    ? 'bg-[var(--primary)] text-[var(--primary-fg)] shadow-lg shadow-cyan-500/25 scale-105' 
                    : 'glass-panel text-[var(--text-secondary)] hover:bg-[var(--glass-border)] hover:text-[var(--text-primary)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Internship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredInternships.map((internship, index) => (
            <Reveal key={internship.id} delay={index * 100} className="h-full" width="100%">
              <GlassCard className="flex flex-col h-full border-t-4 border-t-transparent hover:border-t-[var(--primary)]">
                <div className="flex justify-between items-start mb-4">
                  {internship.type && internship.type.trim() !== '' && (
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${internship.type === 'Free' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {internship.type}
                    </div>
                  )}
                  {internship.mode && internship.mode.trim() !== '' && (
                    <div className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-xs font-medium flex items-center gap-1">
                       {internship.mode === 'Online' ? <Laptop size={12}/> : <MapPin size={12}/>}
                      {internship.mode}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{internship.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6 flex-grow">{internship.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] mb-6 border-t border-[var(--glass-border)] pt-4">
                  <span className="flex items-center gap-1"><Clock size={14} /> {internship.duration}</span>
                  <span className="flex items-center gap-1"><Gift size={14} /> Certified</span>
                </div>
                
                <button 
                  onClick={() => onApply(internship.title, 'Internship')}
                  className="group relative w-full py-3 rounded-xl border border-[var(--glass-border)] text-[var(--text-primary)] font-medium transition-all overflow-hidden hover:border-[var(--primary)] hover:text-[var(--primary-fg)] bg-[var(--glass-bg)] hover:bg-[var(--primary)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">Apply Now <ArrowRight size={14} /></span>
                </button>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Process Steps */}
        <Reveal width="100%" className="pt-10 border-t border-[var(--glass-border)]">
          <h3 className="text-2xl font-bold text-center text-[var(--text-primary)] mb-12">Selection Process</h3>
          
          <div className="hidden md:flex justify-between items-start relative max-w-4xl mx-auto">
             <div className="absolute top-6 left-10 right-10 h-1 bg-[var(--glass-border)] -z-0 -translate-y-1/2 rounded-full"></div>
             
             {['Register', 'Shortlisting', 'Online Test', 'Interview', 'Offer Letter'].map((step, idx) => (
               <div key={idx} className="flex flex-col items-center z-10 w-32 group">
                 <div className="w-12 h-12 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] font-bold mb-4 shadow-lg shadow-cyan-500/20 transform transition-transform group-hover:scale-110 group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-fg)]">
                   {idx + 1}
                 </div>
                 <span className="text-sm font-medium text-[var(--text-primary)] bg-[var(--glass-bg)] px-3 py-2 rounded-lg text-center shadow-sm w-full border border-[var(--glass-border)] backdrop-blur-md">
                   {step}
                 </span>
               </div>
             ))}
          </div>

          <div className="md:hidden space-y-4">
            {['Register', 'Shortlisting', 'Online Test', 'Interview', 'Offer Letter'].map((step, idx) => (
               <div key={idx} className="flex items-center gap-4 p-4 rounded-xl glass-panel bg-[var(--bg-secondary)]/50">
                 <div className="w-8 h-8 rounded-full bg-[var(--primary)] bg-opacity-20 text-[var(--primary)] flex items-center justify-center font-bold text-sm shrink-0 border border-[var(--primary)] border-opacity-30">
                   {idx + 1}
                 </div>
                 <span className="text-[var(--text-primary)] font-semibold">{step}</span>
               </div>
             ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Internships;