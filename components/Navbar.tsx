import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowRight, ChevronDown, Building2, GraduationCap, Briefcase, Globe, Package, BookOpen } from 'lucide-react';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  onApply: () => void;
  isBannerVisible: boolean;
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode, onApply, isBannerVisible, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string) => {
    if (view.startsWith('#')) {
      const el = document.getElementById(view.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate(view);
    }
    setIsMobileMenuOpen(false);
    setIsCompaniesOpen(false);
  };

  const COMPANY_LINKS = [
    { label: 'Academy', view: 'academy', icon: GraduationCap, desc: 'Internships & Training' },
    { label: 'Products', view: 'products', icon: Package, desc: 'SaaS Solutions' },
    { label: 'Services', view: 'services', icon: Globe, desc: 'IT & Digital Services' },
    { label: 'Publications', view: 'publications', icon: BookOpen, desc: 'Research Support' },
    { label: 'Careers', view: 'career', icon: Briefcase, desc: 'Join the Team' },
  ];

  return (
    <>
      <nav 
        className={`fixed left-0 right-0 z-[90] transition-all duration-500 ease-in-out flex justify-center ${
          isBannerVisible ? 'top-16' : 'top-6'
        } px-4`}
      >
        <div 
          className={`
            w-full max-w-7xl rounded-2xl transition-all duration-300
            ${isScrolled 
              ? 'bg-[var(--glass-bg)]/80 backdrop-blur-xl border border-[var(--glass-border)] shadow-2xl py-3 px-6' 
              : 'bg-transparent border border-transparent py-4 px-4'}
          `}
        >
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a href="#" onClick={() => handleNavClick('home')} className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-3 group">
               <img 
                 src="https://res.cloudinary.com/dkpwmrjkq/image/upload/v1765452503/wisecrew-logo_ielrkm.png" 
                 alt="Wisecrew Logo" 
                 className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform"
               />
               <div className="flex flex-col">
                  <span className="text-[var(--text-primary)] leading-none font-display">Wisecrew</span>
                  <span className="text-[10px] text-[var(--text-secondary)] tracking-[0.2em] uppercase font-medium">Solutions</span>
               </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <button onClick={() => handleNavClick('home')} className="px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-colors">
                Home
              </button>

              {/* Companies Dropdown */}
              <div className="relative group" onMouseEnter={() => setIsCompaniesOpen(true)} onMouseLeave={() => setIsCompaniesOpen(false)}>
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:bg-white/5 rounded-lg transition-colors">
                  Companies <ChevronDown size={14} className={`transition-transform duration-300 ${isCompaniesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px] transition-all duration-300 ${isCompaniesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                   <div className="bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl grid grid-cols-2 gap-2">
                      {COMPANY_LINKS.map((link) => (
                        <button 
                          key={link.label}
                          onClick={() => handleNavClick(link.view)}
                          className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all text-left group/item"
                        >
                           <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                              <link.icon size={20} />
                           </div>
                           <div>
                              <div className="text-sm font-bold text-white mb-1 group-hover/item:text-blue-400 transition-colors">{link.label}</div>
                              <div className="text-xs text-slate-400">{link.desc}</div>
                           </div>
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              <button onClick={() => handleNavClick('services')} className="px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-colors">
                Services
              </button>
              
              <button onClick={() => handleNavClick('#about')} className="px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-colors">
                About Us
              </button>

              <button onClick={() => handleNavClick('#contact')} className="px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 rounded-lg transition-colors">
                Contact Us
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-white/10 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                onClick={onApply}
                className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                Request Demo
              </button>

              <button 
                className="lg:hidden p-2 text-[var(--text-primary)]"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-[300px] bg-[var(--bg-secondary)] border-l border-[var(--glass-border)] shadow-2xl p-6 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
           <div className="flex justify-between items-center mb-8">
              <span className="font-display text-xl font-bold">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
           </div>
           
           <div className="flex flex-col gap-2">
              <button onClick={() => handleNavClick('home')} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Home</button>
              
              <div className="px-4 py-2">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Companies</div>
                 <div className="space-y-1 border-l-2 border-white/5 pl-4 ml-1">
                    {COMPANY_LINKS.map(link => (
                       <button key={link.label} onClick={() => handleNavClick(link.view)} className="block w-full text-left py-2 text-sm text-[var(--text-secondary)] hover:text-white">
                          {link.label}
                       </button>
                    ))}
                 </div>
              </div>

              <button onClick={() => handleNavClick('services')} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Services</button>
              <button onClick={() => handleNavClick('#about')} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">About Us</button>
              <button onClick={() => handleNavClick('#contact')} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Contact Us</button>
              
              <div className="h-px bg-[var(--glass-border)] my-4"></div>
              
              <button onClick={() => {onApply(); setIsMobileMenuOpen(false);}} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20">
                Request Demo
              </button>
           </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;