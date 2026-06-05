import { CLIENT_LOGOS } from "../types";
import { Sparkles } from "lucide-react";

export default function WhoWeWorkedWith() {
  return (
    <section id="testimonials" className="relative py-16 sm:py-28 bg-dark-bg overflow-hidden border-t border-b border-white/5">
      {/* Intimate dynamic glowing backdrops */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] purple-glow opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] orange-glow opacity-15 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 text-center">
        {/* Subdued text indicator - named exactly as requested */}
        <p className="text-[10px] sm:text-sm uppercase tracking-[0.3em] font-mono text-purple-400 font-extrabold mb-2 sm:mb-4">
          Corporate Ledger & Collaborating Brands
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-black text-white tracking-tight mb-10 sm:mb-20 leading-tight">
          Who We Worked With
        </h2>
      </div>

      {/* Infinite Marquee Loop container */}
      <div className="marquee-container w-full py-4 sm:py-6 relative z-10 flex">
        {/* First track */}
        <div className="marquee-content gap-8 sm:gap-12 px-4 sm:px-6 flex">
          {CLIENT_LOGOS.map((logo) => (
            <a
              key={logo.id}
              href={logo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 w-64 h-24 sm:w-[24rem] sm:h-32 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border border-white/20 bg-dark-card/95 hover:bg-dark-card/85 hover:border-white/30 hover:scale-[1.03] transition-all duration-300 cursor-pointer text-center shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            >
              {/* Permanent elegant backglow element */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-rose-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Logo text - radiant with high-contrast gradients by default for instant readability */}
              <span className="relative font-display font-black text-lg sm:text-2xl lg:text-3xl tracking-wide whitespace-nowrap uppercase text-transparent bg-gradient-to-r from-purple-400 via-rose-400 to-amber-300 bg-clip-text drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-105">
                {logo.logoSvg}
              </span>

              {/* Instagram Handle overlay */}
              <span className="absolute bottom-2 sm:bottom-3 text-[8px] sm:text-[10px] font-mono text-purple-300 uppercase tracking-widest font-extrabold group-hover:text-amber-300 transition-colors duration-300 flex items-center gap-1">
                View Instagram <span className="animate-pulse">→</span>
              </span>
            </a>
          ))}
        </div>

        {/* Second track (exact duplicate) for seamless loop */}
        <div className="marquee-content gap-8 sm:gap-12 px-4 sm:px-6 flex" aria-hidden="true">
          {CLIENT_LOGOS.map((logo) => (
            <a
              key={`dup-${logo.id}`}
              href={logo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 w-64 h-24 sm:w-[24rem] sm:h-32 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border border-white/20 bg-dark-card/95 hover:bg-dark-card/85 hover:border-white/30 hover:scale-[1.03] transition-all duration-300 cursor-pointer text-center shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            >
              {/* Permanent elegant backglow element */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-rose-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Logo text - radiant with high-contrast gradients by default for instant readability */}
              <span className="relative font-display font-black text-lg sm:text-2xl lg:text-3xl tracking-wide whitespace-nowrap uppercase text-transparent bg-gradient-to-r from-purple-400 via-rose-400 to-amber-300 bg-clip-text drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-105">
                {logo.logoSvg}
              </span>

              {/* Instagram Handle overlay */}
              <span className="absolute bottom-2 sm:bottom-3 text-[8px] sm:text-[10px] font-mono text-purple-300 uppercase tracking-widest font-extrabold group-hover:text-amber-300 transition-colors duration-300 flex items-center gap-1">
                View Instagram <span className="animate-pulse">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Rolling banner ticker of keywords under logo wall */}
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 text-center mt-10 sm:mt-16 relative z-10">
        <div className="flex justify-center flex-wrap gap-x-6 sm:gap-x-12 gap-y-4 text-[9px] sm:text-xs md:text-sm font-mono text-neutral-400 tracking-[0.15em] uppercase font-bold">
          <span className="flex items-center gap-1.5 sm:gap-2"><Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500" /> organic blitz systems</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 sm:gap-2"><Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" /> customer acquisition optimization</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 sm:gap-2"><Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> premium brand authority anchoring</span>
        </div>
      </div>
    </section>
  );
}
