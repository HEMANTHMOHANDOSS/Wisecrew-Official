import React from 'react';
import GlassCard from './ui/GlassCard';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Send } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import SectionDivider from './ui/SectionDivider';

const ContactFooter: React.FC = () => {
  return (
    <>
      <section id="contact" className="py-24 bg-[var(--glass-bg)] relative">
        <SectionDivider position="top" variant="tilt" />
        
        <div className="container mx-auto px-6 relative z-10">
          <Reveal width="100%">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">Get In Touch</h2>
              <p className="text-[var(--text-secondary)] text-lg">Have questions? We are here to help you.</p>
            </div>
          </Reveal>

          {/* items-stretch ensures children columns have equal height */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Contact Info */}
            <Reveal delay={100} className="h-full" width="100%">
              <GlassCard className="h-full flex flex-col bg-[var(--bg-secondary)]/50 p-6 md:p-10">
                <div className="space-y-8 flex-grow">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Contact Information</h3>
                  
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400 flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-[var(--text-primary)] font-bold mb-1 text-lg">Visit Us</h4>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        44, Kanakkar Street, <br />
                        Thiruvottiyur, Chennai - 600019
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    {/* Phone Icon */}
                    <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400 flex-shrink-0">
                       <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="text-[var(--text-primary)] font-bold mb-1 text-lg">Call Us</h4>
                      <p className="text-[var(--text-secondary)]">91-7845342880</p>
                      {/* Explicit WhatsApp Button */}
                      <a 
                        href="https://wa.me/917845342880" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-colors text-sm font-bold border border-green-500/20 hover:border-green-500"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                         Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-purple-600/20 rounded-xl text-purple-400 flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="text-[var(--text-primary)] font-bold mb-1 text-lg">Email Us</h4>
                      <p className="text-[var(--text-secondary)]">info@wisecrew.in</p>
                      <p className="text-[var(--text-secondary)] text-sm mt-1">www.wisecrew.in</p>
                    </div>
                  </div>
                </div>

                {/* Embedded Map */}
                <div className="mt-8 h-64 rounded-xl overflow-hidden bg-slate-800 border border-[var(--glass-border)] shadow-lg relative group">
                   <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.032416102537!2d80.30327129999999!3d13.160355299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526fc3754dd5b3%3A0x74e72e0a7d7079f4!2s44%2C%20Kanakkar%20St%2C%20Radhakrishnan%20Nagar%2C%20Rajakadai%2C%20Tiruvottiyur%2C%20Chennai%2C%20Tamil%20Nadu%20600019!5e0!3m2!1sen!2sin!4v1765452356123!5m2!1sen!2sin" 
                     width="100%" 
                     height="100%" 
                     style={{ border: 0 }} 
                     allowFullScreen={true} 
                     loading="lazy" 
                     referrerPolicy="no-referrer-when-downgrade"
                     className="w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                   ></iframe>
                </div>
              </GlassCard>
            </Reveal>

            {/* Message Form */}
            <Reveal delay={200} className="h-full" width="100%">
              <GlassCard className="h-full p-6 md:p-10 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Send Message</h3>
                <form className="space-y-5 flex-grow">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)] ml-1">Your Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-5 py-3 text-[var(--text-primary)] focus:border-[var(--primary)] focus:bg-[var(--glass-border)] focus:outline-none transition-all placeholder:text-[var(--text-secondary)]/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)] ml-1">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-5 py-3 text-[var(--text-primary)] focus:border-[var(--primary)] focus:bg-[var(--glass-border)] focus:outline-none transition-all placeholder:text-[var(--text-secondary)]/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)] ml-1">Subject</label>
                    <input type="text" placeholder="Inquiry about Internships" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-5 py-3 text-[var(--text-primary)] focus:border-[var(--primary)] focus:bg-[var(--glass-border)] focus:outline-none transition-all placeholder:text-[var(--text-secondary)]/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)] ml-1">Message</label>
                    <textarea rows={5} placeholder="How can we help you?" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-5 py-3 text-[var(--text-primary)] focus:border-[var(--primary)] focus:bg-[var(--glass-border)] focus:outline-none transition-all placeholder:text-[var(--text-secondary)]/50 resize-none"></textarea>
                  </div>
                  
                  <button className="w-full py-4 mt-2 bg-gradient-to-r from-[var(--primary)] to-blue-600 hover:opacity-90 text-[var(--primary-fg)] font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 transform hover:-translate-y-1">
                    Send Message
                  </button>
                </form>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-20 pb-8 border-t border-[var(--glass-border)] relative">
        <div className="container mx-auto px-6 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                 <h2 className="text-2xl font-bold text-white mb-4">Wisecrew Solutions</h2>
                 <p className="text-slate-500 text-sm max-w-sm mb-6 leading-relaxed">Empowering careers through education and building the future through innovation. Join us to reshape the digital landscape.</p>
                 <div className="flex space-x-4">
                    <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[var(--primary)] hover:text-[var(--primary-fg)] text-slate-400 transition-colors"><Facebook size={20} /></a>
                    <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[var(--primary)] hover:text-[var(--primary-fg)] text-slate-400 transition-colors"><Twitter size={20} /></a>
                    <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[var(--primary)] hover:text-[var(--primary-fg)] text-slate-400 transition-colors"><Instagram size={20} /></a>
                    <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[var(--primary)] hover:text-[var(--primary-fg)] text-slate-400 transition-colors"><Linkedin size={20} /></a>
                 </div>
              </div>
              
              <div>
                 <h3 className="text-white font-bold mb-4">Quick Links</h3>
                 <ul className="space-y-2 text-sm text-slate-500">
                    <li><a href="#services" className="hover:text-[var(--primary)] transition-colors">IT Services</a></li>
                    <li><a href="#internships" className="hover:text-[var(--primary)] transition-colors">Internships</a></li>
                    <li><a href="#courses" className="hover:text-[var(--primary)] transition-colors">Courses</a></li>
                    <li><a href="#careers" className="hover:text-[var(--primary)] transition-colors">Careers</a></li>
                 </ul>
              </div>

              <div>
                 <h3 className="text-white font-bold mb-4">Stay Updated</h3>
                 <div className="flex flex-col gap-3">
                    <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--primary)]" />
                    <button className="px-3 py-2 bg-[var(--primary)] text-[var(--primary-fg)] text-sm font-bold rounded hover:opacity-90 transition-opacity">Subscribe</button>
                 </div>
              </div>
           </div>
           
           <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-4 md:gap-0">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
                 <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                 <a href="#" className="hover:text-slate-300">Terms & Conditions</a>
                 <a href="#" className="hover:text-slate-300">Refund Policy</a>
              </div>
              <p className="text-center md:text-right">&copy; 2025 Wisecrew Solutions. Designed with 💙 by Wisecrew Solutions.</p>
           </div>
        </div>
      </footer>
    </>
  );
};

export default ContactFooter;