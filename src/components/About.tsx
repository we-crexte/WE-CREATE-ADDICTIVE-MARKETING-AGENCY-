import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Trophy, Quote, Target, Award, Rocket, Check } from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"story" | "mission" | "process">("story");

  // Modern process timeline data
  const processSteps = [
    {
      phase: "01",
      title: "Atmosphere Extraction (Days 1–3)",
      desc: "Our creative directors execute a deep digital dump session, cataloguing your target cognitive nodes, your knowledge reserves, and your high-performing competitors."
    },
    {
      phase: "02",
      title: "Script Compiling & Blueprints (Days 4–7)",
      desc: "We write detailed psychologically-indexed action scripts, matching visual hooks, pacing frames, and audio-trending cues carefully configured for retention."
    },
    {
      phase: "03",
      title: "Cinematic Cut Distribution (Days 8+)",
      desc: "Our production team cuts and subtitles your visual assets with high-end typography and sound. We run daily distributions, analyzing watch-curves immediately."
    }
  ];

  return (
    <section id="founder" className="relative py-16 sm:py-28 bg-dark-bg overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orange-glow opacity-5 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center">
          
          {/* Left Column: Premium Founder Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[32px] overflow-hidden shiny-border p-1 bg-dark-card shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              {/* Founder image portrait generated from tool */}
              <div className="aspect-[3/4] relative rounded-[28px] overflow-hidden">
                <img
                  src="/FOUNDER.png"
                  alt="Addictive Marketing Founder"
                  className="w-full h-full object-cover filter brightness-95 contrast-105 hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual styling overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />
                
                {/* Floating founder quote box bottom overlay */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-effect border border-white/10">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4.5 h-4.5 text-amber-400 rotate-180 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-white font-serif leading-relaxed italic">
                        "Your brand isn't dying from a lack of product quality. It's dying from an absence of high-intensity attention."
                      </p>
                      <span className="block mt-1.5 text-[8.5px] sm:text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                        SAMARTH // FOUNDER & CREATIVE DIRECTOR
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Achievement Badge Backing */}
            <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-black/90 border border-white/10 shadow-lg hidden md:block">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <div className="text-left">
                  <p className="text-[10px] font-mono font-bold text-neural-300 uppercase tracking-widest">RANKED #1</p>
                  <p className="text-sm font-semibold text-white">Attention Architect</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story, Mission & Process Tabs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full mb-4 text-xs font-mono font-bold text-rose-400 uppercase w-fit">
              <Award className="w-3.5 h-3.5" />
              <span>THE LEADERSHIP GENOME</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
              The Team Behind <br />
              <span className="bg-gradient-to-r from-purple-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                Addictive Marketing
              </span>
            </h2>

            {/* Modern Tab list linking content */}
            <div className="flex gap-4 border-b border-white/5 pb-2 mt-4 sm:mt-8 mb-4 sm:mb-8 overflow-x-auto">
              {(["story", "mission", "process"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-mono uppercase tracking-widest pb-3 font-bold relative transition-colors whitespace-nowrap ${
                    activeTab === tab ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  <span>{tab === "story" ? "The Story" : tab === "mission" ? "Mission & Vision" : "Our Process"}</span>
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeAboutTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-rose-400"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic content panes */}
            <div className="min-h-[160px] sm:min-h-[200px]">
              {activeTab === "story" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                    We started Addictive Marketing because we got tired of standard corporate digital agencies lying. They charge heavy retainers, write redundant 40-page strategy decks, and produce generic, uninspired stock-image content that does nothing but waste capital.
                  </p>
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                    Attention on modern social pools moves in micro-seconds. Either your content commands instant aesthetic compliance, or it gets bypassed forever. We rebuilt ourselves as a boutique digital strike team, designing high-conversion vertical visual assets designed to secure audiences immediately.
                  </p>
                </motion.div>
              )}

              {activeTab === "mission" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-rose-500" />
                      <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Our Core Mission</h4>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      To empower ambitious brands by engineering content systems that transform raw attention files into highly qualified conversions and compound brand equity.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="w-5 h-5 text-amber-500" />
                      <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Our Radical Vision</h4>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      To dismantle boring traditional digital marketing, establishing high-end cinematic narrative content as the absolute gold standard for client audience engagement.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "process" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {processSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      <div className="shrink-0 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-rose-500 text-white font-mono text-xs font-bold flex items-center justify-center border border-[#070708]">
                          {step.phase}
                        </div>
                        {idx !== processSteps.length - 1 && (
                          <div className="w-0.5 h-full bg-white/5 my-1" />
                        )}
                      </div>
                      <div className="text-left pb-4">
                        <h4 className="font-display font-bold text-sm text-white">{step.title}</h4>
                        <p className="text-xs text-neutral-400 leading-relaxed mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Quick Process Check List */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Professional filming direction</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Subtitles & sound design</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Paid advertising campaign sync</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
