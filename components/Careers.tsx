import React, { useState } from 'react';
import { JOBS } from '../constants';
import GlassCard from './ui/GlassCard';
import { Briefcase, Check, ChevronDown, ChevronUp, MapPin, Filter, Star } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import SectionDivider from './ui/SectionDivider';

interface CareersProps {
  onApply: (role: string, type: string) => void;
}

const Careers: React.FC<CareersProps> = ({ onApply }) => {
  const [filter, setFilter] = useState('All');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const tags = ['All', 'Development', 'Design', 'Marketing', 'AI'];

  const filteredJobs = filter === 'All' 
    ? JOBS 
    : JOBS.filter(job => job.tags.includes(filter));

  const toggleExpand = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  return (
    <section id="careers" className="py-24 relative bg-[var(--glass-bg)]">
       {/* Bottom Divider to transition back to transparent */}
       <SectionDivider position="bottom" variant="tilt" />

       <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">Careers & Open Positions</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              Join the Wisecrew family. We are looking for passionate individuals to work on innovative projects.
            </p>
          </div>
        </Reveal>

        {/* Filter */}
        <Reveal width="100%" className="mb-10">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Filter size={20} className="text-[var(--text-secondary)] mr-2" />
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === tag 
                  ? 'bg-[var(--primary)] text-[var(--primary-fg)] shadow-lg shadow-cyan-500/20' 
                  : 'glass-panel text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-border)]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredJobs.map((job, idx) => {
            const badges = [
              { label: job.location, icon: MapPin, colorClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
              { label: job.type, icon: null, colorClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
              ...(job.tags || []).map(tag => ({ label: tag, icon: null, colorClass: 'bg-[var(--primary)] bg-opacity-10 text-[var(--primary)] border-[var(--primary)] border-opacity-20' }))
            ].filter(badge => badge.label && badge.label.trim().length > 0);

            return (
              <Reveal key={job.id} delay={idx * 100} className="h-full" width="100%">
                <GlassCard className="flex flex-col h-full border border-[var(--glass-border)] hover:border-[var(--primary)] group">
                   <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 group-hover:bg-blue-600/20 transition-colors">
                        <Briefcase size={22} />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-widest">{job.id}</span>
                   </div>
                   
                   <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary)] transition-colors">{job.title}</h3>
                   
                   <div className="flex flex-wrap gap-2 mb-4">
                      {badges.slice(0, 4).map((badge, i) => (
                        <span 
                          key={i} 
                          className={`text-[10px] px-2 py-1 rounded-md border flex items-center gap-1 font-medium ${badge.colorClass}`}
                        >
                          {badge.icon && <badge.icon size={10} />}
                          {badge.label}
                        </span>
                      ))}
                   </div>
                   
                   <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed line-clamp-3">
                     {job.description}
                   </p>
                   
                   <div className="mt-auto">
                      <button 
                        onClick={() => toggleExpand(job.id)}
                        className={`w-full flex items-center justify-between text-xs font-semibold py-3 px-4 border border-[var(--glass-border)] transition-all rounded-xl mb-3 ${expandedJob === job.id ? 'bg-[var(--glass-border)] text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-border)]'}`}
                      >
                        {expandedJob === job.id ? 'Hide Details' : 'View Job Details'}
                        {expandedJob === job.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedJob === job.id ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 bg-[var(--bg-secondary)]/50 rounded-xl border border-[var(--glass-border)] space-y-4">
                          {/* Responsibilities */}
                          <div>
                            <h4 className="text-xs font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wider">Key Responsibilities</h4>
                            <div className="space-y-2">
                              {job.responsibilities.map((resp, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                                  <Check size={12} className="text-[var(--primary)] mt-0.5 min-w-[12px]" />
                                  <span>{resp}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Perks */}
                          <div>
                             <h4 className="text-xs font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wider">Perks & Benefits</h4>
                             <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)] bg-[var(--primary)]/10 p-2 rounded-lg border border-[var(--primary)]/20">
                                <Star size={14} className="text-[var(--primary)] mt-0.5 min-w-[14px]" />
                                <span>{job.perks}</span>
                             </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => onApply(job.title, 'Job')}
                        className="group relative w-full py-3 text-sm font-bold text-[var(--primary-fg)] bg-[var(--primary)] rounded-xl hover:opacity-90 flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
                      >
                        <span className="relative z-10">Apply Now</span>
                        <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
                      </button>
                   </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
       </div>
    </section>
  );
};

export default Careers;