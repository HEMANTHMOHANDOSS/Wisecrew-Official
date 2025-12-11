import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Globe, Code, Smartphone, Terminal, Megaphone, Palette, 
  ArrowRight, CheckCircle2, Zap, Layers, Cpu, Database, Cloud, 
  Lock, BarChart3, Rocket, MousePointer2
} from 'lucide-react';
import { Reveal } from '../ui/Reveal';

interface ViewProps {
  onBack: () => void;
}

// --- Local Component: Spotlight Card (Framer Style) ---
const SpotlightCard = ({ children, className = "", onClick }: { children?: React.ReactNode, className?: string, onClick?: () => void }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.01] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- Marquee Component ---
const TechMarquee = () => {
  const techs = ["React", "Node.js", "Flutter", "Python", "AWS", "TensorFlow", "Figma", "Next.js", "Docker", "Kubernetes", "MongoDB", "PostgreSQL"];
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {[...techs, ...techs].map((tech, i) => (
          <li key={i} className="text-xl font-bold text-white/20 uppercase tracking-widest whitespace-nowrap">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ServicesView: React.FC<ViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'services' | 'process'>('services');

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/50 border-b border-white/5">
        <div className="flex items-center gap-4">
           <button onClick={onBack} className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-colors">
                 <ArrowLeft size={16} />
              </div>
              <span className="hidden sm:block">Back to Hub</span>
           </button>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Wisecrew Services</span>
        </div>
        <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-colors">
           Book Call
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <Reveal width="100%">
          <div className="flex flex-col items-center text-center mb-24">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8">
                <Zap size={12} fill="currentColor" /> Premium Digital Solutions
             </div>
             <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                We build software <br />
                that <span className="italic font-serif font-light text-cyan-200">scales.</span>
             </h1>
             <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
                Wisecrew Solutions transforms ambitious ideas into enterprise-grade reality. We combine elite engineering with human-centric design.
             </p>
             <TechMarquee />
          </div>
        </Reveal>

        {/* Bento Grid Services */}
        <div className="mb-32">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-2">
              <h2 className="text-3xl md:text-4xl font-bold">Our Expertise</h2>
              <p className="text-zinc-500 text-sm max-w-xs text-right hidden md:block">
                 Comprehensive digital services tailored for growth and performance.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
              
              {/* Card 1: Full Stack (Large) */}
              <Reveal className="md:col-span-2 md:row-span-2 h-full" width="100%">
                 <SpotlightCard className="h-full p-8 flex flex-col justify-between bg-gradient-to-br from-[#0a0a0a] to-[#111]">
                    <div className="flex justify-between items-start">
                       <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          <Code size={32} />
                       </div>
                       <ArrowRight size={24} className="text-zinc-600 -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all duration-300" />
                    </div>
                    <div>
                       <h3 className="text-3xl font-bold mb-4">Full Stack Development</h3>
                       <p className="text-zinc-400 text-lg mb-6 max-w-md">
                          Scalable web architectures using MERN, Next.js, and Python. We build resilient platforms that handle millions of requests.
                       </p>
                       <div className="flex gap-2">
                          {['React', 'Node.js', 'PostgreSQL'].map(tag => (
                             <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-xs text-zinc-400">{tag}</span>
                          ))}
                       </div>
                    </div>
                 </SpotlightCard>
              </Reveal>

              {/* Card 2: Mobile (Tall) */}
              <Reveal className="md:row-span-2 h-full" width="100%" delay={100}>
                 <SpotlightCard className="h-full p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="mb-auto">
                       <div className="p-4 w-fit rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6">
                          <Smartphone size={32} />
                       </div>
                       <h3 className="text-2xl font-bold mb-4">Mobile Apps</h3>
                       <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                          Native performance with cross-platform efficiency using Flutter and React Native.
                       </p>
                    </div>
                    <div className="mt-8 relative h-40 bg-zinc-900/50 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                        <div className="text-zinc-600 text-xs font-mono">App Interface Preview</div>
                        {/* Mock UI Elements */}
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-zinc-800"></div>
                        <div className="absolute top-4 left-14 right-4 h-2 rounded-full bg-zinc-800"></div>
                        <div className="absolute top-8 left-14 right-12 h-2 rounded-full bg-zinc-800 opacity-50"></div>
                    </div>
                 </SpotlightCard>
              </Reveal>

              {/* Card 3: AI (Standard) */}
              <Reveal className="h-full" width="100%" delay={200}>
                 <SpotlightCard className="h-full p-8 flex flex-col justify-center items-center text-center">
                    <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-400 mb-4 animate-pulse">
                       <Cpu size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">AI Integration</h3>
                    <p className="text-zinc-400 text-xs">LLMs, Chatbots & Automation</p>
                 </SpotlightCard>
              </Reveal>

              {/* Card 4: Design (Standard) */}
              <Reveal className="h-full" width="100%" delay={300}>
                 <SpotlightCard className="h-full p-8 flex flex-col justify-center items-center text-center">
                    <div className="p-4 rounded-full bg-pink-500/10 text-pink-400 mb-4">
                       <Palette size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">UI/UX Design</h3>
                    <p className="text-zinc-400 text-xs">Figma Prototypes & Design Systems</p>
                 </SpotlightCard>
              </Reveal>

              {/* Card 5: Marketing (Wide) */}
              <Reveal className="md:col-span-2 h-full" width="100%" delay={400}>
                 <SpotlightCard className="h-full p-8 flex items-center justify-between gap-8">
                    <div className="max-w-sm">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                             <Megaphone size={24} />
                          </div>
                          <h3 className="text-2xl font-bold">Digital Growth</h3>
                       </div>
                       <p className="text-zinc-400 text-sm">
                          Data-driven marketing strategies to scale your user base and revenue. SEO, SEM, and Content Strategy.
                       </p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <BarChart3 size={64} className="text-zinc-800" />
                        <Rocket size={64} className="text-zinc-800" />
                    </div>
                 </SpotlightCard>
              </Reveal>

           </div>
        </div>

        {/* Sticky Scroll Process Section */}
        <div className="mb-32">
           <h2 className="text-4xl md:text-6xl font-bold text-center mb-24 tracking-tighter">How we deliver.</h2>
           
           <div className="relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              
              <div className="space-y-24">
                 {[
                    { step: '01', title: 'Discovery', desc: 'We dive deep into your business logic, understanding the core problem before writing a single line of code.', icon: Database },
                    { step: '02', title: 'Design', desc: 'Crafting high-fidelity prototypes in Figma. We iterate until the user experience is intuitive and beautiful.', icon: MousePointer2 },
                    { step: '03', title: 'Development', desc: 'Agile sprints. Clean code. Robust architecture. We build systems that are secure and scalable.', icon: Terminal },
                    { step: '04', title: 'Launch', desc: 'Rigorous testing, deployment to cloud infrastructure (AWS/Azure), and post-launch support.', icon: Cloud }
                 ].map((item, idx) => (
                    <Reveal key={idx} width="100%">
                       <div className="flex gap-8 md:gap-16 items-start group">
                          <div className="relative z-10 w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-xs font-bold font-mono group-hover:border-cyan-500 group-hover:text-cyan-500 transition-colors shadow-[0_0_20px_rgba(0,0,0,1)]">
                             {item.step}
                          </div>
                          <div className="flex-1 pt-1">
                             <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-3xl md:text-5xl font-bold text-zinc-700 group-hover:text-white transition-colors duration-500">{item.title}</h3>
                                <item.icon size={24} className="text-zinc-700 group-hover:text-cyan-500 transition-colors duration-500 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0" />
                             </div>
                             <p className="text-lg text-zinc-500 group-hover:text-zinc-300 max-w-2xl transition-colors duration-500 leading-relaxed">
                                {item.desc}
                             </p>
                          </div>
                       </div>
                    </Reveal>
                 ))}
              </div>
           </div>
        </div>

        {/* CTA Footer */}
        <Reveal width="100%">
           <div className="relative rounded-[3rem] bg-gradient-to-b from-zinc-900 to-black border border-white/10 p-12 md:p-24 text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
              
              <div className="relative z-10">
                 <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter">Ready to build?</h2>
                 <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto">
                    Let's discuss your project. We usually reply within 2 hours.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-50 transition-colors w-full sm:w-auto">
                       Start Project
                    </button>
                    <button className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors w-full sm:w-auto">
                       Copy Email
                    </button>
                 </div>
              </div>
           </div>
        </Reveal>

      </div>
    </div>
  );
};

export default ServicesView;