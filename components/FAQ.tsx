import React, { useState } from 'react';
import { FAQS } from '../constants';
import GlassCard from './ui/GlassCard';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <Reveal width="100%">
          <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-12">Frequently Asked Questions</h2>
        </Reveal>
        
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 100} width="100%">
              <GlassCard className="p-0 overflow-hidden group border border-[var(--glass-border)] hover:border-[var(--primary)] transition-colors" hoverEffect={false}>
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none bg-[var(--glass-bg)]"
                >
                  <span className={`font-semibold text-lg transition-colors ${openIndex === idx ? 'text-[var(--primary)]' : 'text-[var(--text-primary)]'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full bg-[var(--glass-border)] transition-transform duration-300 ${openIndex === idx ? 'rotate-180 bg-[var(--primary)] text-[var(--primary-fg)]' : 'text-[var(--text-secondary)]'}`}>
                     {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out bg-[var(--glass-bg)] bg-opacity-50 ${
                    openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-[var(--text-secondary)] leading-relaxed border-t border-[var(--glass-border)]">
                    {faq.answer}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;