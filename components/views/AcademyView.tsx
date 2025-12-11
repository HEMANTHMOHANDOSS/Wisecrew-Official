import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, BookOpen, Code, Terminal, Cpu, Globe, 
  Smartphone, Layout, ShieldCheck, Database, PenTool, 
  CheckCircle, Zap, Building2, Users, FileText, 
  ChevronRight, X, Sparkles, GraduationCap, Briefcase,
  PlayCircle, CreditCard, Calendar, Download, Brain,
  Rocket, MapPin, Check, Phone
} from 'lucide-react';
import { Reveal } from '../ui/Reveal';

interface ViewProps {
  onBack: () => void;
}

// --- Spotlight Card Component (Framer Aesthetic) ---
const SpotlightCard = ({ children, className = "", onClick, noSpotlight = false }: { children?: React.ReactNode, className?: string, onClick?: () => void, noSpotlight?: boolean }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || noSpotlight) return;
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
      {!noSpotlight && (
        <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.15), transparent 40%)`,
            }}
        />
      )}
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- Data Constants ---
const DOMAINS = [
    { id: 'ai', title: 'AI & Machine Learning', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 'fs', title: 'Full Stack Dev', icon: Code, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 'gen', title: 'Generative AI', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 'app', title: 'App Development', icon: Smartphone, color: 'text-green-400', bg: 'bg-green-500/10' },
    { id: 'dm', title: 'Digital Marketing', icon: Globe, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { id: 'py', title: 'Python Mastery', icon: Terminal, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { id: 'java', title: 'Java Enterprise', icon: Database, color: 'text-red-400', bg: 'bg-red-500/10' },
    { id: 'mern', title: 'MERN Stack', icon: LayersIcon, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 'sec', title: 'Cyber Security', icon: ShieldCheck, color: 'text-slate-400', bg: 'bg-slate-500/10' },
    { id: 'ux', title: 'UI/UX Design', icon: PenTool, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
];

const COURSE_DETAILS: Record<string, any> = {
    'ai': {
        modules: ['Python for Data Science', 'Supervised Learning', 'Neural Networks', 'NLP & Transformers', 'Capstone Project'],
        tools: ['TensorFlow', 'PyTorch', 'Scikit-learn'],
        duration: '3 Months'
    },
    'fs': {
        modules: ['HTML5/CSS3/JS', 'React & Tailwind', 'Node.js & Express', 'MongoDB Database', 'Deployment (AWS)'],
        tools: ['React', 'Node', 'Git'],
        duration: '4 Months'
    },
    'default': {
        modules: ['Fundamentals', 'Advanced Concepts', 'Real-world Projects', 'Industry Best Practices', 'Final Assessment'],
        tools: ['VS Code', 'Git', 'Industry Standard Tools'],
        duration: '3 Months'
    }
};

// --- Main Component ---
const AcademyView: React.FC<ViewProps> = ({ onBack }) => {
  const [selectedCourse, setSelectedCourse] = useState<typeof DOMAINS[0] | null>(null);
  const [showMOUForm, setShowMOUForm] = useState(false);

  const getCourseData = (id: string) => COURSE_DETAILS[id] || COURSE_DETAILS['default'];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/50 border-b border-white/5">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-colors">
                <ArrowLeft size={16} />
            </div>
            Back to Hub
        </button>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
           <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Wisecrew Academy</span>
        </div>
        <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
           <Phone size={14} /> Request Call
        </button>
      </nav>

      <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-32">
        
        {/* Hero */}
        <Reveal width="100%">
            <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <Zap size={12} fill="currentColor" /> Industry Ready Certification
                </div>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                    Forge Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Tech Future.</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                    From Final Year Projects to Full-Stack Mastery. Join the ecosystem where students evolve into professionals.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth'})} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
                        Explore Programs
                    </button>
                    <button onClick={() => setShowMOUForm(true)} className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white font-bold rounded-full transition-all">
                        Partner with Us
                    </button>
                </div>
            </div>
        </Reveal>

        {/* Section 1: Final Year Projects (Bento Large) */}
        <div id="programs" className="scroll-mt-32">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Rocket className="text-blue-500" /> Academic Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Final Year Project Card */}
                <Reveal width="100%" className="md:col-span-2">
                    <SpotlightCard className="h-full p-8 md:p-12 bg-gradient-to-br from-[#0a0a0a] to-[#111]">
                        <div className="flex flex-col md:flex-row justify-between gap-8 h-full">
                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="inline-block px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 text-xs font-bold uppercase mb-4">
                                        Best Seller
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4">Final Year Project <br/>Cum Internship</h3>
                                    <p className="text-slate-400 mb-6 max-w-md">
                                        Complete your academic requirement while gaining industrial experience. Includes source code, documentation, and mentorship.
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle size={16} className="text-green-500"/> Valid Internship Certificate</li>
                                        <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle size={16} className="text-green-500"/> Project Source Code & PPT</li>
                                        <li className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle size={16} className="text-green-500"/> Project Summary (Add-on ₹200)</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-4xl font-bold text-white">₹2,100</span>
                                        <span className="text-sm text-slate-500">Total Fee</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mb-4">OR Pay via EMI: <span className="text-white font-bold">₹699/mo</span></p>
                                    <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors w-full md:w-auto">
                                        Book Your Slot
                                    </button>
                                </div>
                            </div>
                            
                            {/* Visual/Icon */}
                            <div className="hidden md:flex flex-col items-center justify-center min-w-[200px] border-l border-white/5 pl-8">
                                <GraduationCap size={120} className="text-white/5" />
                                <div className="mt-8 text-center">
                                    <div className="text-3xl font-bold text-blue-500">200+</div>
                                    <div className="text-xs text-slate-500 uppercase">Projects Available</div>
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>
                </Reveal>

                {/* Summer Internship Card */}
                <Reveal width="100%">
                    <SpotlightCard className="h-full p-8 flex flex-col relative overflow-hidden bg-[#0f1014]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px]"></div>
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Summer Internship</h3>
                            <p className="text-slate-400 text-sm">1 Month Intensive Training</p>
                        </div>
                        
                        <div className="space-y-4 flex-1">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-slate-500 uppercase mb-1">Domains</p>
                                <div className="flex flex-wrap gap-2">
                                    {['AI/ML', 'Fullstack', 'App Dev', 'Gen AI'].map(d => (
                                        <span key={d} className="text-[10px] px-2 py-1 bg-black rounded border border-white/10 text-slate-300">{d}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-2xl font-bold text-white">₹1,000</span>
                                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Flat Fee</span>
                            </div>
                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-colors">
                                Apply Now
                            </button>
                        </div>
                    </SpotlightCard>
                </Reveal>
            </div>
        </div>

        {/* Section 2: Skill Courses Grid */}
        <div>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                        <Cpu className="text-purple-500" /> Professional Courses
                    </h2>
                    <p className="text-slate-400 max-w-lg">
                        Master in-demand technologies. Click on any domain to view the syllabus.
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-2xl font-bold text-white">₹2,000 <span className="text-sm font-normal text-slate-500">/ Month</span></p>
                    <p className="text-xs text-slate-500">Flexible EMI Options</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {DOMAINS.map((domain, idx) => (
                    <Reveal key={domain.id} delay={idx * 50} width="100%">
                        <SpotlightCard 
                            onClick={() => setSelectedCourse(domain)}
                            className="p-6 h-full flex flex-col items-center text-center gap-4 hover:border-blue-500/50 transition-colors"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${domain.bg} ${domain.color} flex items-center justify-center shadow-lg`}>
                                <domain.icon size={28} />
                            </div>
                            <h3 className="font-bold text-sm md:text-base leading-tight">{domain.title}</h3>
                        </SpotlightCard>
                    </Reveal>
                ))}
            </div>
        </div>

        {/* Section 3: College & Institutional (MOU) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal width="100%">
                <SpotlightCard className="h-full p-8 md:p-12 bg-[#0c0c0c] border-l-4 border-l-blue-600">
                    <div className="flex items-center gap-3 mb-6 text-blue-400">
                        <Building2 size={24} />
                        <span className="font-bold tracking-widest uppercase text-xs">For Institutions</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Wisecrew Industry Ready Program</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Bridge the gap between academia and industry. We collaborate with colleges to integrate practical tech training into the curriculum.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <h4 className="font-bold text-white mb-1">Industrial Visits</h4>
                            <p className="text-xs text-slate-400 mb-2">Practical exposure to company culture.</p>
                            <span className="text-sm font-bold text-blue-400">₹100 / Student</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <h4 className="font-bold text-white mb-1">Placement Training</h4>
                            <p className="text-xs text-slate-400 mb-2">DSA, Aptitude & Soft Skills (3 Months).</p>
                            <span className="text-sm font-bold text-blue-400">₹1,000 / Month</span>
                        </div>
                    </div>

                    <button onClick={() => setShowMOUForm(true)} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20">
                        Request MOU / Collaboration
                    </button>
                </SpotlightCard>
            </Reveal>

            <Reveal width="100%" delay={200}>
                {showMOUForm ? (
                    <SpotlightCard className="h-full p-8 md:p-12 bg-[#0c0c0c]">
                         <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold">MOU Request Form</h3>
                            <button onClick={() => setShowMOUForm(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20}/></button>
                         </div>
                         <form className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Institution Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none" placeholder="College Name" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">City</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Interested In</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none">
                                    <option>Industrial Visit</option>
                                    <option>Curriculum Adoption</option>
                                    <option>Placement Training</option>
                                    <option>General MOU</option>
                                </select>
                            </div>
                            <button type="button" className="w-full py-4 mt-2 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors">
                                Submit Request
                            </button>
                         </form>
                    </SpotlightCard>
                ) : (
                    <div className="h-full rounded-3xl overflow-hidden relative group cursor-pointer" onClick={() => setShowMOUForm(true)}>
                        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12">
                            <h3 className="text-3xl font-bold mb-2">Industry-Academia <br/>Collaboration</h3>
                            <p className="text-slate-300 mb-6 max-w-sm">Join 50+ colleges transforming their students into industry-ready professionals.</p>
                            <span className="inline-flex items-center gap-2 text-blue-400 font-bold">Partner Now <ChevronRight size={16} /></span>
                        </div>
                    </div>
                )}
            </Reveal>
        </div>

      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedCourse(null)}></div>
              <div className="w-full max-w-3xl relative z-10 bg-[#0f1014] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                  
                  {/* Header */}
                  <div className={`p-8 ${selectedCourse.bg} border-b border-white/5 flex justify-between items-start`}>
                      <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-2xl bg-black/20 flex items-center justify-center text-white`}>
                              <selectedCourse.icon size={32} />
                          </div>
                          <div>
                              <h2 className="text-2xl font-bold text-white">{selectedCourse.title}</h2>
                              <div className="flex items-center gap-4 mt-2 text-sm font-medium text-white/70">
                                  <span className="flex items-center gap-1"><Calendar size={14}/> {getCourseData(selectedCourse.id).duration}</span>
                                  <span className="flex items-center gap-1"><CreditCard size={14}/> ₹2,000 / Month</span>
                              </div>
                          </div>
                      </div>
                      <button onClick={() => setSelectedCourse(null)} className="p-2 bg-black/20 rounded-full text-white/70 hover:text-white hover:bg-black/40"><X size={20}/></button>
                  </div>

                  {/* Body */}
                  <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
                      <div>
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Syllabus Structure</h3>
                          <div className="space-y-3">
                              {getCourseData(selectedCourse.id).modules.map((mod: string, i: number) => (
                                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                      <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/20">
                                          {i + 1}
                                      </div>
                                      <span className="text-slate-200 font-medium">{mod}</span>
                                  </div>
                              ))}
                          </div>
                      </div>

                      <div>
                          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Tools Covered</h3>
                          <div className="flex flex-wrap gap-2">
                              {getCourseData(selectedCourse.id).tools.map((tool: string) => (
                                  <span key={tool} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300">
                                      {tool}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-white/5 bg-[#0a0a0a] flex gap-4">
                      <button className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors">
                          Enroll Now
                      </button>
                      <button className="px-6 py-3 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-colors">
                          Download Syllabus
                      </button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

// --- Shims for icons not in initial import but used in DOMAINS ---
function LayersIcon(props: any) { return <div {...props}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></div> }

export default AcademyView;