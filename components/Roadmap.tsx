import React from 'react';
import { BookOpen, Code, Users, Briefcase, Award } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import GlassCard from './ui/GlassCard';
import SectionDivider from './ui/SectionDivider';

const steps = [
  { icon: BookOpen, title: "Learn Basics", desc: "Master fundamentals via our structured courses." },
  { icon: Code, title: "Hands-on Projects", desc: "Build real-world applications to apply knowledge." },
  { icon: Briefcase, title: "Internship", desc: "Work on live industry projects with guidance." },
  { icon: Users, title: "Mentorship", desc: "1-on-1 sessions with industry experts." },
  { icon: Award, title: "Career Success", desc: "Get certified and placement assistance." },
];

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-[var(--glass-bg)]">
      {/* Divider from previous transparent section */}
      <SectionDivider position="top" variant="curve" />

      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">Your Learning Journey</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              We guide you through every step from beginner to industry-ready professional.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-600/20 via-[var(--primary)] to-blue-600/20 -translate-y-1/2 rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 150} className="h-full flex flex-col items-center" width="100%">
                <GlassCard className="w-full h-full flex flex-col items-center text-center hover:bg-[var(--glass-border)] border-[var(--glass-border)] !bg-[var(--bg-secondary)]/80">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-[var(--primary)] flex items-center justify-center text-white mb-4 shadow-lg shadow-cyan-500/30 transform hover:scale-110 transition-transform">
                    <step.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{step.desc}</p>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-4 right-4 text-[40px] font-bold text-[var(--primary)] opacity-10 pointer-events-none">
                    {idx + 1}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;