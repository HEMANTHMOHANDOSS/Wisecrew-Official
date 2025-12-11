import React from 'react';
import { ArrowRight, PlayCircle, Rocket } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { STATS } from '../constants';

interface HeroProps {
  onApply: (role: string, type: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onApply }) => {
  const BRANCHES = ["Wisecrew Academy", "Wisecrew Products", "Wisecrew Services", "Wisecrew Publications", "Wisecrew Careers"];

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#020617]">
      
      {/* Cosmic Background - Intensified for Neon Look */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Central Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] opacity-70 mix-blend-screen"></div>
        
        {/* Dynamic Beams */}
        <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent opacity-50 blur-[1px]"></div>
        <div className="absolute top-0 right-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent opacity-50 blur-[1px]"></div>
        
        {/* Grid Floor */}
        <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(59,130,246,0.05)_100%)]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-150 contrast-200 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Announcement Pill - Sleeker */}
        <Reveal width="100%" className="flex justify-center mb-12">
           <div className="group relative inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300 cursor-default shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="relative text-xs font-bold tracking-[0.2em] uppercase text-slate-300 group-hover:text-white transition-colors">
                Next-Gen Enterprise Ecosystem
              </span>
           </div>
        </Reveal>

        {/* Main Heading - Daring Needs Style */}
        <Reveal width="100%" delay={100} className="max-w-7xl mx-auto mb-8">
           <div className="relative">
             <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-white leading-[0.85] select-none">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  WISECREW
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x bg-[length:200%_auto] pb-4">
                  SOLUTIONS
                </span>
             </h1>
             {/* Decorative lines around text */}
             <div className="absolute -left-10 top-1/2 h-24 w-1 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50 hidden lg:block"></div>
             <div className="absolute -right-10 top-1/2 h-24 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50 hidden lg:block"></div>
           </div>
        </Reveal>

        {/* Subheading - Group of Companies */}
        <Reveal width="100%" delay={200} className="max-w-3xl mx-auto mb-16">
           <div className="flex flex-col items-center gap-4">
             <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
             <h2 className="text-xl md:text-3xl font-light tracking-[0.3em] uppercase text-slate-300">
               Wisecrew Group of Companies
             </h2>
             <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-500 to-transparent"></div>
           </div>

           {/* Running Marquee of Branches */}
           <div className="w-full overflow-hidden mt-10 mb-2 relative">
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>
              <div className="flex w-full">
                <div className="flex animate-infinite-scroll min-w-full shrink-0 gap-12 px-6 items-center">
                  {BRANCHES.map((branch, i) => (
                    <span key={i} className="text-xl md:text-2xl font-bold uppercase tracking-widest bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 bg-clip-text text-transparent whitespace-nowrap opacity-90 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                      {branch}
                    </span>
                  ))}
                </div>
                <div className="flex animate-infinite-scroll min-w-full shrink-0 gap-12 px-6 items-center" aria-hidden="true">
                  {BRANCHES.map((branch, i) => (
                    <span key={`dup-${i}`} className="text-xl md:text-2xl font-bold uppercase tracking-widest bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 bg-clip-text text-transparent whitespace-nowrap opacity-90 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                      {branch}
                    </span>
                  ))}
                </div>
              </div>
           </div>
           
           <p className="mt-6 text-lg md:text-xl text-slate-400/80 leading-relaxed font-light max-w-2xl mx-auto">
             Architecting the digital backbone of tomorrow. Bridging visionary education with enterprise-grade IT solutions to build scalable systems and future-ready careers.
           </p>
        </Reveal>

        {/* CTA Buttons - Premium Glass */}
        <Reveal width="100%" delay={300} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
           <button 
             onClick={() => onApply('General Inquiry', 'Service')}
             className="relative group px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-slate-200 transition-all overflow-hidden"
           >
             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
             <span className="relative flex items-center gap-2">
               Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </span>
           </button>
           <button 
              onClick={() => onApply('Demo Request', 'Service')}
              className="px-10 py-5 rounded-full border border-white/10 text-white font-bold text-lg hover:bg-white/5 hover:border-white/30 transition-all flex items-center gap-2 backdrop-blur-sm"
           >
             <PlayCircle size={20} /> Request Demo
           </button>
        </Reveal>

        {/* Stats Strip - Integrated with Grid */}
        <Reveal width="100%" delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-white/5 pt-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            {STATS.map((stat, idx) => (
               <div key={idx} className="flex flex-col items-center group relative">
                  <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{stat.value}{stat.suffix}</span>
                  <span className="relative text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">{stat.label}</span>
               </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Hero;