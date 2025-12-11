import React from 'react';

interface SectionDividerProps {
  position: 'top' | 'bottom';
  variant?: 'curve' | 'tilt' | 'wave';
  className?: string;
  fill?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ position, variant = 'curve', className = '', fill }) => {
  const isTop = position === 'top';
  
  // SVG paths for 1440x320 viewbox
  const paths = {
    // Smooth Curve
    curve: "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1440,112L1440,320L1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    // Sharp Tilt
    tilt: "M0,128L1440,256L1440,320L0,320Z", 
    // Organic Wave
    wave: "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
  };

  return (
    <div 
      className={`absolute left-0 w-full overflow-hidden leading-none z-0 pointer-events-none ${isTop ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}
      style={{ transform: isTop ? 'rotate(180deg) translateY(1px)' : 'translateY(1px)' }}
    >
      <svg 
        data-name="Layer 1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none" 
        className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]"
        style={{ fill: fill || 'var(--glass-bg)' }}
      >
        <path d={paths[variant]} fillOpacity="1"></path>
      </svg>
    </div>
  );
};

export default SectionDivider;