import React from 'react';

interface LogoProps {
  className?: string;
  textSize?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8", textSize = "text-xl", showText = true }) => {
  return (
    <div className="flex items-center gap-2 select-none group">
      <div className={`${className} transition-transform group-hover:scale-110 duration-300`}>
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]"
          role="img" 
          aria-label="Heidi CLI"
        >
          {/* Window */}
          <rect x="3.25" y="6" width="25.5" height="20" rx="4" fill="#0B1220" stroke="#1F2937" strokeWidth="1.5"/>
          {/* Title bar */}
          <rect x="3.25" y="6" width="25.5" height="5.5" rx="4" fill="#0F172A"/>
          <rect x="3.25" y="9.5" width="25.5" height="2" fill="#0F172A"/>

          {/* Window buttons */}
          <circle cx="8" cy="8.75" r="1.05" fill="#EF4444"/>
          <circle cx="11" cy="8.75" r="1.05" fill="#F59E0B"/>
          <circle cx="14" cy="8.75" r="1.05" fill="#22C55E"/>

          {/* Prompt: >_ */}
          <path d="M9.5 17 L12.5 19 L9.5 21" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.3 21 H19.3" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" className="animate-pulse"/>
        </svg>
      </div>
      {showText && (
        <span className={`font-mono font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-heidi-400 to-cyan-400 ${textSize}`}>
          heidi-cli
        </span>
      )}
    </div>
  );
};

export default Logo;