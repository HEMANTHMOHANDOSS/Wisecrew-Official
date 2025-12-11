import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Volume2, Mic, StopCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import GlassCard from './ui/GlassCard';

const WisecrewBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{id: string, sender: 'user'|'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize bot greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'init',
        sender: 'bot',
        text: "Hello! I am the Wisecrew AI Assistant. I can help you with information about our Services, Products, or Internship programs. How can I assist you today?"
      }]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      // Try to select a good voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha')) || voices[0];
      if (preferredVoice) utterance.voice = preferredVoice;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = process.env.API_KEY || ''; 
      // Fallback if no key provided in env for demo purposes, 
      // in production ensure process.env.API_KEY is populated.
      
      let responseText = "I'm connecting to the knowledge base...";

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const model = "gemini-2.5-flash";
        
        const systemInstruction = `You are the official AI assistant for Wisecrew Solutions. 
        Wisecrew Solutions is a software development and education company based in Chennai.
        CEO: Sribalamanigandan G.
        Services: Web Dev, App Dev, Digital Marketing, HRMS, ERP.
        Products: Wisecrew Chatbot, HRMS, School Management System.
        Address: 44, Kanakkar street, thiruvottiyur, Chennai.
        Phone: 91-7845342880.
        Email: info@wisecrew.in.
        Be professional, concise, and helpful.`;

        const response = await ai.models.generateContent({
          model: model,
          contents: userMsg,
          config: { systemInstruction }
        });
        
        responseText = response.text || "I couldn't generate a response.";
      } else {
        // Mock logic if API key is missing
        await new Promise(r => setTimeout(r, 1000));
        if (userMsg.toLowerCase().includes('contact')) responseText = "You can reach us at 91-7845342880 or visit us at 44, Kanakkar street, Thiruvottiyur, Chennai.";
        else if (userMsg.toLowerCase().includes('service')) responseText = "We offer Web Development, Mobile Apps, Digital Marketing, and Enterprise Software solutions.";
        else responseText = "Thank you for your query. For detailed information, please request a demo or contact our support team.";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: responseText }]);
      speak(responseText);

    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className={`fixed bottom-24 right-6 z-[100] p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/40 hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'} items-center justify-center animate-bounce-slow`}
      >
        <MessageSquare size={28} fill="white" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[100] w-[90vw] md:w-[380px] h-[550px] max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-10 duration-300 font-sans">
          <GlassCard className="flex-1 flex flex-col p-0 border-blue-500/30 shadow-2xl !bg-[#020617]/95 backdrop-blur-xl overflow-hidden">
             {/* Header */}
             <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-900/50 to-purple-900/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-inner">
                      <Bot size={20} />
                   </div>
                   <div>
                      <h3 className="font-bold text-white text-sm">Wisecrew AI</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <p className="text-[10px] text-blue-200 uppercase tracking-wider">Online</p>
                      </div>
                   </div>
                </div>
                <div className="flex gap-2">
                    {isSpeaking && (
                        <button onClick={stopSpeaking} className="p-2 hover:bg-white/10 rounded-full text-red-400">
                            <StopCircle size={18} />
                        </button>
                    )}
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={18} /></button>
                </div>
             </div>

             {/* Chat Area */}
             <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-blue-900/5">
                {messages.map((msg) => (
                   <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/5'}`}>
                         {msg.text}
                      </div>
                   </div>
                ))}
                {loading && (
                   <div className="flex justify-start">
                      <div className="bg-white/10 text-slate-100 rounded-2xl rounded-bl-none p-3 border border-white/5 flex items-center gap-2">
                         <Loader2 size={14} className="animate-spin" /> <span className="text-xs">Thinking...</span>
                      </div>
                   </div>
                )}
                <div ref={scrollRef} />
             </div>

             {/* Input */}
             <div className="p-4 border-t border-white/10 bg-white/5 flex gap-2 items-center">
                <input 
                  type="text" 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleSend()} 
                  placeholder="Type a message..." 
                  className="flex-1 bg-black/40 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 border border-white/10 placeholder:text-slate-500" 
                />
                <button 
                    onClick={handleSend} 
                    disabled={!input.trim() || loading}
                    className="p-2.5 bg-blue-600 rounded-full text-white hover:bg-blue-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Send size={18} />
                </button>
             </div>
          </GlassCard>
        </div>
      )}
    </>
  );
};

export default WisecrewBot;
