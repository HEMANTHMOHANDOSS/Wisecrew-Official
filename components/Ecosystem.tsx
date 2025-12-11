import React from 'react';
import { GraduationCap, Briefcase, Package, Globe, ArrowRight, ExternalLink, ScrollText } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import GlassCard from './ui/GlassCard';

interface EcosystemProps {
  onNavigate: (view: string) => void;
}

const Ecosystem: React.FC<EcosystemProps> = ({ onNavigate }) => {
  
  const handleCareerClick = () => {
    window.open('https://wisecrew-careers.vercel.app/', '_blank');
  };

  return (
    <section className="py-32 relative bg-[#020617] overflow-hidden">
       {/* Background Grid & Glows */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="container mx-auto px-4 relative z-10">
          <Reveal width="100%">
             <div className="text-center mb-16">
               <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.2em] mb-4 block">The Network</span>
               <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                 Wisecrew <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Ecosystem</span>
               </h2>
               <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                 An integrated suite of platforms designed to educate, build, employ, and innovate.
               </p>
             </div>
          </Reveal>

          {/* Flowchart Layout */}
          <div className="relative max-w-[1400px] mx-auto pt-10 pb-20">
             
             {/* --- SVG Connector Lines (Updated for 5 branches) --- */}
             <div className="absolute inset-0 pointer-events-none hidden xl:block">
                <svg className="w-full h-full" viewBox="0 0 1400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                   {/* Root to Horizontal Bar */}
                   <path d="M700 80 L700 160" stroke="url(#gradient-line)" strokeWidth="2" />
                   
                   {/* Horizontal Bar (Spanning from Node 1 to Node 5) */}
                   <path d="M140 160 L1260 160" stroke="url(#gradient-line)" strokeWidth="2" />
                   
                   {/* Downward Paths to Children (5 Nodes) */}
                   <path d="M140 160 L140 220" stroke="url(#gradient-line)" strokeWidth="2" />  {/* Academy */}
                   <path d="M420 160 L420 220" stroke="url(#gradient-line)" strokeWidth="2" />  {/* Products */}
                   <path d="M700 160 L700 220" stroke="url(#gradient-line)" strokeWidth="2" />  {/* Services */}
                   <path d="M980 160 L980 220" stroke="url(#gradient-line)" strokeWidth="2" />  {/* Publications */}
                   <path d="M1260 160 L1260 220" stroke="url(#gradient-line)" strokeWidth="2" /> {/* Careers */}

                   <defs>
                      <linearGradient id="gradient-line" x1="700" y1="80" x2="700" y2="220" gradientUnits="userSpaceOnUse">
                         <stop stopColor="#3b82f6" stopOpacity="0.8" />
                         <stop offset="1" stopColor="#06b6d4" stopOpacity="0.2" />
                      </linearGradient>
                   </defs>
                </svg>
             </div>

             {/* --- Root Node (Wisecrew Group of Companies) --- */}
             <div className="flex justify-center mb-24 relative z-20">
                <div className="relative group">
                   {/* Glowing Halo */}
                   <div className="absolute inset-0 bg-blue-500 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                   
                   <GlassCard className="w-64 md:w-80 p-8 flex flex-col items-center text-center border-blue-500/30 bg-[#0a0a0a]/90 backdrop-blur-xl relative z-10 !rounded-full aspect-square justify-center">
                      <h3 className="text-xl md:text-3xl font-bold text-white leading-tight">Wisecrew Group of Companies</h3>
                   </GlassCard>
                </div>
             </div>

             {/* --- Child Nodes Grid (5 Columns on XL) --- */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 relative z-20">
                
                {/* Node 1: Academy */}
                <Reveal delay={100} width="100%">
                   <div onClick={() => onNavigate('academy')} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] border border-white/5 hover:border-blue-500/50 transition-all duration-300 p-8 h-full min-h-[280px] flex flex-col items-center text-center">
                         <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <div className="w-14 h-14 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                            <GraduationCap size={28} />
                         </div>
                         <h4 className="text-xl font-bold text-white mb-3">Wisecrew Academy</h4>
                         <p className="text-sm text-slate-400 leading-relaxed mb-6">EdTech platform offering internships & industrial training.</p>
                         <div className="mt-auto px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors">
                            Enter Academy
                         </div>
                      </div>
                   </div>
                </Reveal>

                {/* Node 2: Products */}
                <Reveal delay={200} width="100%">
                   <div onClick={() => onNavigate('products')} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] border border-white/5 hover:border-purple-500/50 transition-all duration-300 p-8 h-full min-h-[280px] flex flex-col items-center text-center">
                         <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <div className="w-14 h-14 rounded-full bg-purple-900/30 text-purple-400 flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
                            <Package size={28} />
                         </div>
                         <h4 className="text-xl font-bold text-white mb-3">Wisecrew Products</h4>
                         <p className="text-sm text-slate-400 leading-relaxed mb-6">SaaS solutions and enterprise software tools.</p>
                         <div className="mt-auto px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white group-hover:bg-purple-600 group-hover:border-purple-600 transition-colors">
                            View Products
                         </div>
                      </div>
                   </div>
                </Reveal>

                {/* Node 3: Services */}
                <Reveal delay={300} width="100%">
                   <div onClick={() => onNavigate('services')} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] border border-white/5 hover:border-cyan-500/50 transition-all duration-300 p-8 h-full min-h-[280px] flex flex-col items-center text-center">
                         <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <div className="w-14 h-14 rounded-full bg-cyan-900/30 text-cyan-400 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                            <Globe size={28} />
                         </div>
                         <h4 className="text-xl font-bold text-white mb-3">Wisecrew Services</h4>
                         <p className="text-sm text-slate-400 leading-relaxed mb-6">Custom development & digital transformation services.</p>
                         <div className="mt-auto px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white group-hover:bg-cyan-600 group-hover:border-cyan-600 transition-colors">
                            Explore Services
                         </div>
                      </div>
                   </div>
                </Reveal>

                 {/* Node 4: Publications (NEW) */}
                 <Reveal delay={350} width="100%">
                   <div onClick={() => onNavigate('publications')} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] border border-white/5 hover:border-teal-500/50 transition-all duration-300 p-8 h-full min-h-[280px] flex flex-col items-center text-center">
                         <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <div className="w-14 h-14 rounded-full bg-teal-900/30 text-teal-400 flex items-center justify-center mb-6 border border-teal-500/20 group-hover:scale-110 transition-transform">
                            <ScrollText size={28} />
                         </div>
                         <h4 className="text-xl font-bold text-white mb-3">Wisecrew Publications</h4>
                         <p className="text-sm text-slate-400 leading-relaxed mb-6">Research assistance, book writing & journal publications.</p>
                         <div className="mt-auto px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white group-hover:bg-teal-600 group-hover:border-teal-600 transition-colors">
                            Start Research
                         </div>
                      </div>
                   </div>
                </Reveal>

                {/* Node 5: Careers (External) */}
                <Reveal delay={400} width="100%">
                   <div onClick={handleCareerClick} className="group cursor-pointer relative">
                      {/* External Link Indicator */}
                      <div className="absolute top-4 right-4 text-slate-600 group-hover:text-amber-500 transition-colors">
                         <ExternalLink size={16} />
                      </div>
                      <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] border border-white/5 hover:border-amber-500/50 transition-all duration-300 p-8 h-full min-h-[280px] flex flex-col items-center text-center">
                         <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <div className="w-14 h-14 rounded-full bg-amber-900/30 text-amber-400 flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform">
                            <Briefcase size={28} />
                         </div>
                         <h4 className="text-xl font-bold text-white mb-3">Wisecrew Careers</h4>
                         <p className="text-sm text-slate-400 leading-relaxed mb-6">Join our team. Explore open positions and internships.</p>
                         <div className="mt-auto px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white group-hover:bg-amber-600 group-hover:border-amber-600 transition-colors flex items-center gap-2">
                            Apply Now <ArrowRight size={12} />
                         </div>
                      </div>
                   </div>
                </Reveal>

             </div>
          </div>
       </div>
    </section>
  );
};

export default Ecosystem;