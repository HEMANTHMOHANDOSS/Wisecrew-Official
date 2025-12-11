import React, { useState } from 'react';
import GlassCard from './ui/GlassCard';
import { Send, UploadCloud, CheckCircle2 } from 'lucide-react';
import { JOBS, INTERNSHIPS } from '../constants';
import { Reveal } from './ui/Reveal';

const ApplyForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    role: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000); // Reset after 5s
    }, 1000);
  };

  const allRoles = [
    ...INTERNSHIPS.map(i => `Internship: ${i.title}`),
    ...JOBS.map(j => `Job: ${j.title}`)
  ];

  return (
    <section id="apply" className="py-24 relative">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Apply Now</h2>
              <p className="text-[var(--text-secondary)]">Start your journey with us. Fill out the form below.</p>
            </div>

            {submitted ? (
              <GlassCard className="text-center py-16 bg-green-500/10 border-green-500/30">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/40 animate-bounce">
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Application Submitted!</h3>
                <p className="text-[var(--text-secondary)]">Thank you for applying. Our HR team will contact you shortly.</p>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 md:p-10 border-t-4 border-t-[var(--primary)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Full Name</label>
                      <input 
                        required type="text" name="name" onChange={handleChange}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--glass-bg)] transition-all" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Email Address</label>
                      <input 
                        required type="email" name="email" onChange={handleChange}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--glass-bg)] transition-all" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">Phone Number</label>
                      <input 
                        required type="tel" name="phone" onChange={handleChange}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--glass-bg)] transition-all" 
                        placeholder="+91 98765 43210" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">College / Company</label>
                      <input 
                        type="text" name="college" onChange={handleChange}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--glass-bg)] transition-all" 
                        placeholder="University Name" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">Interested Role</label>
                    <select 
                      required name="role" onChange={handleChange}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-all" 
                    >
                      <option value="">Select a position...</option>
                      {allRoles.map((role, i) => (
                        <option key={i} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">Resume / CV</label>
                    <div className="relative border-2 border-dashed border-[var(--glass-border)] rounded-xl p-6 text-center hover:border-[var(--primary)] hover:bg-[var(--glass-bg)] transition-all cursor-pointer group">
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <UploadCloud className="mx-auto text-[var(--text-secondary)] group-hover:text-[var(--primary)] mb-2 transition-colors" />
                      <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Click to upload or drag and drop</span>
                    </div>
                  </div>

                  <button type="submit" className="group relative w-full py-4 bg-gradient-to-r from-[var(--primary)] to-blue-600 rounded-xl text-[var(--primary-fg)] font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">Submit Application <Send size={20} /></span>
                    <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
                  </button>
                </form>
              </GlassCard>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ApplyForm;