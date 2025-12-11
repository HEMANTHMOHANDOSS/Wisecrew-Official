import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, User, Briefcase, FileText, Settings, LogOut, Search, MapPin, 
  Clock, Upload, Bell, CheckCircle, FileEdit, Download, ChevronRight, 
  Bookmark, Video, Award, Calendar, Cpu, Zap, MessageSquare, Mic, 
  Volume2, Send, X, AlertCircle, PlayCircle, ShieldCheck, Timer, AlertTriangle,
  Building, DollarSign, Filter, Globe, Sparkles
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import GlassCard from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';

interface ViewProps {
  onBack: () => void;
}

// --- Mock Data ---
const JOBS = [
  { id: 1, role: 'Senior React Developer', type: 'Full Time', loc: 'Remote', salary: '$80k - $120k', company: 'Wisecrew Solutions', match: 95, posted: '2d ago', tags: ['React', 'TypeScript', 'Redux'], logo: 'W', description: "We are looking for a Senior React Developer to lead our frontend initiatives. You will be responsible for architecting scalable UI components and mentoring junior developers." },
  { id: 2, role: 'Gen AI Engineer', type: 'Internship', loc: 'Bangalore', salary: 'Stipend', company: 'Wisecrew AI Labs', match: 88, posted: '1d ago', tags: ['Python', 'LLM', 'LangChain'], logo: 'A', description: "Join our AI research team to build next-generation LLM applications. Experience with Python and Vector Databases is a must." },
  { id: 3, role: 'Product Designer', type: 'Full Time', loc: 'Hybrid', salary: '$60k - $90k', company: 'Wisecrew Design', match: 70, posted: '5d ago', tags: ['Figma', 'UX/UI', 'Prototyping'], logo: 'D', description: "Craft intuitive and beautiful user experiences. You will work closely with PMs and Engineers to deliver high-fidelity prototypes." },
  { id: 4, role: 'DevOps Engineer', type: 'Contract', loc: 'Remote', salary: '$50/hr', company: 'Wisecrew Cloud', match: 65, posted: '1w ago', tags: ['AWS', 'Docker', 'K8s'], logo: 'C', description: "Manage our cloud infrastructure and CI/CD pipelines. Deep knowledge of AWS and Kubernetes is required." },
  { id: 5, role: 'Marketing Specialist', type: 'Full Time', loc: 'Chennai', salary: '$40k - $60k', company: 'Wisecrew Marketing', match: 60, posted: '3d ago', tags: ['SEO', 'Content', 'Social'], logo: 'M', description: "Drive our digital presence. You will manage social media campaigns and SEO strategies to boost brand visibility." },
];

const APPLICATIONS = [
  { 
    id: 'APP-001', role: 'Frontend Developer', company: 'Wisecrew Solutions', date: 'Oct 15, 2025', 
    status: 'Interview', progress: 60,
    timeline: [
      { step: 'Applied', date: 'Oct 15', done: true },
      { step: 'Screening', date: 'Oct 16', done: true },
      { step: 'Skill Test', date: 'Oct 18', done: true },
      { step: 'Interview', date: 'Scheduled: Oct 25', done: false, current: true },
      { step: 'Offer', date: 'Pending', done: false }
    ]
  },
  { 
    id: 'APP-002', role: 'UX Intern', company: 'Wisecrew Design', date: 'Oct 10, 2025', 
    status: 'Rejected', progress: 100,
    timeline: [
      { step: 'Applied', date: 'Oct 10', done: true },
      { step: 'Screening', date: 'Oct 12', done: true },
      { step: 'Rejected', date: 'Oct 14', done: true, failed: true }
    ]
  }
];

const TESTS = [
  { id: 1, title: "Frontend Skill Assessment", duration: "60 Mins", questions: 30, status: "Pending", dueDate: "Oct 24, 2025" },
  { id: 2, title: "Cognitive Aptitude Test", duration: "45 Mins", questions: 40, status: "Completed", score: "85%" },
];

// --- AI Recruiter Bot Component ---
const CareerBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [messages, setMessages] = useState<{id: string, sender: 'user'|'bot', text: string}[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && connectionStatus === 'disconnected') {
        setConnectionStatus('connecting');
        setTimeout(() => {
            setConnectionStatus('connected');
            setMessages([{ id: '1', sender: 'bot', text: "Hi! I'm Riya, your AI Talent Specialist at Wisecrew Careers. Looking for a job or need interview tips?" }]);
            speak("Hi! I'm Riya, your AI Talent Specialist at Wisecrew Careers. Looking for a job or need interview tips?");
        }, 2000);
    }
  }, [isOpen]);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, connectionStatus]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userText = inputText;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userText }]);
    setInputText('');
    setIsTyping(true);

    try {
      const apiKey = process.env.API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userText,
        config: {
          systemInstruction: `You are Riya, a professional AI Recruiter for Wisecrew Careers. Tone: Professional, empathetic, encouraging. Assist with job search, resume tips.`
        }
      });

      const responseText = response.text || "I couldn't generate a response.";
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), sender: 'bot', text: responseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), sender: 'bot', text: "Connection issue. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Female')) || voices[0];
      utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/40 hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'} animate-bounce-slow`}>
        <MessageSquare size={28} />
      </button>
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[380px] h-[600px] max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 font-sans">
          <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden border-amber-500/30 shadow-2xl !bg-[#0f172a]/95 backdrop-blur-xl">
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-amber-600/20 to-orange-600/20 flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className="relative">
                     <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shadow-inner border border-white/20">R</div>
                     {connectionStatus === 'connected' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f172a]"></div>}
                  </div>
                  <div>
                     <h3 className="font-bold text-white text-sm">Riya AI</h3>
                     <p className="text-[10px] text-amber-200 uppercase tracking-wider">{connectionStatus === 'connecting' ? 'Connecting...' : 'Recruiter'}</p>
                  </div>
               </div>
               <button onClick={() => {setIsOpen(false); setConnectionStatus('disconnected');}} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={20} /></button>
            </div>

            {connectionStatus === 'connecting' ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-amber-500/20 animate-ping absolute inset-0"></div>
                        <div className="w-24 h-24 rounded-full bg-amber-500/20 animate-pulse absolute inset-0 delay-75"></div>
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center relative z-10 shadow-2xl">
                            <Briefcase size={40} className="text-white animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Connecting to Riya...</h3>
                        <p className="text-sm text-amber-200/70">Reviewing your profile context</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-amber-600 text-white rounded-br-none' : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/5'}`}>
                                {msg.text}
                                {msg.sender === 'bot' && <button onClick={() => speak(msg.text)} className="ml-2 opacity-50 hover:opacity-100 align-middle"><Volume2 size={12}/></button>}
                            </div>
                        </div>
                    ))}
                    {isTyping && <div className="text-xs text-white/50 p-2">Riya is typing...</div>}
                    <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
                    <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask about jobs..." className="flex-1 bg-black/20 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500 border border-white/10" />
                    <button onClick={handleSend} className="p-2 bg-amber-600 rounded-full text-white hover:bg-amber-500 shadow-lg"><Send size={16} /></button>
                    </div>
                </>
            )}
          </GlassCard>
        </div>
      )}
    </>
  );
};

// --- Main View ---
const CareerView: React.FC<ViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'applications' | 'assessments' | 'profile'>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [takingTest, setTakingTest] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const TestEnvironment = () => (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col animate-in zoom-in-95 duration-300">
       {/* Top Bar */}
       <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-bold text-white">W</div>
             <div>
                <h3 className="text-white font-bold">Frontend Skill Assessment</h3>
                <p className="text-xs text-slate-400">ID: ASS-2025-001</p>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 text-amber-500 font-mono font-bold bg-amber-500/10 px-3 py-1 rounded">
                <Timer size={18} /> 59:21
             </div>
             <button onClick={() => setTakingTest(false)} className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-500">End Test</button>
          </div>
       </div>
       
       {/* Content */}
       <div className="flex-1 flex">
          {/* Question Panel */}
          <div className="flex-1 p-8 overflow-y-auto">
             <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                   <h2 className="text-xl text-white font-bold mb-4">Question 1 of 30</h2>
                   <p className="text-slate-300 text-lg leading-relaxed">
                      What is the primary difference between `useEffect` and `useLayoutEffect` in React?
                   </p>
                </div>
                <div className="space-y-4">
                   {[
                     "useLayoutEffect runs asynchronously after render, while useEffect runs synchronously.",
                     "useEffect runs asynchronously after paint, while useLayoutEffect runs synchronously before paint.",
                     "They are identical in behavior.",
                     "useLayoutEffect is deprecated in React 18."
                   ].map((opt, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-700 hover:border-amber-500 cursor-pointer transition-colors group">
                         <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-amber-500 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </div>
                         <span className="text-slate-300 group-hover:text-white">{opt}</span>
                      </div>
                   ))}
                </div>
                <div className="flex justify-between mt-12">
                   <button className="px-6 py-3 border border-slate-700 text-slate-400 rounded-lg font-bold hover:text-white">Previous</button>
                   <button className="px-6 py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600">Next Question</button>
                </div>
             </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-72 bg-slate-900 border-l border-slate-800 p-6">
             <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl mb-6">
                <div className="flex items-center gap-2 text-amber-500 font-bold mb-2">
                   <AlertTriangle size={18} /> Proctored Mode
                </div>
                <p className="text-xs text-slate-400">Your screen and camera are being monitored. Switching tabs will terminate the test.</p>
             </div>
             
             <h4 className="text-white font-bold mb-4">Question Palette</h4>
             <div className="grid grid-cols-5 gap-2">
                {[...Array(30)].map((_, i) => (
                   <div key={i} className={`h-8 rounded flex items-center justify-center text-xs font-bold cursor-pointer ${i === 0 ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}>
                      {i + 1}
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );

  // --- Public Landing Page ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] overflow-x-hidden font-sans">
         {/* Navbar */}
         <nav className="fixed top-0 w-full z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--glass-border)]">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
               <div className="flex items-center gap-2" onClick={onBack}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 cursor-pointer">
                     <Briefcase size={24} />
                  </div>
                  <span className="font-bold text-xl text-[var(--text-primary)] tracking-tight cursor-pointer">WiseCareer</span>
               </div>
               <div className="flex gap-4">
                  <button onClick={onBack} className="hidden md:flex text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-4 py-2 items-center gap-2 transition-colors">
                     <ArrowLeft size={16}/> Back
                  </button>
                  <button onClick={() => { setIsLoggedIn(true); setAuthMode('login'); }} className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-colors">
                     Candidate Login
                  </button>
               </div>
            </div>
         </nav>

         {/* Hero */}
         <section className="relative pt-32 pb-20 px-6">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <Reveal width="100%">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-8">
                     <Sparkles size={14} /> Hire or Get Hired
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-[var(--text-primary)] mb-6 leading-tight tracking-tight">
                     Find Your Dream <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Tech Career</span>
                  </h1>
                  <p className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed max-w-lg">
                     Join the elite workforce. We connect top talent with world-class companies through AI-driven matching and skill-based assessments.
                  </p>
                  
                  {/* Search Bar */}
                  <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-2 rounded-full flex flex-col md:flex-row gap-2 max-w-lg shadow-2xl shadow-amber-500/10">
                     <div className="flex-1 flex items-center px-4">
                        <Search size={20} className="text-[var(--text-secondary)] mr-3" />
                        <input type="text" placeholder="Job title or keyword..." className="bg-transparent w-full focus:outline-none text-[var(--text-primary)]" />
                     </div>
                     <button onClick={() => { setIsLoggedIn(true); setActiveTab('jobs'); }} className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-colors">
                        Search Jobs
                     </button>
                  </div>
               </Reveal>

               {/* Hero Visual */}
               <Reveal width="100%" delay={200} className="relative">
                  <GlassCard className="p-6 relative z-20 border-amber-500/20 bg-[var(--bg-secondary)]/80">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-[var(--text-primary)]">Trending Roles</h3>
                        <span className="text-xs text-amber-500 font-bold bg-amber-500/10 px-2 py-1 rounded">Live Updates</span>
                     </div>
                     <div className="space-y-4">
                        {JOBS.slice(0,3).map(job => (
                           <div key={job.id} className="flex items-center gap-4 p-3 hover:bg-[var(--glass-bg)] rounded-xl transition-colors cursor-pointer border border-transparent hover:border-[var(--glass-border)]">
                              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">{job.logo}</div>
                              <div>
                                 <h4 className="font-bold text-[var(--text-primary)] text-sm">{job.role}</h4>
                                 <p className="text-xs text-[var(--text-secondary)]">{job.company} • {job.salary}</p>
                              </div>
                              <button className="ml-auto p-2 rounded-full hover:bg-[var(--glass-border)] text-[var(--text-secondary)]">
                                 <ChevronRight size={16} />
                              </button>
                           </div>
                        ))}
                     </div>
                  </GlassCard>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-10 -right-10 z-10 animate-float">
                     <GlassCard className="p-4 flex items-center gap-3 !rounded-2xl">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"><CheckCircle size={20}/></div>
                        <div>
                           <p className="text-xs text-[var(--text-secondary)]">Offer Accepted</p>
                           <p className="font-bold text-[var(--text-primary)]">Frontend Dev</p>
                        </div>
                     </GlassCard>
                  </div>
               </Reveal>
            </div>
         </section>

         {/* Features */}
         <section className="py-24 bg-[var(--glass-bg)]">
            <div className="max-w-6xl mx-auto px-6">
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Why WiseCareer?</h2>
                  <p className="text-[var(--text-secondary)]">We don't just list jobs; we build careers.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { title: "AI Skill Matching", icon: Cpu, desc: "Our algorithm matches your skills specifically to job requirements, increasing acceptance rates." },
                     { title: "Verified Companies", icon: ShieldCheck, desc: "Apply with confidence. All companies are vetted for culture and financial stability." },
                     { title: "Career Roadmap", icon: MapPin, desc: "Get a personalized growth path to reach your dream role." }
                  ].map((feat, i) => (
                     <GlassCard key={i} className="p-8 text-center hover:-translate-y-2 transition-transform">
                        <div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
                           <feat.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{feat.title}</h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feat.desc}</p>
                     </GlassCard>
                  ))}
               </div>
            </div>
         </section>

         {/* CTA */}
         <section className="py-24 px-6 text-center">
            <div className="max-w-4xl mx-auto">
               <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Ready to shape your future?</h2>
               <button onClick={() => { setIsLoggedIn(true); setAuthMode('register'); }} className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full shadow-lg shadow-amber-500/40 hover:scale-105 transition-transform">
                  Create Candidate Profile
               </button>
            </div>
         </section>
      </div>
    );
  }

  // --- Private Dashboard Views ---

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Briefcase size={80} /></div>
             <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Total Applications</h3>
             <div className="text-4xl font-bold text-[var(--text-primary)]">12</div>
             <div className="mt-4 flex items-center gap-2 text-green-400 text-sm font-medium">2 new updates</div>
          </GlassCard>
          <GlassCard className="p-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><User size={80} /></div>
             <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Profile Score</h3>
             <div className="text-4xl font-bold text-amber-500">85%</div>
             <div className="mt-4 text-sm text-[var(--text-secondary)]">Add 2 more skills to reach 100%</div>
          </GlassCard>
          <GlassCard className="p-6 relative overflow-hidden group bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500/30">
             <div className="absolute top-0 right-0 p-4 opacity-20"><Video size={80} /></div>
             <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider mb-2">Upcoming Interview</h3>
             <div className="text-xl font-bold text-white mb-1">Frontend Dev Round 2</div>
             <div className="text-sm text-amber-100">Tomorrow, 10:00 AM • Google Meet</div>
             <button className="mt-4 px-4 py-2 bg-white text-amber-600 font-bold rounded-lg text-sm hover:bg-amber-50 transition-colors">Join Waiting Room</button>
          </GlassCard>
       </div>

       <div>
          <div className="flex justify-between items-end mb-6">
             <h3 className="text-xl font-bold text-[var(--text-primary)]">Recommended For You</h3>
             <button onClick={() => setActiveTab('jobs')} className="text-sm text-amber-500 hover:text-amber-400 font-medium">View All Jobs</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {JOBS.slice(0, 4).map(job => (
                <GlassCard key={job.id} className="p-5 flex flex-col h-full hover:border-amber-500/50 transition-colors group cursor-pointer" onClick={() => { setActiveTab('jobs'); setSelectedJobId(job.id); }}>
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--glass-border)] flex items-center justify-center font-bold text-[var(--text-primary)]">{job.logo}</div>
                      <div className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">{job.match}% Match</div>
                   </div>
                   <h4 className="font-bold text-[var(--text-primary)] mb-1 group-hover:text-amber-500 transition-colors">{job.role}</h4>
                   <p className="text-xs text-[var(--text-secondary)] mb-4">{job.company}</p>
                   <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.slice(0,2).map(t => <span key={t} className="text-[10px] px-2 py-1 bg-[var(--bg-secondary)] rounded text-[var(--text-secondary)]">{t}</span>)}
                   </div>
                   <div className="mt-auto pt-4 border-t border-[var(--glass-border)] flex justify-between items-center">
                      <span className="text-xs font-bold text-[var(--text-primary)]">{job.salary}</span>
                      <span className="text-[10px] text-[var(--text-secondary)]">{job.posted}</span>
                   </div>
                </GlassCard>
             ))}
          </div>
       </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {APPLICATIONS.map((app) => (
        <GlassCard key={app.id} className="p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
             <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{app.role}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{app.company} • Applied on {app.date}</p>
             </div>
             <div className="flex items-center gap-3">
                 <span className={`px-3 py-1 rounded-full text-xs font-bold border ${app.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                    {app.status}
                 </span>
                 <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium">View Details</button>
             </div>
          </div>
          
          <div className="relative">
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[var(--glass-border)] -translate-y-1/2 hidden md:block"></div>
             <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
                {app.timeline.map((step, idx) => (
                   <div key={idx} className={`flex md:flex-col items-center gap-4 md:gap-2 ${step.done ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.done ? (step.failed ? 'bg-red-500 border-red-500 text-white' : 'bg-green-500 border-green-500 text-white') : 'bg-[var(--bg-secondary)] border-[var(--glass-border)] text-[var(--text-secondary)]'}`}>
                         {step.done ? (step.failed ? <X size={14} /> : <CheckCircle size={14} />) : <div className="w-2 h-2 rounded-full bg-current"></div>}
                      </div>
                      <div className="md:text-center">
                         <p className={`text-sm font-bold ${step.current ? 'text-amber-500' : 'text-[var(--text-primary)]'}`}>{step.step}</p>
                         <p className="text-xs text-[var(--text-secondary)]">{step.date}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );

  const renderAssessments = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
      {TESTS.map((test) => (
         <GlassCard key={test.id} className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
               <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Cpu size={24} />
               </div>
               {test.status === 'Completed' ? (
                  <span className="px-3 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">Score: {test.score}</span>
               ) : (
                  <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20">Due: {test.dueDate}</span>
               )}
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{test.title}</h3>
            <div className="flex gap-4 text-sm text-[var(--text-secondary)] mb-6">
               <span className="flex items-center gap-1"><Clock size={14} /> {test.duration}</span>
               <span className="flex items-center gap-1"><FileText size={14} /> {test.questions} Qs</span>
            </div>
            <button 
              onClick={() => test.status === 'Pending' && setTakingTest(true)}
              disabled={test.status === 'Completed'}
              className={`mt-auto w-full py-3 rounded-xl font-bold transition-all ${test.status === 'Completed' ? 'bg-[var(--glass-border)] text-[var(--text-secondary)] cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20'}`}
            >
               {test.status === 'Completed' ? 'View Report' : 'Start Assessment'}
            </button>
         </GlassCard>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col md:flex-row pb-20 md:pb-0">
       {takingTest && <TestEnvironment />}

       {/* Sidebar */}
       <aside className="hidden md:flex w-72 border-r border-[var(--glass-border)] bg-[var(--bg-secondary)] flex-col fixed h-full z-40">
          <div className="p-6 h-20 flex items-center gap-3 border-b border-[var(--glass-border)]">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                <Briefcase size={24} />
             </div>
             <div>
                <h1 className="font-bold text-[var(--text-primary)] text-lg">WiseCareer</h1>
                <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Talent Portal</p>
             </div>
          </div>
          
          <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
             {[
               { id: 'dashboard', label: 'Dashboard', icon: User },
               { id: 'jobs', label: 'Find Jobs', icon: Search },
               { id: 'applications', label: 'My Applications', icon: FileText },
               { id: 'assessments', label: 'Assessments', icon: Cpu },
               { id: 'profile', label: 'My Profile', icon: Settings },
             ].map((item) => (
               <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === item.id ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-500 font-bold border border-amber-500/30' : 'text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]'}`}
               >
                  <item.icon size={20} className={`transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-amber-500' : ''}`} />
                  {item.label}
               </button>
             ))}
          </div>

          <div className="p-4 border-t border-[var(--glass-border)]">
             <button onClick={() => {setIsLoggedIn(false); onBack();}} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
             </button>
          </div>
       </aside>

       {/* Mobile Nav */}
       <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--bg-secondary)] border-t border-[var(--glass-border)] z-[100] flex items-center justify-around px-2">
           {['dashboard', 'jobs', 'applications', 'assessments', 'profile'].map((tab) => (
             <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`p-2 rounded-xl transition-colors ${activeTab === tab ? 'text-amber-500 bg-amber-500/10' : 'text-[var(--text-secondary)]'}`}
             >
                {tab === 'dashboard' && <User size={24} />}
                {tab === 'jobs' && <Search size={24} />}
                {tab === 'applications' && <FileText size={24} />}
                {tab === 'assessments' && <Cpu size={24} />}
                {tab === 'profile' && <Settings size={24} />}
             </button>
           ))}
       </div>

       {/* Main Content */}
       <main className="flex-1 md:ml-72 min-h-screen p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto max-w-screen-2xl mx-auto w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
             <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)] capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h1>
                <p className="text-sm text-[var(--text-secondary)]">Welcome back, Candidate.</p>
             </div>
             <div className="flex items-center gap-4">
                <button className="p-2 rounded-full bg-[var(--glass-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative">
                   <Bell size={20} />
                   <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 ring-2 ring-[var(--glass-border)]"></div>
             </div>
          </div>

          {/* Views */}
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'applications' && renderApplications()}
          {activeTab === 'assessments' && renderAssessments()}
          
          {activeTab === 'jobs' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 h-[calc(100vh-140px)] flex flex-col">
                <div className="flex gap-4 mb-6 shrink-0">
                   <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
                      <input type="text" placeholder="Search role, skill, or company..." className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl pl-12 pr-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-amber-500" />
                   </div>
                   <button className="px-6 py-3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl text-[var(--text-secondary)] font-bold hover:text-[var(--text-primary)] flex items-center gap-2">
                      <Filter size={18} /> Filters
                   </button>
                </div>
                
                {/* Split Pane View */}
                <div className="flex gap-6 flex-1 min-h-0">
                   {/* Job List */}
                   <div className={`w-full ${selectedJobId ? 'hidden lg:block lg:w-1/3' : 'block'} overflow-y-auto pr-2 space-y-4 custom-scrollbar`}>
                      {JOBS.map(job => (
                         <div 
                           key={job.id} 
                           onClick={() => setSelectedJobId(job.id)}
                           className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-lg ${selectedJobId === job.id ? 'bg-amber-500/10 border-amber-500' : 'bg-[var(--glass-bg)] border-[var(--glass-border)] hover:border-amber-500/50'}`}
                         >
                            <div className="flex justify-between items-start mb-2">
                               <h3 className={`font-bold ${selectedJobId === job.id ? 'text-amber-500' : 'text-[var(--text-primary)]'}`}>{job.role}</h3>
                               <span className="text-xs text-[var(--text-secondary)]">{job.posted}</span>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] mb-2">{job.company}</p>
                            <div className="flex flex-wrap gap-2">
                               <span className="text-[10px] px-2 py-1 bg-[var(--bg-secondary)] rounded text-[var(--text-secondary)] border border-[var(--glass-border)]">{job.loc}</span>
                               <span className="text-[10px] px-2 py-1 bg-[var(--bg-secondary)] rounded text-[var(--text-secondary)] border border-[var(--glass-border)]">{job.type}</span>
                            </div>
                         </div>
                      ))}
                   </div>

                   {/* Job Details */}
                   <div className={`w-full ${selectedJobId ? 'block' : 'hidden lg:flex lg:items-center lg:justify-center'} lg:w-2/3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl overflow-hidden flex flex-col`}>
                      {selectedJobId ? (
                         (() => {
                            const job = JOBS.find(j => j.id === selectedJobId)!;
                            return (
                               <div className="flex flex-col h-full animate-in fade-in">
                                  <div className="p-6 border-b border-[var(--glass-border)]">
                                     <button onClick={() => setSelectedJobId(null)} className="lg:hidden mb-4 flex items-center gap-2 text-[var(--text-secondary)]"><ArrowLeft size={16}/> Back to List</button>
                                     <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                           <div className="w-16 h-16 rounded-xl bg-amber-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">{job.logo}</div>
                                           <div>
                                              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{job.role}</h2>
                                              <p className="text-[var(--text-secondary)]">{job.company} • {job.loc} • {job.type}</p>
                                           </div>
                                        </div>
                                        <div className="flex gap-2">
                                           <button className="p-2 rounded-lg border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-amber-500"><Bookmark size={20}/></button>
                                           <button className="p-2 rounded-lg border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-amber-500"><MessageSquare size={20}/></button>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                     <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--glass-border)]">
                                           <p className="text-xs text-[var(--text-secondary)] uppercase">Salary</p>
                                           <p className="font-bold text-[var(--text-primary)]">{job.salary}</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--glass-border)]">
                                           <p className="text-xs text-[var(--text-secondary)] uppercase">Match Score</p>
                                           <p className="font-bold text-green-400">{job.match}% Compatible</p>
                                        </div>
                                     </div>
                                     <div>
                                        <h3 className="font-bold text-[var(--text-primary)] mb-2">Job Description</h3>
                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{job.description}</p>
                                     </div>
                                     <div>
                                        <h3 className="font-bold text-[var(--text-primary)] mb-2">Required Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                           {job.tags.map(t => <span key={t} className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium">{t}</span>)}
                                        </div>
                                     </div>
                                  </div>
                                  <div className="p-6 border-t border-[var(--glass-border)] bg-[var(--bg-secondary)]/50">
                                     <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all">Apply Now</button>
                                  </div>
                               </div>
                            );
                         })()
                      ) : (
                         <div className="text-center p-8">
                            <div className="w-20 h-20 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
                               <Briefcase size={40} className="text-[var(--text-secondary)] opacity-50" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Select a Job</h3>
                            <p className="text-[var(--text-secondary)]">Click on a job card to view details and apply.</p>
                         </div>
                      )}
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'profile' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="lg:col-span-2 space-y-6">
                   <GlassCard className="p-6">
                      <div className="flex justify-between items-center mb-4">
                         <h3 className="font-bold text-[var(--text-primary)]">About Me</h3>
                         <button className="text-amber-500 text-sm font-bold flex items-center gap-1"><FileEdit size={14}/> Edit</button>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                         Passionate Full Stack Developer with 2 years of experience in building scalable web applications using React, Node.js, and TypeScript. Looking for challenging roles in product-based companies.
                      </p>
                   </GlassCard>
                   <GlassCard className="p-6">
                      <h3 className="font-bold text-[var(--text-primary)] mb-4">Experience</h3>
                      <div className="space-y-4">
                         <div className="flex gap-4">
                            <div className="w-10 h-10 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center"><Briefcase size={20}/></div>
                            <div>
                               <h4 className="font-bold text-[var(--text-primary)]">Junior Developer</h4>
                               <p className="text-sm text-[var(--text-secondary)]">Tech Solutions Inc • 2023 - Present</p>
                            </div>
                         </div>
                      </div>
                   </GlassCard>
                </div>
                <div className="space-y-6">
                   <GlassCard className="p-6 text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mx-auto mb-4 p-1">
                         <div className="w-full h-full rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                            <User size={40} className="text-amber-500" />
                         </div>
                      </div>
                      <h3 className="font-bold text-[var(--text-primary)] text-lg">John Doe</h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-4">Full Stack Developer</p>
                      <button className="w-full py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-sm font-bold text-[var(--text-secondary)] hover:text-white hover:border-amber-500 transition-colors">Public Profile</button>
                   </GlassCard>
                   <GlassCard className="p-6">
                      <h3 className="font-bold text-[var(--text-primary)] mb-4">Resume</h3>
                      <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--glass-border)] mb-4">
                         <div className="flex items-center gap-3">
                            <FileText size={20} className="text-red-400"/>
                            <span className="text-sm text-[var(--text-secondary)]">Resume_v2.pdf</span>
                         </div>
                         <Download size={16} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"/>
                      </div>
                      <div className="border-2 border-dashed border-[var(--glass-border)] rounded-lg p-4 text-center hover:border-amber-500/50 cursor-pointer transition-colors">
                         <Upload size={20} className="mx-auto mb-2 text-[var(--text-secondary)]" />
                         <span className="text-xs text-[var(--text-secondary)]">Upload New Resume</span>
                      </div>
                   </GlassCard>
                </div>
             </div>
          )}

          {/* AI Chatbot */}
          <CareerBot />
       </main>
    </div>
  );
};

export default CareerView;