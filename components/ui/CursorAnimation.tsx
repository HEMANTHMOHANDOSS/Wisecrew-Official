import React, { useEffect, useState } from 'react';

const CursorAnimation = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden hidden md:block"
      aria-hidden="true"
    >
      {/* Large Ambient Glow (The "Ray") */}
      <div 
        className="absolute rounded-full transition-transform duration-100 ease-out will-change-transform"
        style={{
          width: '800px',
          height: '800px',
          left: position.x - 400,
          top: position.y - 400,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(59, 130, 246, 0.03) 40%, transparent 70%)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Intense Center Spot */}
      <div 
        className="absolute rounded-full bg-blue-500/20 blur-xl transition-transform duration-75 ease-out will-change-transform"
        style={{
          width: '40px',
          height: '40px',
          left: position.x - 20,
          top: position.y - 20,
        }}
      />
    </div>
  );
};

export default CursorAnimation;