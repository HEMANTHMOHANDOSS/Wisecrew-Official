
import React from 'react';
import { Reveal } from './ui/Reveal';

interface AppointmentProps {
  onApply: (role: string, type: string) => void;
}

const Appointment: React.FC<AppointmentProps> = ({ onApply }) => {
  return (
    <section className="py-24 px-6 bg-[#020617] relative flex justify-center">
      
      {/* Main Container */}
      <Reveal width="100%" className="w-full max-w-6xl">
        <div className="relative w-full rounded-[3rem] overflow-hidden bg-[#030712] border border-white/10 shadow-2xl group">
          
          {/* 1. The Blue Gradient Glow (Top Center) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-gradient-to-b from-blue-600/40 via-blue-900/10 to-transparent blur-[90px] opacity-80 pointer-events-none group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* 2. Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

          {/* 3. Content */}
          <div className="relative z-10 flex flex-col items-center text-center py-20 md:py-32 px-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0f172a]/80 border border-white/10 backdrop-blur-md mb-8 shadow-lg hover:bg-white/10 transition-colors cursor-default">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              <span className="text-xs font-medium text-slate-300 tracking-wider uppercase">Join Us Now</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Each Project we Undertake <br className="hidden md:block" />
              is a <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">Unique Opportunity.</span>
            </h2>

            {/* Subtext */}
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Ready to take the next step? Join us now and start transforming your vision into reality with expert support and industry-leading innovation.
            </p>

            {/* CTA Button */}
            <button 
              onClick={() => onApply('Appointment Request', 'Service')}
              className="relative group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-2xl shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.7)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10">Book an Appointment</span>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
            </button>

          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Appointment;
