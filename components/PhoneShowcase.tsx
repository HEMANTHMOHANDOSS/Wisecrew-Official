import React, { useState, useRef, useEffect } from 'react';
import { Reveal } from './ui/Reveal';

const PhoneShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-32 relative bg-[#020617] overflow-hidden perspective-1000"
      style={{ perspective: '1200px' }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           
           {/* Text Content */}
           <Reveal width="100%">
              <div>
                 <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.2em] mb-4 block">Mobile Experience</span>
                 <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Wisecrew <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">In Your Pocket.</span>
                 </h2>
                 <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Experience seamless access to our ecosystem anytime, anywhere. 
                    Our responsive design ensures you can apply for jobs, access courses, 
                    and manage enterprise tools directly from your mobile device with 
                    native-like performance.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                       <div className="text-2xl font-bold text-white mb-1">100%</div>
                       <div className="text-xs text-slate-500 uppercase tracking-wider">Responsive</div>
                    </div>
                    <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                       <div className="text-2xl font-bold text-white mb-1">Fast</div>
                       <div className="text-xs text-slate-500 uppercase tracking-wider">Load Times</div>
                    </div>
                    <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                       <div className="text-2xl font-bold text-white mb-1">Secure</div>
                       <div className="text-xs text-slate-500 uppercase tracking-wider">Access</div>
                    </div>
                 </div>
              </div>
           </Reveal>

           {/* 3D Phone Model */}
           <div className="flex justify-center items-center h-[600px] relative">
              <div 
                 className="relative w-[300px] h-[600px] transition-transform duration-200 ease-out"
                 style={{ 
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d'
                 }}
              >
                 {/* Phone Frame */}
                 <div className="absolute inset-0 bg-[#121212] rounded-[3rem] border-8 border-[#333] shadow-[0_0_0_2px_#555,0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* Glossy Edge Reflection */}
                    <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-white/20 z-20 pointer-events-none"></div>
                    
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-30 flex justify-center items-center">
                       <div className="w-16 h-1 bg-[#222] rounded-full"></div>
                    </div>

                    {/* Screen Content (Simulated Mobile View) */}
                    <div className="w-full h-full bg-[#020617] text-white overflow-hidden relative font-sans">
                        {/* Mobile Status Bar */}
                        <div className="h-10 w-full flex justify-between items-center px-6 text-[10px] font-bold">
                           <span>9:41</span>
                           <div className="flex gap-1.5">
                              <div className="w-3 h-3 bg-white rounded-sm"></div>
                              <div className="w-3 h-3 bg-white rounded-sm"></div>
                              <div className="w-4 h-3 bg-white rounded-sm"></div>
                           </div>
                        </div>

                        {/* Simulated App Content */}
                        <div className="p-4 space-y-6">
                           {/* Mini Hero */}
                           <div className="text-center mt-8">
                              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 mb-4 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30">W</div>
                              <h2 className="text-2xl font-bold mb-2">Wisecrew</h2>
                              <p className="text-xs text-slate-400">Architecting the future.</p>
                           </div>

                           {/* Mini Grid */}
                           <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                 <div className="w-8 h-8 mx-auto bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-2">🎓</div>
                                 <div className="text-[10px] font-bold">Academy</div>
                              </div>
                              <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                 <div className="w-8 h-8 mx-auto bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-2">📦</div>
                                 <div className="text-[10px] font-bold">Products</div>
                              </div>
                              <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                 <div className="w-8 h-8 mx-auto bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mb-2">🌐</div>
                                 <div className="text-[10px] font-bold">Services</div>
                              </div>
                              <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                                 <div className="w-8 h-8 mx-auto bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mb-2">💼</div>
                                 <div className="text-[10px] font-bold">Careers</div>
                              </div>
                           </div>

                           {/* Mini CTA */}
                           <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-center shadow-lg">
                              <p className="text-sm font-bold mb-1">Get Started</p>
                              <p className="text-[10px] opacity-80">Transform your business today.</p>
                           </div>
                           
                           {/* Animated Line */}
                           <div className="w-full h-32 bg-white/5 rounded-xl relative overflow-hidden">
                              <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10"></div>
                              <div className="absolute top-1/2 left-0 w-8 h-1 bg-blue-500 animate-[infinite-scroll_2s_linear_infinite]"></div>
                           </div>
                        </div>

                        {/* Home Bar */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
                    </div>
                 </div>

                 {/* 3D Depth Sides (Pseudo-elements simulation) */}
                 <div 
                    className="absolute inset-0 rounded-[3rem] border-[4px] border-[#111] translate-z-[-5px]" 
                    style={{ transform: 'translateZ(-10px)' }}
                 ></div>
                 <div 
                    className="absolute top-0 right-[-10px] w-[10px] h-full bg-[#222] rounded-r-[10px] origin-left"
                    style={{ transform: 'rotateY(90deg)' }}
                 ></div>
                 <div 
                     className="absolute top-0 left-0 w-[10px] h-full bg-[#222] rounded-l-[10px] origin-right"
                     style={{ transform: 'rotateY(-90deg) translateX(-10px)' }}
                 ></div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneShowcase;