import React from 'react';
import { GraduationCap, Package, Globe, ScrollText, Briefcase, ArrowRight } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { Reveal } from './ui/Reveal';
import SectionDivider from './ui/SectionDivider';

const BRANCHES = [
  {
    id: 'academy',
    title: 'Wisecrew Academy',
    icon: GraduationCap,
    gradient: 'from-blue-600 to-cyan-500',
    description: "Wisecrew Academy bridges the gap between academic theory and industry practice. We offer intensive internships, hands-on workshops, and certification programs designed to mold students into job-ready professionals. Our curriculum is curated by industry experts to ensure relevance in the fast-evolving tech landscape, providing students with the practical skills needed to excel from day one."
  },
  {
    id: 'products',
    title: 'Wisecrew Products',
    icon: Package,
    gradient: 'from-purple-600 to-pink-500',
    description: "Our product division focuses on building scalable SaaS solutions that solve real-world business problems. From comprehensive HR management systems to intelligent educational ERPs, our suite of tools is designed to streamline operations. We leverage cutting-edge technology to create intuitive, reliable, and secure software products that drive digital efficiency for enterprises of all sizes."
  },
  {
    id: 'services',
    title: 'Wisecrew Services',
    icon: Globe,
    gradient: 'from-cyan-600 to-teal-500',
    description: "Wisecrew Services provides end-to-end digital transformation tailored to your business needs. We specialize in custom web and mobile application development, cloud infrastructure, and AI integration. We partner with businesses to architect robust digital backbones that support growth, scalability, and innovation, ensuring your digital presence is powerful and future-proof."
  },
  {
    id: 'publications',
    title: 'Wisecrew Publications',
    icon: ScrollText,
    gradient: 'from-emerald-600 to-green-500',
    description: "Dedicated to advancing academic and scientific research, Wisecrew Publications assists scholars in documenting their findings. We provide end-to-end support for journal publications, conference papers, and thesis writing. Our team ensures high standards of technical writing, rigorous editing, and adherence to global academic norms, helping researchers amplify the impact of their work."
  },
  {
    id: 'careers',
    title: 'Wisecrew Careers',
    icon: Briefcase,
    gradient: 'from-amber-500 to-orange-600',
    description: "Wisecrew Careers is our talent acquisition arm, connecting top-tier talent with leading organizations. We streamline the hiring process through AI-driven matching and skill-based assessments. Our platform ensures candidates find roles that perfectly fit their aspirations while helping companies build high-performing teams with the exact skill sets required for success."
  }
];

const BranchDetails: React.FC = () => {
  return (
    <section className="py-32 relative bg-[var(--bg-secondary)] overflow-hidden">
      <SectionDivider position="top" variant="wave" />
      
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--primary)] opacity-5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-20">
            <span className="text-[var(--primary)] font-mono text-xs uppercase tracking-[0.2em] mb-4 block">Corporate Divisions</span>
            <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Centers of Excellence</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-3xl mx-auto">
              Each branch of Wisecrew Solutions is dedicated to a specific pillar of the digital economy, working in unison to build the future.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12">
          {BRANCHES.map((branch, index) => (
            <Reveal key={branch.id} width="100%" delay={index * 100}>
              <div className={`flex flex-col lg:flex-row items-center gap-10 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                   <div className={`relative rounded-3xl overflow-hidden aspect-video group`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${branch.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                      <div className="absolute inset-0 bg-[#020617]/50 backdrop-blur-sm"></div>
                      
                      {/* Decorative Pattern */}
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${branch.gradient} flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-700`}>
                            <branch.icon size={64} className="text-white drop-shadow-md" />
                         </div>
                      </div>

                      {/* Floating Particles */}
                      <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full opacity-50 animate-pulse"></div>
                      <div className="absolute bottom-10 right-10 w-3 h-3 bg-white rounded-full opacity-30 animate-bounce-slow"></div>
                   </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                   <GlassCard className="p-8 md:p-10 border-l-4 border-l-[var(--glass-border)] hover:border-l-[var(--primary)] transition-all">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${branch.gradient} bg-opacity-10 text-white text-xs font-bold uppercase tracking-wider mb-6 shadow-lg`}>
                         <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                         Wisecrew Division
                      </div>
                      
                      <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-6">{branch.title}</h3>
                      
                      <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                         {branch.description}
                      </p>

                      <button className="group flex items-center gap-2 text-[var(--primary)] font-bold text-sm hover:gap-4 transition-all">
                         Learn More About {branch.title.split(' ')[1]} <ArrowRight size={16} />
                      </button>
                   </GlassCard>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchDetails;