import { CLIENT_LOGOS } from "../types";
import { Sparkles } from "lucide-react";

export default function WhoWeWorkedWith() {
  return (
    <section className="relative py-16 bg-[#070708] overflow-hidden border-t border-b border-white/5">
      {/* Background container wrapper */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Subdued text indicator */}
        <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-500 font-bold mb-8">
          Trusted By Ambitious Brands
        </p>

        {/* Grayscale grid with glow reveal on hover */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {CLIENT_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="group relative w-full h-20 flex items-center justify-center p-4 rounded-xl border border-white/0 hover:border-white/5 bg-transparent hover:bg-white/[0.02] transition-all duration-300 cursor-default"
            >
              {/* Backglow element */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-rose-500/10 to-amber-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Logo text - grayscale by default, colored & glowing on hover */}
              <span className="relative font-display font-black text-sm tracking-[0.25em] uppercase text-neutral-600 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-rose-400 group-hover:to-amber-300 group-hover:bg-clip-text transition-all duration-300 group-hover:scale-110">
                {logo.logoSvg}
              </span>

              {/* Little detail dot */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Rolling banner ticker of keywords under logo wall */}
        <div className="mt-12 flex justify-center flex-wrap gap-8 text-[10px] font-mono text-neutral-500 tracking-[0.15em] uppercase">
          <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-rose-500" /> organic blitz systems</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-purple-400" /> customer acquisition optimization</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-amber-400" /> premium brand authority anchoring</span>
        </div>

      </div>
    </section>
  );
}
