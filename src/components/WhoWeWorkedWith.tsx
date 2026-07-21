import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

import inoxtagImg from "../assets/images/INOXTAG.jpg";
import lethamyrImg from "../assets/images/LETHAMYR.jpg";
import ofekImg from "../assets/images/OFEK.jpg";
import saifShawafImg from "../assets/images/SAIFSHAW.jpg";
import tellyImg from "../assets/images/TELLY.jpg";
import paulImg from "../assets/images/PAUL.jpg";
import nathanImg from "../assets/images/nathan.jpg";
import timmyImg from "../assets/images/TIMMY.jpg";

interface Client {
  id: string;
  name: string;
  image: string;
  instagramUrl: string;
}

const CLIENTS_LIST: Client[] = [
  { id: "c1", name: "INOXTAG", image: inoxtagImg, instagramUrl: "https://www.instagram.com/inoxtag/" },
  { id: "c2", name: "LETHAMYR", image: lethamyrImg, instagramUrl: "https://www.instagram.com/lethamyr_rl/" },
  { id: "c3", name: "OFEK", image: ofekImg, instagramUrl: "https://www.instagram.com/ofek.alon_/" },
  { id: "c4", name: "SAIF SHAWAF", image: saifShawafImg, instagramUrl: "https://www.instagram.com/saifshawaf/" },
  { id: "c5", name: "TELLY", image: tellyImg, instagramUrl: "https://www.instagram.com/tellyctr/" },
  { id: "c6", name: "PAUL", image: paulImg, instagramUrl: "https://www.instagram.com/paul/" },
  { id: "c7", name: "NATHAN", image: nathanImg, instagramUrl: "https://www.instagram.com/unspeakable/" },
  { id: "c8", name: "TIMMY", image: timmyImg, instagramUrl: "https://www.instagram.com/iitztimmy/" },
];

export default function WhoWeWorkedWith() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-32 bg-black overflow-hidden border-t border-b border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10 mb-16 sm:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4 uppercase"
        >
          Clients We've Worked With
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base text-neutral-400 font-sans max-w-xl mx-auto tracking-wide"
        >
          Trusted by creators, entrepreneurs and brands worldwide.
        </motion.p>
      </div>

      {/* Grid container with responsive layouts */}
      <div className="max-w-[85rem] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-14 md:gap-16 lg:gap-20">
          {CLIENTS_LIST.map((client, index) => (
            <motion.a
              key={client.id}
              href={client.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group flex flex-col items-center justify-center cursor-pointer w-full text-center"
            >
              {/* Profile image container (Large standalone perfect circle with emerald highlights) */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 aspect-square rounded-full overflow-hidden border-2 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-500 group-hover:scale-105 flex-shrink-0">
                <img 
                  src={client.image} 
                  alt={client.name} 
                  className="w-full h-full object-cover filter brightness-[0.9] transition-all duration-500 group-hover:brightness-100" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              {/* Client/Team member name below image (Sans-serif or Mono styled perfectly) */}
              <span className="mt-5 text-sm sm:text-base font-bold tracking-widest text-neutral-300 group-hover:text-emerald-400 transition-colors duration-300 uppercase font-mono">
                {client.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Centered "+ More..." call-to-action under the grid */}
      <div className="flex justify-center mt-12 relative z-10">
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 font-semibold text-xs tracking-wider uppercase font-mono hover:bg-emerald-500/15 hover:border-emerald-500/35 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-500 group-hover:animate-pulse" />
          Plus many more elite partners... Join them now
        </motion.a>
      </div>
    </section>
  );
}
