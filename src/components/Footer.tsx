import { ArrowUpRight, Github, Twitter, Linkedin, Sparkles } from "lucide-react";
import AdictiveLogo from "./AdictiveLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-bg border-t border-white/5 pt-24 pb-12 overflow-hidden z-10 font-sans">
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
                We create high-performing content for brands, creators, and businesses. Straightforward strategy, clear pricing, and reliable execution.
              </p>
            </div>

            <div className="flex gap-3 mt-8 md:mt-0">
              <a href="#" className="p-2.5 rounded-full border border-white/5 bg-dark-card text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all shadow-md">
                <Twitter className="w-4 h-4 text-accent-purple" />
              </a>
              <a href="#" className="p-2.5 rounded-full border border-white/5 bg-dark-card text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all shadow-md">
                <Linkedin className="w-4 h-4 text-accent-orange" />
              </a>
              <a href="#" className="p-2.5 rounded-full border border-white/5 bg-dark-card text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all shadow-md">
                <Github className="w-4 h-4 text-accent-gold" />
              </a>
            </div>
          </div>

          {/* Sitemaps */}
          <div className="md:col-span-3 text-left">
            <h5 className="text-xs uppercase font-mono tracking-widest text-[#bcbcc5] mb-6 font-bold">Navigation</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#services" className="text-neutral-400 hover:text-white transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#process" className="text-neutral-400 hover:text-white transition-colors">Our Process</a>
              </li>
              <li>
                <a href="#case-studies" className="text-neutral-400 hover:text-white transition-colors">Client Results</a>
              </li>
              <li>
                <a href="#portfolio" className="text-neutral-400 hover:text-white transition-colors">Our Work</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 text-left">
            <h5 className="text-xs uppercase font-mono tracking-widest text-[#bcbcc5] mb-6 font-bold">Contact</h5>
            <div className="p-6 rounded-2xl bg-dark-card border border-white/5 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold opacity-40" />
              <p className="text-xs text-neutral-300 font-sans leading-relaxed font-light">
                Addictive Marketing is an execution-focused content agency. We partner with selected creators and brands to deliver predictable growth.
              </p>
              <a
                href="#contact"
                className="mt-5 text-xs font-mono font-bold uppercase text-white hover:text-neutral-300 flex items-center gap-1.5 group"
              >
                <span className="bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold bg-clip-text text-transparent font-bold">Get Started Today</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Lower tier: copyright and indicators */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <span>
            © {currentYear} Addictive Marketing. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">TERMS OF USE</a>
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
