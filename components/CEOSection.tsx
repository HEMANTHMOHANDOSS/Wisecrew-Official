import React from 'react';
import GlassCard from './ui/GlassCard';
import { Quote } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const CEOSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6 relative z-10">
        <Reveal width="100%">
          <GlassCard className="p-8 md:p-12 border-l-4 border-l-[var(--primary)] bg-gradient-to-r from-[var(--bg-secondary)] to-transparent">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="relative flex-shrink-0 group">
                <div className="absolute inset-0 bg-[var(--primary)] rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[var(--glass-border)] shadow-2xl">
                  <img 
                    src="https://res.cloudinary.com/dkpwmrjkq/image/upload/v1765434600/WhatsApp_Image_2025-12-01_at_9.42.20_PM_iorois.jpg" 
                    alt="Sribalamanigandan G" 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] px-6 py-2 rounded-full shadow-xl whitespace-nowrap z-10">
                   <p className="text-sm font-bold text-[var(--text-primary)]">Sribalamanigandan G</p>
                   <p className="text-xs text-[var(--primary)] text-center">Founder & CEO</p>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <Quote size={48} className="text-[var(--primary)] mb-6 opacity-50 mx-auto md:mx-0" />
                <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
                  Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Digital Backbone</span> of Tomorrow.
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                  "At Wisecrew, we believe in the transformative power of technology and education. Our mission is to bridge the gap between academic learning and industry demands, creating a ecosystem where innovation thrives and careers flourish. We are not just building software; we are architecting the future."
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                   <div className="px-4 py-2 rounded-lg bg-[var(--glass-border)] text-[var(--text-secondary)] text-sm font-medium">
                      Visionary Leadership
                   </div>
                   <div className="px-4 py-2 rounded-lg bg-[var(--glass-border)] text-[var(--text-secondary)] text-sm font-medium">
                      10+ Years Experience
                   </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
};

export default CEOSection;