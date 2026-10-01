import React from "react";

interface AdictiveLogoProps {
  showSlogan?: boolean;
  className?: string;
  iconSize?: string;
  textSize?: string;
}

export default function AdictiveLogo({
  showSlogan = false,
  className = "",
  iconSize = "w-11 h-11",
  textSize = "text-xl"
}: AdictiveLogoProps) {
  const isNavbarSmall = iconSize.includes("w-7") || iconSize.includes("w-8") || iconSize.includes("w-9");

  return (
    <div className={`flex items-center ${isNavbarSmall ? "gap-2" : "gap-3"} select-none ${className}`}>
      {/* Icon: Sleek Chevron-A with Inner Neon-Purple Curved Swoosh */}
      <div className={`relative ${iconSize} flex-shrink-0`}>
        {/* Smooth neon-glow backdrop */}
        <div className="absolute inset-x-0.5 inset-y-0.5 bg-purple-500/20 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        
        <svg 
          viewBox="0 0 140 100" 
          className="w-full h-full relative z-10 filter drop-shadow-[0_1.5px_6px_rgba(168,85,247,0.3)]" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Wing (Angled white bar) */}
          <path 
            d="M 64 20 L 18 84 L 46 79 L 66 43 Z" 
            fill="#FFFFFF" 
            className="transition-colors duration-300"
          />
          {/* Right Wing (Angled white bar) */}
          <path 
            d="M 72 43 L 79 56 L 112 84 L 84 79 Z" 
            fill="#FFFFFF" 
            className="transition-colors duration-300"
          />
          {/* Inner Purple Swoosh / Wave */}
          <path 
            d="M 66 43 C 58 55, 58 72, 72 77 C 62 73, 61 55, 66 43" 
            fill="#9333ea" 
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Vertical divider line */}
      <div className={`${isNavbarSmall ? "h-5" : "h-7"} w-[1px] bg-white/20 self-center`} />

      {/* Brand Text Stack */}
      <div className="flex flex-col text-left justify-center">
        <span className={`font-display font-black leading-none tracking-wider text-purple-500 ${textSize} uppercase`}>
          ADICTIVE
        </span>
        <span className={`${isNavbarSmall ? "text-[7.5px] tracking-[0.22em] -mt-0.5" : "text-[9px] tracking-[0.32em] -mt-0.5"} uppercase font-mono text-white font-bold leading-none`}>
          MARKETING
        </span>
      </div>

      {/* Optional Brand Slogan (Strategic Thinking | Viral Content | Adictive Growth) */}
      {showSlogan && (
        <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-white/10 text-[9px] font-mono tracking-widest uppercase">
          <span className="text-neutral-400">Strategic Thinking</span>
          <span className="text-purple-500/55">|</span>
          <span className="text-neutral-400">Viral Content</span>
          <span className="text-purple-500/55">|</span>
          <span className="text-purple-400 font-bold">Adictive Growth</span>
        </div>
      )}
    </div>
  );
}
