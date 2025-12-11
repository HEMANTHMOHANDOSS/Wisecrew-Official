import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        glass-panel rounded-3xl relative overflow-hidden group
        transition-all duration-500 ease-out will-change-transform
        ${hoverEffect ? 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-[rgba(59,130,246,0.15)] hover:border-[rgba(255,255,255,0.2)]' : ''}
        ${className}
      `}
    >
      {/* 1. Subtle Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

      {/* 2. Top Highlight Border (Simulating light source) */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 z-10"></div>

      {/* 3. Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;