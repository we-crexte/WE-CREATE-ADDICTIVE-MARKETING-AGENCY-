import { ArrowUpRight, Github, Twitter, Linkedin, Sparkles } from "lucide-react";
import AdictiveLogo from "./AdictiveLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-bg border-t border-white/5 pt-20 pb-12 overflow-hidden z-10 font-sans">
      {/* Background glow flares */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] purple-glow opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[200px] orange-glow opacity-5 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Upper tier: brand mapping and sitemap lists */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand info column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#" className="group inline-block">
                <AdictiveLogo iconSize="w-9 h-9" textSize="text-lg" />
              </a>

              <p className="mt-6 text-sm text-neutral-400 max-w-sm leading-relaxed font-light">
                We build ultra-premium attention machines. We move quick, scripts custom-focused, and delivery guaranteed. Zero fluff, 100% metrics.
              </p>
            </div>

            <div className="flex gap-4 mt-8 md:mt-0">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sitemaps */}
          <div className="md:col-span-3">
            <h5 className="text-xs uppercase font-mono tracking-widest text-[#bcbcc5] mb-6 font-bold">The Blueprint</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#vsl" className="text-neutral-400 hover:text-white transition-colors">Vitals Masterclass</a>
              </li>
              <li>
                <a href="#case-studies" className="text-neutral-400 hover:text-white transition-colors">The Attention Ledger</a>
              </li>
              <li>
                <a href="#portfolio" className="text-neutral-400 hover:text-white transition-colors">Bespoke Portfolio</a>
              </li>
              <li>
                <a href="#founder" className="text-neutral-400 hover:text-white transition-colors">Founder Story</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h5 className="text-xs uppercase font-mono tracking-widest text-[#bcbcc5] mb-6 font-bold">Secure Placements</h5>
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 blur-lg rounded-full" />
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Addictive is locked and fully scaled. Custom consulting retainers ranges from <span className="text-rose-400 font-bold">$5,000 to $20,000/month</span> depending on complexity.
              </p>
              <a
                href="#contact"
                className="mt-4 text-xs font-mono font-bold uppercase text-amber-400 hover:text-white flex items-center gap-1 group"
              >
                <span>Request Account Audits</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Lower tier: copyright and indicators */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <span>
            © {currentYear} Addictive Marketing Inc. All rights reserved. Registered Creative Entity.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-rose-500" /> SECURE SSL ENVELOPE</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF USE</a>
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
