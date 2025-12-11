import React from 'react';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-50 pointer-events-none">
      {/* 
        Subtle animated blobs 
        Using fixed positioning to ensure they stay in background while scrolling.
        Opacity is kept very low to not distract.
        Updated with 'mix-blend-screen' for dark mode to create light leaks effect.
      */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-500/30 rounded-full blur-[100px] animate-blob opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen"></div>
      
      <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-cyan-500/30 rounded-full blur-[100px] animate-blob opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '5s' }}></div>
      
      <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-blue-500/30 rounded-full blur-[120px] animate-blob opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '10s' }}></div>
      
      <div className="absolute bottom-[20%] right-[20%] w-[25rem] h-[25rem] bg-indigo-500/30 rounded-full blur-[80px] animate-blob opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '15s' }}></div>
    </div>
  );
};

export default BackgroundAnimation;