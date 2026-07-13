import { CLIENT_LOGOS } from "../types";
import { Sparkles } from "lucide-react";

export default function WhoWeWorkedWith() {
  return (
    <section id="testimonials" className="relative py-16 sm:py-28 bg-[#000000] overflow-hidden border-t border-b border-neutral-900">
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 text-center">
        {/* Subdued text indicator - named exactly as requested */}
        <p className="text-[10px] sm:text-sm uppercase tracking-[0.3em] font-mono text-neutral-500 font-extrabold mb-2 sm:mb-4">
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
              className="group relative flex-shrink-0 w-64 h-24 sm:w-[24rem] sm:h-32 flex flex-col items-center justify-center p-4 sm:p-6 rounded-none border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-800 transition-all duration-300 cursor-pointer text-center"
            >
              {/* Logo text - solid monochromatic for elegant readability */}
              <span className="relative font-display font-black text-lg sm:text-2xl lg:text-3xl tracking-wide whitespace-nowrap uppercase text-white transition-all duration-300 group-hover:scale-105">
                {logo.logoSvg}
              </span>

              {/* Instagram Handle overlay */}
              <span className="absolute bottom-2 sm:bottom-3 text-[8px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors duration-300 flex items-center gap-1">
                View Instagram <span>→</span>
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
              className="group relative flex-shrink-0 w-64 h-24 sm:w-[24rem] sm:h-32 flex flex-col items-center justify-center p-4 sm:p-6 rounded-none border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-800 transition-all duration-300 cursor-pointer text-center"
            >
              {/* Logo text - solid monochromatic for elegant readability */}
              <span className="relative font-display font-black text-lg sm:text-2xl lg:text-3xl tracking-wide whitespace-nowrap uppercase text-white transition-all duration-300 group-hover:scale-105">
                {logo.logoSvg}
              </span>

              {/* Instagram Handle overlay */}
              <span className="absolute bottom-2 sm:bottom-3 text-[8px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors duration-300 flex items-center gap-1">
                View Instagram <span>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Rolling banner ticker of keywords under logo wall */}
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 text-center mt-10 sm:mt-16 relative z-10">
        <div className="flex justify-center flex-wrap gap-x-6 sm:gap-x-12 gap-y-4 text-[9px] sm:text-xs md:text-sm font-mono text-neutral-400 tracking-[0.15em] uppercase font-bold">
          <span className="flex items-center gap-1.5 sm:gap-2"><Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> organic growth systems</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 sm:gap-2"><Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> customer acquisition optimization</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 sm:gap-2"><Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> premium brand authority anchoring</span>
        </div>
      </div>
    </section>
  );
}
