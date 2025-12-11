
import React from 'react';
import { Laptop, PenTool, Megaphone, Rocket, Bot, ShieldCheck, Code, Server, Brain } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const SECTORS_DATA = [
  {
    title: "IT Services",
    icon: Server,
    glowColor: "rgba(59, 130, 246, 0.5)", // Blue
    iconClass: "text-blue-400",
    description: "Managed IT infrastructure, cloud solutions, and enterprise support."
  },
  {
    title: "Product Development",
    icon: Rocket,
    glowColor: "rgba(168, 85, 247, 0.5)", // Purple
    iconClass: "text-purple-400",
    description: "End-to-end SaaS development from concept to market launch."
  },
  {
    title: "AI Products",
    icon: Brain,
    glowColor: "rgba(16, 185, 129, 0.5)", // Emerald
    iconClass: "text-emerald-400",
    description: "Intelligent automation tools and generative AI solutions."
  },
  {
    title: "Creative & Design",
    icon: PenTool,
    glowColor: "rgba(236, 72, 153, 0.5)", // Pink
    iconClass: "text-pink-400",
    description: "UI/UX design, branding, and interactive prototyping."
  },
  {
    title: "Digital Marketing",
    icon: Megaphone,
    glowColor: "rgba(249, 115, 22, 0.5)", // Orange
    iconClass: "text-orange-400",
    description: "SEO, social media growth, and performance marketing."
  },
  {
    title: "Cybersecurity",
    icon: ShieldCheck,
    glowColor: "rgba(6, 182, 212, 0.5)", // Cyan
    iconClass: "text-cyan-400",
    description: "Advanced threat protection and secure cloud architecture."
  }
];

const Sectors: React.FC = () => {
  return (
    <section className="py-32 relative bg-[#020617] overflow-hidden">
      
      {/* Radar/Disk Ray Animation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] -translate-y-[60%] z-0 pointer-events-none">
        {/* Spinning Gradient Ray */}
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,transparent_0deg,transparent_180deg,rgba(59,130,246,0.1)_220deg,rgba(59,130,246,0.6)_260deg,transparent_360deg)] animate-[spin_8s_linear_infinite]"></div>
        
        {/* Static Rings */}
        <div className="absolute inset-0 rounded-full border border-white/5 opacity-50"></div>
        <div className="absolute inset-[200px] rounded-full border border-white/5 opacity-40"></div>
        <div className="absolute inset-[400px] rounded-full border border-white/5 opacity-30"></div>
        
        {/* Inner Glow Center */}
        <div className="absolute inset-[500px] rounded-full bg-blue-600/20 blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-20">
            <div className="inline-block px-5 py-2 rounded-full bg-[#0f172a] border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] mb-6 animate-pulse-slow">
              <span className="text-sm font-bold text-blue-400 tracking-wide uppercase">Core Expertise</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Our Sectors of Activity
            </h2>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
              Delivering comprehensive digital solutions across multiple domains to drive enterprise growth.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SECTORS_DATA.map((sector, index) => (
            <SectorCard 
              key={index}
              icon={sector.icon} 
              title={sector.title} 
              description={sector.description}
              glowColor={sector.glowColor}
              iconClass={sector.iconClass}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SectorCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  glowColor: string;
  iconClass: string;
  delay: number;
}

const SectorCard: React.FC<SectorCardProps> = ({ icon: Icon, title, description, glowColor, iconClass, delay }) => {
  return (
    <Reveal width="100%" delay={delay}>
      <div className="group relative h-[300px] rounded-3xl bg-[#080808] border border-white/10 overflow-hidden flex flex-col items-center justify-center p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer hover:border-white/20">
        
        {/* Glow Effect behind Icon */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ backgroundColor: glowColor }}
        ></div>

        {/* Icon Box */}
        <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:border-white/20">
           {/* Inner gradient for the icon box */}
           <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
           <Icon size={40} className={`${iconClass} drop-shadow-md transition-colors duration-300`} />
        </div>

        <h3 className="relative z-10 text-xl font-bold text-white text-center mb-3 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        
        <p className="relative z-10 text-sm text-slate-400 text-center leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 absolute bottom-8 px-6">
           {description}
        </p>

        {/* Default Description Placeholder (Fades out on hover) */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center group-hover:opacity-0 transition-opacity duration-300">
           <div className="w-12 h-1 bg-white/10 rounded-full"></div>
        </div>

        {/* Card corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </Reveal>
  );
};

export default Sectors;
