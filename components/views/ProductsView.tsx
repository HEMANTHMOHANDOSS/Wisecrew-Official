import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Bot, Database, Layout, Server, MessageSquare, Search, Filter, 
  Check, X, ArrowUpRight, Cpu, ShieldCheck, Zap, Globe, Users, BarChart3, 
  Rocket, Layers, Code, CreditCard, Mail, FileSpreadsheet, GraduationCap, 
  Briefcase, Lock, Cloud, PlayCircle, Star, Sparkles, ChevronRight, Boxes,
  BookOpen, CheckCircle2, Send
} from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { GoogleGenAI } from "@google/genai";

interface ViewProps {
  onBack: () => void;
}

// --- Data Models ---

interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  specs: string[];
  price: string;
  gradient: string; // CSS class for gradient bg
  screenshots?: string[]; // Placeholders
}

const PRODUCTS: Product[] = [
  { 
    id: 'w-chat', 
    name: 'WiseCrew Chatbot', 
    tagline: 'Intelligent Conversational AI', 
    category: 'AI & NLP', 
    icon: Bot, 
    description: 'A next-generation conversational agent capable of handling complex customer support queries, lead generation, and internal knowledge retrieval with human-like understanding.',
    features: ['GPT-4 Turbo Integration', 'Multi-turn Context Memory', 'Omnichannel Deployment (Web, WhatsApp, Slack)', 'Sentiment Analysis'],
    specs: ['Response Time: <500ms', 'Languages: 95+', 'Security: AES-256'],
    price: '$49/mo',
    gradient: 'from-blue-600/20 to-cyan-500/20'
  },
  { 
    id: 'w-hrms', 
    name: 'WiseCrew HRMS', 
    tagline: 'Complete Workforce Management', 
    category: 'Enterprise', 
    icon: Users, 
    description: 'End-to-end human resource management system designed for modern enterprises. Handle recruitment, onboarding, payroll, and performance reviews in one unified platform.',
    features: ['Automated Payroll', 'Biometric Integration', 'Performance 360', 'Employee Self-Service Portal'],
    specs: ['Compliance: GDPR/SOC2', 'Users: Unlimited', 'Uptime: 99.99%'],
    price: '$199/mo',
    gradient: 'from-purple-600/20 to-pink-500/20'
  },
  { 
    id: 'w-ems', 
    name: 'WiseCrew School', 
    tagline: 'Education Management System', 
    category: 'Education', 
    icon: GraduationCap, 
    description: 'A comprehensive ERP solution for educational institutions. Streamline admissions, fee collection, exam management, and student tracking.',
    features: ['Online Admissions', 'LMS Integration', 'Parent Mobile App', 'Transport Management'],
    specs: ['Platform: Web & Mobile', 'Cloud Storage: 1TB+', 'Backup: Daily Automated'],
    price: 'Custom',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  { 
    id: 'w-crm', 
    name: 'WiseCrew Hub', 
    tagline: 'Unified Workspace & CRM', 
    category: 'Productivity', 
    icon: Layers, 
    description: 'The central nervous system for your business. Manage projects, tasks, and customer relationships in a single, fluid interface.',
    features: ['Kanban & Gantt Views', 'Sales Pipeline', 'Document Collaboration', 'Automated Workflows'],
    specs: ['Integrations: 5000+', 'API Access: Full', 'Storage: Unlimited'],
    price: '$29/user/mo',
    gradient: 'from-orange-500/20 to-amber-500/20'
  },
  { 
    id: 'w-cms', 
    name: 'WiseCrew CMS', 
    tagline: 'Headless Content Engine', 
    category: 'DevTools', 
    icon: Layout, 
    description: 'A developer-first headless CMS that delivers content to any device. Built for speed, scalability, and flexibility.',
    features: ['GraphQL API', 'Live Preview', 'Multi-environment Support', 'Asset Optimization'],
    specs: ['CDN: Global Edge', 'Tech Stack: Node/Go', 'SLA: Enterprise'],
    price: '$99/mo',
    gradient: 'from-indigo-600/20 to-violet-500/20'
  },
  { 
    id: 'w-mail', 
    name: 'WiseCrew Mail', 
    tagline: 'Secure Enterprise Email', 
    category: 'Communication', 
    icon: Mail, 
    description: 'Private, secure, and ad-free email hosting for businesses. Features advanced spam protection and seamless calendar integration.',
    features: ['Custom Domains', 'End-to-End Encryption', 'Smart Filters', 'Collaborative Inboxes'],
    specs: ['Storage: 50GB/user', 'Protocol: IMAP/POP/SMTP', 'Migration: Free'],
    price: '$5/user/mo',
    gradient: 'from-red-500/20 to-rose-500/20'
  },
  { 
    id: 'w-sheets', 
    name: 'WiseCrew Sheets', 
    tagline: 'Intelligent Spreadsheets', 
    category: 'Productivity', 
    icon: FileSpreadsheet, 
    description: 'Next-gen spreadsheets with built-in AI analysis, SQL querying capabilities, and real-time collaboration.',
    features: ['AI Formula Gen', 'Big Data Support', 'Interactive Dashboards', 'Python Support'],
    specs: ['Rows: 10 Million+', 'Export: CSV/PDF/Excel', 'Real-time Sync'],
    price: '$12/mo',
    gradient: 'from-teal-500/20 to-cyan-500/20'
  },
  { 
    id: 'w-chat-team', 
    name: 'WiseCrew Team Chat', 
    tagline: 'Real-time Collaboration', 
    category: 'Communication', 
    icon: MessageSquare, 
    description: 'Secure messaging platform for teams. Replace internal emails with channels, threads, and direct messages.',
    features: ['Video Calling', 'Screen Sharing', 'File Sharing', 'Guest Access'],
    specs: ['Encryption: TLS 1.3', 'Platform: All Devices', 'History: Unlimited'],
    price: '$8/user/mo',
    gradient: 'from-blue-500/20 to-indigo-500/20'
  },
  { 
    id: 'w-intern', 
    name: 'WiseCrew Internships', 
    tagline: 'Talent Acquisition Platform', 
    category: 'HR', 
    icon: Briefcase, 
    description: 'A bridge between students and companies. Manage internship programs, applications, and assessments effortlessly.',
    features: ['Resume Parsing', 'Skill Assessment', 'Automated Scheduling', 'Offer Management'],
    specs: ['Database: 1M+ Students', 'AI Matching', 'Analytics Dashboard'],
    price: 'Free for Startups',
    gradient: 'from-yellow-500/20 to-orange-500/20'
  },
  { 
    id: 'w-lms', 
    name: 'WiseCrew E-Learning', 
    tagline: 'Corporate Training LMS', 
    category: 'Education', 
    icon: BookOpen,
    description: 'Upskill your workforce with our modern Learning Management System. Create courses, track progress, and issue certificates.',
    features: ['Interactive Video', 'Gamification', 'Quiz Engine', 'SCORM Compliant'],
    specs: ['Hosting: Cloud/On-Prem', 'Mobile Ready', 'White Label'],
    price: '$150/mo',
    gradient: 'from-fuchsia-500/20 to-pink-500/20'
  },
  { 
    id: 'w-payroll', 
    name: 'WiseCrew Payroll', 
    tagline: 'Global Payroll Solution', 
    category: 'Finance', 
    icon: CreditCard, 
    description: 'Automate payroll for employees and contractors in 150+ countries. Handles taxes, compliance, and benefits automatically.',
    features: ['Multi-currency', 'Tax Filing', 'Expense Reimbursement', 'Benefits Admin'],
    specs: ['Compliance: Global', 'Payouts: Same Day', 'Support: 24/7'],
    price: '$35/contractor',
    gradient: 'from-lime-500/20 to-green-500/20'
  },
  { 
    id: 'w-suite', 
    name: 'WiseCrew Enterprise', 
    tagline: 'The Full Operating System', 
    category: 'Enterprise', 
    icon: Boxes, 
    description: 'All WiseCrew products in one powerful suite. Unify your data, streamline operations, and save costs with the Enterprise plan.',
    features: ['SSO & SAML', 'Dedicated Success Manager', 'Custom SLAs', 'Audit Logs'],
    specs: ['Deployment: Custom', 'Support: Priority', 'Training: Included'],
    price: 'Contact Sales',
    gradient: 'from-slate-700/50 to-slate-800/50'
  },
];

// --- Sub-components ---

// Spotlight Effect Card
interface SpotlightCardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  gradient?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", onClick, gradient = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
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
      className={`relative rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
        }}
      />
      {/* Internal Gradient Mesh */}
      {gradient && (
         <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
      )}
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
};

// AI Assistant
const ProductAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{id: string, sender: 'user'|'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'init',
        sender: 'bot',
        text: "Hello! I'm WiseBot. I can help you find the right software solution for your needs. Are you looking for HR tools, Education software, or AI solutions?"
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // Mock AI response
      await new Promise(r => setTimeout(r, 1500));
      let response = "I can help with that. Could you clarify your requirements?";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('hr') || lower.includes('payroll') || lower.includes('employee')) {
         response = "For workforce management, I highly recommend WISECREW HRMS combined with WISECREW Payroll. They offer seamless integration for employee data and salary processing.";
      } else if (lower.includes('school') || lower.includes('education') || lower.includes('student')) {
         response = "WISECREW School Management System (EMS) is perfect for institutions. For online learning, check out WISECREW E-Learning Platform.";
      } else if (lower.includes('chat') || lower.includes('ai')) {
         response = "Our flagship WISECREW Chatbot uses GPT-4 for advanced conversational capabilities. For internal team comms, WISECREW Chat is the best choice.";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: response }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/40 hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'} items-center gap-2 animate-bounce-slow`}>
        <Bot size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[380px] h-[600px] max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-10 duration-300 font-sans">
          <SpotlightCard className="flex-1 flex flex-col p-0 border-blue-500/30 shadow-2xl !bg-[#0f172a]/95 backdrop-blur-xl">
             <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-inner">
                      <Bot size={20} />
                   </div>
                   <div>
                      <h3 className="font-bold text-white text-sm">WiseBot</h3>
                      <p className="text-[10px] text-blue-200 uppercase tracking-wider">Product Expert</p>
                   </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={18} /></button>
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg) => (
                   <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/5'}`}>
                         {msg.text}
                      </div>
                   </div>
                ))}
                {loading && <div className="text-xs text-slate-500 ml-4">Thinking...</div>}
                <div ref={scrollRef} />
             </div>
             <div className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
                <input 
                  type="text" 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleSend()} 
                  placeholder="Ask about products..." 
                  className="flex-1 bg-black/20 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 border border-white/10" 
                />
                <button onClick={handleSend} className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 shadow-lg"><Send size={16} /></button>
             </div>
          </SpotlightCard>
        </div>
      )}
    </>
  );
};

// --- Main Products View ---
const ProductsView: React.FC<ViewProps> = ({ onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filteredProducts = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-white selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
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
           <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Wisecrew Products</span>
        </div>
        <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-slate-200 transition-colors">
           Schedule Demo
        </button>
      </nav>

      {/* Product Detail Modal (Overlay) */}
      {selectedProduct && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 overflow-hidden">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setSelectedProduct(null)}></div>
            <div className="w-full h-full md:max-w-6xl md:h-[90vh] relative z-10 bg-[#0a0a0a] md:rounded-3xl border border-white/10 shadow-2xl overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-300 flex flex-col">
               
               {/* Modal Header */}
               <div className="sticky top-0 z-20 flex justify-between items-center p-6 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedProduct.gradient} text-white`}>
                        <selectedProduct.icon size={24} />
                     </div>
                     <h2 className="text-lg font-bold">{selectedProduct.name}</h2>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10">
                     <X size={20} />
                  </button>
               </div>

               {/* Modal Content */}
               <div className="p-6 md:p-12 space-y-16">
                  {/* Hero Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">
                           {selectedProduct.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{selectedProduct.tagline}</h1>
                        <p className="text-lg text-slate-400 leading-relaxed mb-8">{selectedProduct.description}</p>
                        <div className="flex flex-wrap gap-4">
                           <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-50 transition-colors">
                              Start Free Trial
                           </button>
                           <button className="px-8 py-3 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors">
                              View Documentation
                           </button>
                        </div>
                     </div>
                     <div className={`aspect-video rounded-2xl bg-gradient-to-br ${selectedProduct.gradient} relative overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl`}>
                        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
                        <selectedProduct.icon size={120} className="text-white/20 drop-shadow-lg" />
                        
                        {/* Mock UI Overlay */}
                        <div className="absolute bottom-0 left-8 right-8 h-1/2 bg-[#0f172a] rounded-t-xl border-t border-l border-r border-white/10 shadow-2xl p-4 opacity-90 transform translate-y-4">
                           <div className="flex gap-2 mb-4">
                              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                           </div>
                           <div className="space-y-2">
                              <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                              <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Features Grid */}
                  <div>
                     <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Key Features</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {selectedProduct.features.map((feat, i) => (
                           <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                                 <Zap size={20} />
                              </div>
                              <p className="font-bold text-slate-200">{feat}</p>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Specs & Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Technical Specs</h3>
                        <ul className="space-y-4">
                           {selectedProduct.specs.map((spec, i) => (
                              <li key={i} className="flex items-center gap-3 text-slate-400">
                                 <CheckCircle2 className="text-green-500" size={18} />
                                 {spec}
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"></div>
                         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Pricing Starts At</h3>
                         <div className="text-5xl font-bold text-white mb-6 tracking-tight">{selectedProduct.price}</div>
                         <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
                            Get License
                         </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* --- Main Content --- */}
      <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto">
         
         {/* New Wisecrew Tools Banner */}
         <Reveal width="100%" className="mb-12">
            <a 
              href="https://wisecrew-tools.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative block w-full rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
            >
               {/* Animated Background */}
               <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x opacity-80 group-hover:opacity-100 transition-opacity"></div>
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
               
               <div className="relative px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                     <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl">
                        <Sparkles size={32} className="text-white drop-shadow-md animate-pulse" />
                     </div>
                     <div className="text-white">
                        <div className="flex items-center gap-3 mb-1">
                           <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-black/30 border border-white/20 backdrop-blur-sm">New Launch</span>
                           <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">Wisecrew Tools</h2>
                        </div>
                        <p className="text-white/90 font-medium max-w-lg leading-snug">
                           Access our comprehensive suite of developer utilities, AI generators, and productivity tools. 100% Free.
                        </p>
                     </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                     <div className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold shadow-lg shadow-black/20 group-hover:bg-white/90 group-hover:scale-105 transition-all flex items-center gap-2">
                        Try It Now <ArrowUpRight size={18} />
                     </div>
                  </div>
               </div>
            </a>
         </Reveal>

         {/* Hero Section */}
         <Reveal width="100%">
            <div className="flex flex-col items-center text-center mb-24 relative">
               {/* Hero Background Elements */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -z-10"></div>
               
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
                  <Rocket size={16} /> Next-Gen Software Ecosystem
               </div>
               
               <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white leading-[1.1] md:leading-[1]">
                  Future-Proof <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Your Enterprise.</span>
               </h1>
               
               <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-12">
                  A unified suite of premium software products designed to streamline operations, empower employees, and scale your business globally.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
                     Explore All Products
                  </button>
                  <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors backdrop-blur-sm">
                     Book a Demo
                  </button>
               </div>

               {/* Floating UI Elements (Decorative) */}
               <div className="absolute top-20 left-0 hidden lg:block animate-float">
                  <SpotlightCard className="p-4 flex items-center gap-3 border-purple-500/30">
                     <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Bot size={20}/></div>
                     <div>
                        <div className="text-xs text-slate-400">AI Status</div>
                        <div className="text-sm font-bold text-white">Online & Learning</div>
                     </div>
                  </SpotlightCard>
               </div>
               <div className="absolute bottom-20 right-0 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
                  <SpotlightCard className="p-4 flex items-center gap-3 border-green-500/30">
                     <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><ShieldCheck size={20}/></div>
                     <div>
                        <div className="text-xs text-slate-400">Security</div>
                        <div className="text-sm font-bold text-white">SOC2 Compliant</div>
                     </div>
                  </SpotlightCard>
               </div>
            </div>
         </Reveal>

         {/* Filter Bar */}
         <div className="sticky top-24 z-40 mb-12 bg-[#020617]/80 backdrop-blur-xl py-4 border-y border-white/5">
            <div className="flex overflow-x-auto gap-2 max-w-full pb-2 md:pb-0 hide-scrollbar justify-start md:justify-center">
               {categories.map(cat => (
                  <button 
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                        activeCategory === cat 
                        ? 'bg-white text-black shadow-lg shadow-white/10' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
         </div>

         {/* Product Grid (Bento Style) */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px] mb-32">
            {filteredProducts.map((prod, idx) => (
               <Reveal key={prod.id} delay={idx * 50} width="100%" className={`${prod.category === 'Enterprise' ? 'md:col-span-2' : ''}`}>
                  <SpotlightCard 
                     onClick={() => setSelectedProduct(prod)}
                     gradient={prod.gradient}
                     className="h-full flex flex-col justify-between p-8"
                  >
                     <div className="flex justify-between items-start">
                        <div className="space-y-4">
                           <div className={`w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-inner`}>
                              <prod.icon size={24} />
                           </div>
                           <div>
                              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{prod.category}</div>
                              <h3 className="text-2xl font-bold text-white">{prod.name}</h3>
                           </div>
                        </div>
                        <ArrowUpRight className="text-slate-600 group-hover:text-white transition-colors" />
                     </div>
                     
                     <div>
                        <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">{prod.description}</p>
                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                           <span className="font-bold text-white">{prod.price}</span>
                           <span className="text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                              View Details <ChevronRight size={14}/>
                           </span>
                        </div>
                     </div>
                  </SpotlightCard>
               </Reveal>
            ))}
         </div>

         {/* Comparison Section */}
         <Reveal width="100%" className="mb-32">
            <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden">
               <div className="p-8 md:p-12 text-center border-b border-white/10">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose WiseCrew?</h2>
                  <p className="text-slate-400">See how we stack up against the competition.</p>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-400">
                     <thead className="bg-white/5 text-white uppercase font-bold">
                        <tr>
                           <th className="p-6">Feature</th>
                           <th className="p-6 text-blue-400">WiseCrew Suite</th>
                           <th className="p-6">Industry Standard</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {[
                           { name: 'Integration', us: 'Native Ecosystem', them: 'Third-party Plugins' },
                           { name: 'AI Capabilities', us: 'Built-in GPT-4', them: 'Paid Add-on' },
                           { name: 'Support', us: '24/7 Priority', them: 'Email Only' },
                           { name: 'Deployment', us: 'One-Click Cloud', them: 'Manual Setup' },
                           { name: 'Pricing', us: 'Transparent Flat Rate', them: 'Hidden Fees' }
                        ].map((row, i) => (
                           <tr key={i} className="hover:bg-white/5 transition-colors">
                              <td className="p-6 font-medium text-white">{row.name}</td>
                              <td className="p-6 text-blue-400 font-bold flex items-center gap-2">
                                 <CheckCircle2 size={16} /> {row.us}
                              </td>
                              <td className="p-6 opacity-60">{row.them}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </Reveal>

         {/* Roadmap Section */}
         <Reveal width="100%" className="mb-32">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Innovation Roadmap</h2>
               <p className="text-slate-400">What we are building next.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { q: 'Q4 2025', title: 'Generative UI', desc: 'Interfaces that adapt to user behavior in real-time.', status: 'In Development', color: 'text-amber-400', border: 'border-amber-500/30' },
                  { q: 'Q1 2026', title: 'Quantum Encryption', desc: 'Post-quantum cryptography for banking clients.', status: 'Planned', color: 'text-blue-400', border: 'border-blue-500/30' },
                  { q: 'Q2 2026', title: 'WiseVerse VR', desc: 'Immersive virtual workspaces for remote teams.', status: 'Research', color: 'text-purple-400', border: 'border-purple-500/30' }
               ].map((item, i) => (
                  <SpotlightCard key={i} className={`p-8 border-t-4 ${item.border}`}>
                     <div className={`text-sm font-bold ${item.color} mb-2`}>{item.q}</div>
                     <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                     <p className="text-slate-400 text-sm mb-4">{item.desc}</p>
                     <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs w-fit text-slate-300">
                        {item.status}
                     </div>
                  </SpotlightCard>
               ))}
            </div>
         </Reveal>
         
         {/* Success Stories */}
         <Reveal width="100%" className="mb-20">
            <div className="rounded-3xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 p-12 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-32 bg-blue-500/20 blur-[100px] rounded-full"></div>
               <Star className="w-12 h-12 text-yellow-500 mx-auto mb-6 fill-current" />
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  "WiseCrew Enterprise Suite reduced our operational costs by 40% within the first quarter. It's not just software; it's a competitive advantage."
               </h2>
               <div>
                  <div className="font-bold text-white text-lg">Sarah Jenkins</div>
                  <div className="text-slate-400">CTO, Nexus Dynamics</div>
               </div>
            </div>
         </Reveal>

      </div>

      <ProductAssistant />
    </div>
  );
};

export default ProductsView;