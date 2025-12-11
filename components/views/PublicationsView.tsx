import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, BookOpen, FileText, PenTool, Search, 
  BarChart, Code, CheckCircle, Upload, MessageSquare, 
  X, Send, Sparkles, Library, Globe, ScrollText, 
  GraduationCap, Loader2, Award, Zap, Cpu
} from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { GoogleGenAI } from "@google/genai";

interface ViewProps {
  onBack: () => void;
}

// --- Spotlight Card (Local) ---
const SpotlightCard = ({ children, className = "", onClick }: { children?: React.ReactNode, className?: string, onClick?: () => void }) => {
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
      className={`relative rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.01] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(14, 165, 233, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- Research Chatbot Component ---
const ResearchBot = () => {
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
        text: "Greetings! I am Athena, your Research Consultant. I can assist with journal selection (IEEE/Scopus), formatting guidelines, or refining your research topic. How can I assist you today?"
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
      // Mock response if no API key is set in env, or use GenAI if available
      // For this demo, we simulate intelligent responses based on keywords
      await new Promise(r => setTimeout(r, 1500));
      
      let responseText = "I can certainly help with that. Could you provide more specific details about your research domain?";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('ieee') || lower.includes('format')) {
        responseText = "For IEEE formatting, ensure your paper follows the two-column format, uses Times New Roman (10pt for body), and references are numbered in square brackets [1]. Would you like me to generate a template?";
      } else if (lower.includes('topic') || lower.includes('suggest')) {
        responseText = "Based on current trends, here are 3 hot topics: 1) Federated Learning in Healthcare, 2) Zero-Knowledge Proofs for Blockchain Privacy, 3) AI-driven Material Discovery. Which domain interests you?";
      } else if (lower.includes('plagiarism') || lower.includes('check')) {
        responseText = "We offer Turnitin and iThenticate reports. A similarity index below 10-15% is generally required for high-impact journals. Shall I schedule a check for your manuscript?";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: responseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: "My connection to the academic database is momentarily interrupted. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cyan-600 text-white shadow-lg shadow-cyan-600/40 hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'} items-center gap-2`}>
        <Sparkles size={20} /> <span className="hidden md:inline font-bold">Research Assistant</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-10 duration-300 font-sans">
          <SpotlightCard className="flex-1 flex flex-col p-0 border-cyan-500/30 shadow-2xl !bg-[#0f172a]/95 backdrop-blur-xl">
             {/* Header */}
             <div className="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold shadow-inner">
                      <Library size={20} />
                   </div>
                   <div>
                      <h3 className="font-bold text-white text-sm">Athena AI</h3>
                      <p className="text-[10px] text-cyan-200 uppercase tracking-wider">Research Consultant</p>
                   </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={18} /></button>
             </div>

             {/* Chat Area */}
             <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg) => (
                   <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/5'}`}>
                         {msg.text}
                      </div>
                   </div>
                ))}
                {loading && (
                   <div className="flex justify-start">
                      <div className="bg-white/10 text-slate-100 rounded-2xl rounded-bl-none p-3 border border-white/5 flex items-center gap-2">
                         <Loader2 size={14} className="animate-spin" /> Analyzing...
                      </div>
                   </div>
                )}
                <div ref={scrollRef} />
             </div>

             {/* Input */}
             <div className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
                <input 
                  type="text" 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleSend()} 
                  placeholder="Ask about journals, formatting..." 
                  className="flex-1 bg-black/20 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 border border-white/10" 
                />
                <button onClick={handleSend} className="p-2 bg-cyan-600 rounded-full text-white hover:bg-cyan-500 shadow-lg"><Send size={16} /></button>
             </div>
          </SpotlightCard>
        </div>
      )}
    </>
  );
};

// --- Mock AI Tools ---
const ResearchTopicGenerator = () => {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!domain) return;
    setLoading(true);
    setTimeout(() => {
      setResults([
        `Advanced Deep Learning Architectures for ${domain} Optimization`,
        `Ethical Implications of ${domain} in Modern Society`,
        `A Comparative Analysis of ${domain} Algorithms using Cloud Computing`,
        `Sustainable Approaches to ${domain} Implementation`
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
       <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap size={18} className="text-yellow-400" /> AI Topic Generator
       </h3>
       <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain (e.g. IoT, Blockchain)" 
            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" 
          />
          <button onClick={handleGenerate} disabled={loading} className="px-4 py-2 bg-cyan-600 text-white text-sm font-bold rounded-lg hover:bg-cyan-500">
             {loading ? <Loader2 size={14} className="animate-spin"/> : 'Generate'}
          </button>
       </div>
       <div className="space-y-2">
          {results.map((res, i) => (
             <div key={i} className="p-3 bg-black/20 rounded-lg text-xs text-slate-300 border-l-2 border-cyan-500">
                {res}
             </div>
          ))}
       </div>
    </div>
  );
};

// --- Main View Component ---
const PublicationsView: React.FC<ViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#020617] font-sans text-white selection:bg-cyan-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/50 border-b border-white/5">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-colors">
                <ArrowLeft size={16} />
            </div>
            Back to Ecosystem
        </button>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
           <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Wisecrew Publications</span>
        </div>
        <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
           <Upload size={14} /> Submit Manuscript
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <Reveal width="100%">
           <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                 <ScrollText size={12} fill="currentColor" /> Premier Research Services
              </div>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                 Publish with <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Impact.</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                 End-to-end research support for scholars and professionals. From concept to publication in high-impact journals (IEEE, Scopus, SCI).
              </p>
              
              {/* Journal Badges */}
              <div className="flex flex-wrap justify-center gap-4 opacity-70">
                 {['IEEE Xplore', 'Scopus', 'Web of Science', 'Springer', 'UGC Care', 'SCI'].map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-slate-300">
                       {tag}
                    </span>
                 ))}
              </div>
           </div>
        </Reveal>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
           {/* Card 1: Article Writing (Large) */}
           <Reveal width="100%" className="md:col-span-2">
              <SpotlightCard className="h-full p-8 flex flex-col justify-between bg-gradient-to-br from-[#0a0a0a] to-[#0f172a]">
                 <div className="flex justify-between items-start">
                    <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                       <FileText size={32} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Core Service</span>
                 </div>
                 <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Research Paper Writing</h3>
                    <p className="text-slate-400 mb-6 max-w-lg">
                       Comprehensive drafting services for conferences and journals. We handle literature review, methodology formulation, and result discussion with technical precision.
                    </p>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 rounded text-xs bg-white/5 border border-white/10 text-slate-300">Novelty Check</span>
                       <span className="px-3 py-1 rounded text-xs bg-white/5 border border-white/10 text-slate-300">Plagiarism Removal</span>
                    </div>
                 </div>
              </SpotlightCard>
           </Reveal>

           {/* Card 2: Book Writing (Vertical) */}
           <Reveal width="100%" className="md:row-span-2">
              <SpotlightCard className="h-full p-8 flex flex-col relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px]"></div>
                 <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 mb-6">
                       <BookOpen size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Book Writing</h3>
                    <p className="text-slate-400 text-sm">Full-service authorship support across all domains.</p>
                 </div>
                 
                 <div className="flex-1 space-y-4">
                    {['Technology & Engineering', 'Medical Sciences', 'Management & Business', 'Humanities & Arts'].map((domain, i) => (
                       <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                          <CheckCircle size={16} className="text-purple-400 flex-shrink-0" /> 
                          <span className="text-xs text-slate-300">{domain}</span>
                       </div>
                    ))}
                 </div>
                 <button className="w-full mt-6 py-3 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/50 rounded-xl transition-all text-sm font-bold">
                    Start Your Book
                 </button>
              </SpotlightCard>
           </Reveal>

           {/* Card 3: Thesis Support */}
           <Reveal width="100%">
              <SpotlightCard className="h-full p-6 flex flex-col justify-center">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-blue-500/10 text-blue-400"><GraduationCap size={24} /></div>
                    <h3 className="text-xl font-bold">Thesis / Dissertation</h3>
                 </div>
                 <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    PhD and Masters level support. From proposal defense to final viva preparation.
                 </p>
                 <div className="mt-auto h-1 w-full bg-blue-900/30 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-blue-500"></div>
                 </div>
                 <p className="text-[10px] text-blue-400 mt-2 text-right">High Acceptance Rate</p>
              </SpotlightCard>
           </Reveal>

           {/* Card 4: Technical Services */}
           <Reveal width="100%">
              <SpotlightCard className="h-full p-6 flex flex-col justify-center">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-green-500/10 text-green-400"><Code size={24} /></div>
                    <h3 className="text-xl font-bold">Implementation</h3>
                 </div>
                 <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    MATLAB, Python, NS2/NS3, Java. Algorithm development and data analysis support.
                 </p>
                 <div className="flex gap-2 flex-wrap">
                    {['AI/ML', 'IoT', 'Cloud', 'Data Science'].map(t => (
                       <span key={t} className="text-[10px] px-2 py-1 bg-black rounded text-slate-500 border border-white/10">{t}</span>
                    ))}
                 </div>
              </SpotlightCard>
           </Reveal>
        </div>

        {/* AI Tools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Reveal width="100%">
              <div className="space-y-6">
                 <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Cpu size={32} className="text-cyan-500"/> AI Research Suite
                 </h2>
                 <p className="text-slate-400 leading-relaxed">
                    Accelerate your workflow with our proprietary AI tools designed for researchers. 
                    Generate valid problem statements, find research gaps, and organize references instantly.
                 </p>
                 <ResearchTopicGenerator />
              </div>
           </Reveal>

           <Reveal width="100%" delay={200}>
              <SpotlightCard className="h-full p-8 bg-[#0c0c0c] border border-white/10">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Manuscript Quality Check</h3>
                    <div className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase rounded border border-green-500/20">Beta</div>
                 </div>
                 <div className="border-2 border-dashed border-white/10 rounded-xl h-48 flex flex-col items-center justify-center text-slate-500 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-pointer group">
                    <Upload size={32} className="mb-4 group-hover:text-cyan-400" />
                    <p className="text-sm">Drag & drop your .docx or .pdf</p>
                    <p className="text-xs opacity-50 mt-2">Get an instant score on grammar & flow</p>
                 </div>
                 <div className="mt-6 flex justify-between items-center text-sm text-slate-400">
                    <span>Supported: IEEE, APA, MLA</span>
                    <button className="text-cyan-400 hover:underline">View Sample Report</button>
                 </div>
              </SpotlightCard>
           </Reveal>
        </div>

        {/* Stats / Trust */}
        <Reveal width="100%">
           <div className="border-t border-white/5 pt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                 <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">Papers Published</div>
                 </div>
                 <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">Client Satisfaction</div>
                 </div>
                 <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">Book Chapters</div>
                 </div>
                 <div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">Research Support</div>
                 </div>
              </div>
           </div>
        </Reveal>

      </div>

      <ResearchBot />
    </div>
  );
};

export default PublicationsView;