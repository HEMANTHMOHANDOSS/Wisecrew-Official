import React from 'react';
import { Reveal } from './ui/Reveal';
import GlassCard from './ui/GlassCard';
import { Flag, Rocket, Briefcase, Globe, Zap, Building2, TrendingUp } from 'lucide-react';

const MILESTONES = [
  {
    year: '2022',
    title: 'The Inception',
    description: 'Established Wisecrew Solutions with a bold vision to bridge the gap between academic education and enterprise technology needs.',
    icon: Flag,
    color: 'text-blue-400',
    borderColor: 'border-blue-500',
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    year: '2023',
    title: 'Foundation & Service',
    description: 'Officially MSME Approved. Rapidly scaled our IT Services division, delivering high-quality web and mobile solutions to domestic clients.',
    icon: Building2,
    color: 'text-amber-400',
    borderColor: 'border-amber-500',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    year: '2024',
    title: 'Product Pivot',
    description: 'Transitioned into a Product-based company. Launched flagship SaaS tools like Wisecrew HRMS, Chatbots, and ERP systems.',
    icon: Rocket,
    color: 'text-purple-400',
    borderColor: 'border-purple-500',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    year: '2025',
    title: 'Global Ecosystem',
    description: 'Launched Wisecrew Academy, Wisecrew Careers, Publications, and expanded operations to serve International Clients.',
    icon: Globe,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500',
    gradient: 'from-cyan-500 to-teal-500'
  }
];

const Milestones = () => {
  return (
    <section id="milestones" className="py-32 relative overflow-hidden bg-[#020617]">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[1000px] bg-blue-900/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
           <div className="text-center mb-24">
              <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.2em] mb-4 block">Our Journey</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                 Milestone <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Timeline</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">From humble beginnings to a global ecosystem.</p>
           </div>
        </Reveal>

        <div className="relative max-w-5xl mx-auto">
           {/* Central Line */}
           <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-ml-[1px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent">
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-500 to-purple-500 opacity-50 blur-[2px]"></div>
           </div>

           <div className="space-y-16 md:space-y-32">
              {MILESTONES.map((item, index) => (
                 <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Date/Year (Opposite side of card on desktop) */}
                    <div className={`hidden md:flex flex-1 items-center w-full px-12 ${index % 2 === 0 ? 'justify-start text-left' : 'justify-end text-right'}`}>
                       <Reveal width="100%" className={index % 2 === 0 ? '' : 'flex justify-end'}>
                          <div className={`text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none leading-none`}>
                             {item.year}
                          </div>
                       </Reveal>
                    </div>

                    {/* Center Node */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#020617] border-4 border-slate-800 z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] group">
                       <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.gradient} animate-pulse shadow-lg`}></div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 w-full pl-16 md:pl-0 md:px-12">
                       <Reveal width="100%" delay={index * 150}>
                          <GlassCard className={`p-8 relative overflow-hidden group border-t-4 ${item.borderColor} hover:scale-[1.02] transition-transform duration-500`}>
                             
                             {/* Mobile Year display */}
                             <div className="md:hidden absolute top-4 right-4 text-4xl font-bold text-white/5 select-none">{item.year}</div>
                             
                             <div className="flex items-start gap-5 mb-4 relative z-10">
                                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${item.color} shadow-inner`}>
                                   <item.icon size={28} />
                                </div>
                                <div>
                                   <div className={`text-xs font-bold uppercase tracking-widest mb-2 opacity-80 ${item.color}`}>{item.year}</div>
                                   <h3 className="text-2xl font-bold text-white leading-tight">{item.title}</h3>
                                </div>
                             </div>
                             
                             <p className="text-slate-400 leading-relaxed text-sm md:text-base relative z-10">
                                {item.description}
                             </p>
                             
                             {/* Neon Glow effect on hover */}
                             <div className={`absolute -inset-1 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-2xl bg-gradient-to-r ${item.gradient}`}></div>
                             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </GlassCard>
                       </Reveal>
                    </div>
                 </div>
              ))}
           </div>
           
           {/* Timeline End Cap */}
           <div className="absolute bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-700"></div>
        </div>
      </div>
    </section>
  );
};

export default Milestones;