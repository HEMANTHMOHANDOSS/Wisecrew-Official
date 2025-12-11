import React, { useEffect, useState, useRef } from 'react';
import { Cpu, Shield, Zap, Lock, Database, Wifi, Globe, Server } from 'lucide-react';

interface CyberPreloaderProps {
  onComplete: () => void;
}

const CyberPreloader: React.FC<CyberPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('INITIALIZING...');
  const [subText, setSubText] = useState('LOADING KERNEL...');
  const [showWelcome, setShowWelcome] = useState(false);
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  
  // Text Decryption Logic
  const decryptText = (target: string, setter: (s: string) => void, duration: number = 1000) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
    let iterations = 0;
    const interval = setInterval(() => {
      setter(
        target
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return target[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iterations >= target.length) {
        clearInterval(interval);
      }
      
      iterations += 1 / 2; // Speed control
    }, 30);
  };

  useEffect(() => {
    // Progress Simulation
    const timer = setInterval(() => {
      setProgress((prev) => {
        const diff = Math.random() * 5; // Random jump
        const newProgress = Math.min(prev + diff, 100);
        
        // Milestones
        if (newProgress > 20 && newProgress < 25) {
            setText('ESTABLISHING SECURE CONNECTION');
            setSubText('HANDSHAKE PROTOCOL: ENCRYPTED');
        } else if (newProgress > 50 && newProgress < 55) {
            setText('LOADING AI MODULES');
            setSubText('NEURAL NETWORK: ONLINE');
        } else if (newProgress > 80 && newProgress < 85) {
            setText('OPTIMIZING ASSETS');
            setSubText('RENDER ENGINE: READY');
        }

        if (newProgress === 100) {
          clearInterval(timer);
          setTimeout(() => {
             setShowWelcome(true);
             // Trigger welcome animation sequence
             setTimeout(() => {
                 onComplete();
             }, 2500); // Time to read "Welcome"
          }, 500);
        }
        return newProgress;
      });
    }, 50);

    // Matrix Rain Effect (Simplified)
    const charInterval = setInterval(() => {
        const chars = "010101ATCGXÆØ";
        const newChars = Array(10).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]);
        setMatrixChars(newChars);
    }, 100);

    return () => {
        clearInterval(timer);
        clearInterval(charInterval);
    };
  }, [onComplete]);

  // Welcome Text Effect
  useEffect(() => {
      if (showWelcome) {
          decryptText("WISECREW SOLUTIONS", setText, 2000);
          setSubText("ACCESS GRANTED");
      }
  }, [showWelcome]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden font-mono text-cyan-500 cursor-wait">
      
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      
      {/* Moving Scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[10%] w-full animate-scanline pointer-events-none z-10"></div>

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-2xl px-6 flex flex-col items-center">
        
        {/* Animated Core Icon */}
        <div className="relative mb-12">
           <div className="absolute inset-0 bg-cyan-500/20 blur-[50px] rounded-full animate-pulse"></div>
           
           {/* Spinning Rings */}
           <div className="w-32 h-32 rounded-full border border-cyan-500/30 flex items-center justify-center animate-spin-slow relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
              <div className="w-24 h-24 rounded-full border border-cyan-500/50 border-t-transparent border-l-transparent animate-spin-reverse"></div>
              
              {/* Center Logo/Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                  {progress < 100 ? (
                      <Cpu size={40} className="text-cyan-400 animate-pulse" />
                  ) : (
                      <Shield size={40} className="text-cyan-400 animate-bounce-slow" />
                  )}
              </div>
           </div>
           
           {/* Decoration Lines */}
           <div className="absolute top-1/2 -left-20 w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50"></div>
           <div className="absolute top-1/2 -right-20 w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50"></div>
        </div>

        {/* Text Area */}
        <div className="text-center space-y-4 mb-8 h-24">
            {showWelcome ? (
                <div className="animate-in zoom-in-95 duration-500">
                    <p className="text-xs text-cyan-500/70 tracking-[0.5em] mb-2 uppercase">Welcome to</p>
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] glitch-text">
                        {text}
                    </h1>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-white">{text}</h2>
                    <div className="flex items-center justify-center gap-2 text-xs text-cyan-500/70 uppercase tracking-widest">
                        {progress < 100 && <span className="inline-block w-2 h-2 bg-cyan-500 animate-ping rounded-full"></span>}
                        {subText}
                    </div>
                </>
            )}
        </div>

        {/* Progress Bar */}
        {!showWelcome && (
            <div className="w-full h-1 bg-cyan-900/30 rounded-full overflow-hidden relative border border-cyan-500/20">
                <div 
                    className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] transition-all duration-75 ease-out relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white]"></div>
                </div>
            </div>
        )}

        {/* System Stats (Decorative) */}
        <div className="w-full flex justify-between items-end mt-4 text-[10px] text-cyan-500/40 font-mono uppercase">
             <div className="flex flex-col gap-1 text-left">
                <span>MEM: {Math.floor(progress * 124)}MB OK</span>
                <span>CPU: {Math.floor(Math.random() * 30 + 10)}% EFFICIENCY</span>
                <span>SECURE: TRUE</span>
             </div>
             <div className="flex gap-1">
                 {matrixChars.map((char, i) => (
                     <span key={i} className="opacity-50">{char}</span>
                 ))}
             </div>
             <div className="flex flex-col gap-1 text-right">
                <span>VER: 2.5.0</span>
                <span>LOC: {progress < 50 ? 'UNKNOWN' : 'CHENNAI, IN'}</span>
                <span>LAT: <span className="text-cyan-500">{progress}%</span></span>
             </div>
        </div>
      </div>

    </div>
  );
};

export default CyberPreloader;
